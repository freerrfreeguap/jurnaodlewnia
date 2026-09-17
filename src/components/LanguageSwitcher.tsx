import { useState } from "react";
import { useLanguage, Language } from "@/i18n";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import flagPl from "@/assets/flag-pl.png";
import flagEn from "@/assets/flag-en.webp";
import flagDe from "@/assets/flag-de.png";

const flags: Record<Language, string> = {
  pl: flagPl,
  en: flagEn,
  de: flagDe,
};

const labels: Record<Language, string> = {
  pl: "PL",
  en: "GB",
  de: "DE",
};

const langNames: Record<Language, string> = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
};

const chooseLanguageLabel: Record<Language, string> = {
  pl: "Wybierz język",
  en: "Choose language",
  de: "Sprache wählen",
};

const langs: Language[] = ["pl", "en", "de"];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-secondary text-sm leading-none transition-colors hover:bg-accent focus:outline-none"
      >
        <img
          src={flags[language]}
          alt={labels[language]}
          className="w-5 h-3.5 object-cover rounded-[2px]"
        />
        <span className="font-medium text-foreground">{labels[language]}</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[280px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-base">{chooseLanguageLabel[language]}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 pt-2">
            {langs.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setDialogOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  language === lang
                    ? "bg-primary/10 font-semibold text-foreground"
                    : "hover:bg-accent text-muted-foreground"
                }`}
              >
                <img
                  src={flags[lang]}
                  alt={labels[lang]}
                  className="w-6 h-4 object-cover rounded-[2px]"
                />
                <span>{langNames[lang]}</span>
                <span className="ml-auto text-xs opacity-60">{labels[lang]}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageSwitcher;
