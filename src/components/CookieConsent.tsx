import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Cookie, X } from "lucide-react";

/** Wersja zgody — podbij, aby wymusić ponowne pytanie użytkowników. */
const CONSENT_VERSION = "1.0";
/** Klucz w localStorage. */
const CONSENT_KEY = "leniar_consent";
/** Okres ważności zgody (12 miesięcy). */
const CONSENT_TTL_DAYS = 365;

export type ConsentCategories = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = {
  version: string;
  date: string; // ISO
  categories: ConsentCategories;
};

const DEFAULT_DENIED: ConsentCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const ALL_ACCEPTED: ConsentCategories = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

type ConsentContextValue = {
  consent: ConsentCategories;
  hasDecision: boolean;
  openSettings: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (c: ConsentCategories) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export const useCookieConsent = () => {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};

/** Globalne otwieranie panelu z dowolnego miejsca (np. ze stopki). */
export const openCookieSettings = () => {
  window.dispatchEvent(new CustomEvent("leniar:open-cookie-settings"));
};

const readStored = (): StoredConsent | null => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed: StoredConsent = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    // sprawdź wygaśnięcie
    const ts = new Date(parsed.date).getTime();
    if (Number.isNaN(ts)) return null;
    if (Date.now() - ts > CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<ConsentCategories>(DEFAULT_DENIED);
  const [hasDecision, setHasDecision] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // inicjalizacja po stronie klienta
  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setConsent(stored.categories);
      setHasDecision(true);
    } else {
      setBannerOpen(true);
    }
  }, []);

  // nasłuch globalnego otwierania ustawień
  useEffect(() => {
    const handler = () => setDialogOpen(true);
    window.addEventListener("leniar:open-cookie-settings", handler);
    return () => window.removeEventListener("leniar:open-cookie-settings", handler);
  }, []);

  const persist = useCallback((next: ConsentCategories) => {
    const payload: StoredConsent = {
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
      categories: next,
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
    setConsent(next);
    setHasDecision(true);
    setBannerOpen(false);
    setDialogOpen(false);
    // ułatwia consent-gating poza Reactem
    window.dispatchEvent(new CustomEvent("leniar:consent-updated", { detail: next }));
  }, []);

  const acceptAll = useCallback(() => persist(ALL_ACCEPTED), [persist]);
  const rejectAll = useCallback(() => persist(DEFAULT_DENIED), [persist]);
  const openSettings = useCallback(() => setDialogOpen(true), []);
  const save = useCallback((c: ConsentCategories) => persist({ ...c, necessary: true }), [persist]);

  const value = useMemo<ConsentContextValue>(
    () => ({ consent, hasDecision, openSettings, acceptAll, rejectAll, save }),
    [consent, hasDecision, openSettings, acceptAll, rejectAll, save],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {bannerOpen && (
        <CookieBanner
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onSettings={() => setDialogOpen(true)}
        />
      )}
      <CookieSettingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={consent}
        onSave={save}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
      />
    </ConsentContext.Provider>
  );
};

/* -------------------- Baner -------------------- */

const CookieBanner = ({
  onAcceptAll,
  onRejectAll,
  onSettings,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSettings: () => void;
}) => {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:left-4 sm:bottom-4 z-50 px-3 pb-3 sm:px-0 sm:pb-0 animate-page-in"
    >
      <div className="mx-auto sm:mx-0 sm:max-w-sm rounded-lg border border-border bg-card shadow-lg">
        <div className="p-3">
          <div className="flex items-start gap-2">
            <Cookie className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <h2 id="cookie-banner-title" className="text-sm font-medium text-foreground">
                Pliki cookies
              </h2>
              <p id="cookie-banner-desc" className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                Używamy cookies do działania serwisu oraz — za zgodą — analityki.{" "}
                <Link to="/polityka-cookies" className="underline hover:text-foreground">Szczegóły</Link>
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button type="button" size="sm" onClick={onAcceptAll}>
              Akceptuj
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={onRejectAll}>
              Odrzuć
            </Button>
            <button
              type="button"
              onClick={onSettings}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              Ustawienia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Dialog z ustawieniami -------------------- */

const CookieSettingsDialog = ({
  open,
  onOpenChange,
  initial,
  onSave,
  onAcceptAll,
  onRejectAll,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: ConsentCategories;
  onSave: (c: ConsentCategories) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}) => {
  const [local, setLocal] = useState<ConsentCategories>(initial);

  useEffect(() => {
    if (open) setLocal(initial);
  }, [open, initial]);

  const set = (k: keyof ConsentCategories, v: boolean) => {
    if (k === "necessary") return;
    setLocal((prev) => ({ ...prev, [k]: v }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ustawienia plików cookies</DialogTitle>
          <DialogDescription>
            Wybierz kategorie, na które wyrażasz zgodę. Zgodę możesz w każdej chwili zmienić lub wycofać.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <CategoryRow
            title="Niezbędne"
            description="Wymagane do działania strony i podstawowych funkcji (m.in. zapamiętanie zgody). Zawsze aktywne."
            checked
            disabled
          />
          <CategoryRow
            title="Funkcjonalne"
            description="Zapamiętują Twoje preferencje (np. wersja językowa, motyw) i podnoszą wygodę korzystania z serwisu."
            checked={local.functional}
            onCheckedChange={(v) => set("functional", v)}
          />
          <CategoryRow
            title="Analityczne"
            description="Pomagają nam mierzyć ruch i sposób korzystania ze strony w celu jej ulepszania (np. statystyki anonimowe)."
            checked={local.analytics}
            onCheckedChange={(v) => set("analytics", v)}
          />
          <CategoryRow
            title="Marketingowe"
            description="Pozwalają na personalizację treści i reklam oraz mierzenie skuteczności kampanii."
            checked={local.marketing}
            onCheckedChange={(v) => set("marketing", v)}
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button type="button" variant="outline" onClick={onRejectAll}>
            Odrzuć wszystkie
          </Button>
          <Button type="button" variant="outline" onClick={onAcceptAll}>
            Akceptuj wszystkie
          </Button>
          <Button type="button" onClick={() => onSave(local)}>
            Zapisz wybór
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CategoryRow = ({
  title,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (v: boolean) => void;
}) => (
  <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-secondary/40 p-4">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {disabled && <span className="text-[10px] uppercase tracking-wider text-muted-foreground">zawsze aktywne</span>}
      </div>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
    <Switch
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      aria-label={`Zgoda: ${title}`}
    />
  </div>
);

export default CookieConsentProvider;
