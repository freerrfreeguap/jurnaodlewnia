import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, User, FileText, Paperclip, X, Globe, MapPin, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import LocationMap from "@/components/LocationMap";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useLanguage } from "@/i18n";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/content/legal";
import { trackQuoteClick, trackQuoteSubmit } from "@/lib/analytics";

const HCAPTCHA_SITE_KEY = "b70c37cc-4966-4f92-aa66-014e118ad8a0";

const ACCEPTED_FILE_TYPES = ".pdf,.step,.stp,.iges,.igs,.dwg,.dxf,.sat,.x_t,.x_b,.stl,.3mf,.obj,.png,.jpg,.jpeg";
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_FILES = 5;

const ContactSection = ({ asH1 = false }: { asH1?: boolean }) => {
  const Heading = asH1 ? "h1" : "h2";
  const { toast } = useToast();
  const { t, tArray } = useLanguage();

  const contactSchema = z.object({
    name: z.string().trim().min(1, t("contact.validationName")).max(100),
    company: z.string().trim().max(100).optional(),
    email: z.string().trim().email(t("contact.validationEmail")).max(255),
    phone: z.string().trim().max(24)
      .refine((v) => !v || /^[+()\d][\d\s()./-]{5,23}$/.test(v), t("contact.validationPhone"))
      .optional(),
    message: z.string().trim().min(1, t("contact.validationMessage")).max(2000)
  });


  type FormData = z.infer<typeof contactSchema>;
  type FormErrors = Partial<Record<keyof FormData, string>>;

  const [form, setForm] = useState<FormData>({
    name: "", company: "", email: "", phone: "", message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState<string | undefined>();

  // hCaptcha
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const combined = [...files, ...newFiles].slice(0, MAX_FILES);
    const valid = combined.filter(f => f.size <= MAX_FILE_SIZE);
    if (valid.length < combined.length) {
      toast({ title: t("contact.toastFileTooBig"), description: t("contact.toastFileTooBigDesc") });
    }
    setFiles(valid);
    e.target.value = "";
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (!privacyAccepted) {
      setPrivacyError("Akceptacja Polityki prywatności jest wymagana, aby wysłać zapytanie.");
      return;
    }
    if (!captchaToken) {
      setCaptchaError(t("contact.captchaError"));
      return;
    }
    setStatus("loading");
    try {
      const fileToBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const res = reader.result as string;
          resolve(res.split(",")[1] ?? "");
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

      const attachments = await Promise.all(
        files.map(async (f) => ({ filename: f.name, content: await fileToBase64(f) }))
      );

      const { error: sendError } = await supabase.functions.invoke("send-contact-email", {
        body: { ...form, attachments, captchaToken, consents: { privacy: privacyAccepted, marketing: marketingAccepted } },
      });
      if (sendError) {
        toast({ title: t("contact.captchaError"), description: sendError.message, variant: "destructive" });
        setStatus("idle");
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
        return;
      }

      setStatus("success");
      trackQuoteSubmit();
      toast({ title: t("contact.toastTitle"), description: t("contact.toastDesc") });
    } catch {
      setCaptchaError(t("contact.captchaError"));
      setStatus("idle");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  };

  const rfqItems = tArray("contact.rfqItems");

  return (
    <section id="kontakt" className="section-padding border-t border-border">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("contact.tag")}</p>
            <Heading className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
              {t("contact.title")}
            </Heading>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("contact.desc1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("contact.desc2")}</p>
            <div className="flex items-start gap-2 p-3 rounded bg-secondary border border-border mb-8">
              <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{t("contact.confidentialLabel")}</span>{" "}
                {t("contact.confidentialText")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("contact.managerRole")}</div>
                  <div className="font-medium text-foreground">Roman Juryk – Menadżer Produktu</div>
                  <div className="text-sm text-muted-foreground">LENIAR – {t("contact.managerCompany")}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("contact.phoneMobileLabel")}</div>
                  <a href="tel:+48690841365" className="block text-foreground hover:text-primary transition-colors font-medium">
                    +48 690 841 365
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">{t("contact.emailLabel")}</div>
                  <a href="mailto:roman.juryk@leniar.pl" className="block text-foreground hover:text-primary transition-colors font-medium">
                    roman.juryk@leniar.pl
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">www</div>
                  <a href="https://odlewnialeniar.pl" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">
                    odlewnialeniar.pl
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("home.locationTag")}</div>
                  <div className="text-foreground font-medium">{t("home.locationOffice")}</div>
                  <div className="text-sm text-muted-foreground">{t("home.locationOfficeAddr")}</div>
                  <div className="text-foreground font-medium mt-2">{t("home.locationProduction")}</div>
                  <div className="text-sm text-muted-foreground">{t("home.locationProductionAddr")}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("contact.phoneLabel")}</div>
                  <a href="tel:+48172831141" className="block text-foreground hover:text-primary transition-colors font-medium">
                    +48 17 283 11 41
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <Button asChild size="lg" className="min-h-[48px] w-full">
                <a href="tel:+48172831141">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {t("contact.quickCall")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[48px] w-full">
                <a href="mailto:roman.juryk@leniar.pl">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  {t("contact.quickMail")}
                </a>
              </Button>
            </div>

            <div className="mt-6 p-6 rounded-xl bg-secondary border border-border">
              <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                {t("contact.rfqTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{t("contact.rfqDesc")}</p>
              <ul className="space-y-1.5">
                {rfqItems.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl p-6 md:p-8 border border-border bg-secondary">
            <div>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-12" role="status" aria-live="polite">

                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t("contact.formSuccessTitle")}</h3>
                  <p className="text-muted-foreground">{t("contact.formSuccessDesc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="rfq-name" className="text-sm font-medium text-foreground mb-1.5 block">
                      {t("contact.formName")} <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <Input id="rfq-name" name="name" autoComplete="name" required aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? "rfq-name-error" : undefined} value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder={t("contact.formNamePlaceholder")} className="h-11 bg-background border-border" />
                    {errors.name && <p id="rfq-name-error" role="alert" className="text-xs font-medium text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="rfq-company" className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.formCompany")}</label>
                    <Input id="rfq-company" name="organization" autoComplete="organization" value={form.company} onChange={(e) => handleChange("company", e.target.value)} placeholder={t("contact.formCompanyPlaceholder")} className="h-11 bg-background border-border" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rfq-email" className="text-sm font-medium text-foreground mb-1.5 block">
                        {t("contact.formEmail")} <span className="text-destructive" aria-hidden="true">*</span>
                      </label>
                      <Input id="rfq-email" name="email" autoComplete="email" required aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "rfq-email-error" : undefined} type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder={t("contact.formEmailPlaceholder")} className="h-11 bg-background border-border" />
                      {errors.email && <p id="rfq-email-error" role="alert" className="text-xs font-medium text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="rfq-phone" className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.formPhone")}</label>
                      <Input id="rfq-phone" name="tel" autoComplete="tel" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder={t("contact.formPhonePlaceholder")} className="h-11 bg-background border-border" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="rfq-message" className="text-sm font-medium text-foreground mb-1.5 block">
                      {t("contact.formMessage")} <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <Textarea id="rfq-message" name="message" required aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? "rfq-message-error" : undefined} value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder={t("contact.formMessagePlaceholder")} rows={5} className="bg-background border-border resize-none" />
                    {errors.message && <p id="rfq-message-error" role="alert" className="text-xs font-medium text-destructive mt-1">{errors.message}</p>}
                  </div>

                  <div>
                    <span className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.formAttachments")}</span>
                    <label className="flex items-center gap-2 cursor-pointer w-full rounded-md border border-dashed border-border bg-background px-3 py-3 text-sm text-muted-foreground hover:border-primary hover:text-foreground transition-colors">
                      <Paperclip className="w-4 h-4 shrink-0" />
                      <span>{t("contact.formAttachLabel")}</span>
                      <input type="file" multiple accept={ACCEPTED_FILE_TYPES} onChange={handleFileChange} className="hidden" />
                    </label>
                    {files.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {files.map((file, i) => (
                          <li key={`${file.name}-${i}`} className="flex items-center gap-2 text-xs text-foreground bg-secondary rounded px-2 py-1.5">
                            <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="truncate flex-1">{file.name}</span>
                            <span className="text-muted-foreground shrink-0">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                            <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <span className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.captchaLabel")} <span className="text-destructive" aria-hidden="true">*</span></span>
                    <HCaptcha
                      ref={captchaRef}
                      sitekey={HCAPTCHA_SITE_KEY}
                      onVerify={(token) => { setCaptchaToken(token); setCaptchaError(undefined); }}
                      onExpire={() => setCaptchaToken(null)}
                      onError={() => { setCaptchaToken(null); setCaptchaError(t("contact.captchaError")); }}
                    />
                    {captchaError && <p role="alert" className="text-xs font-medium text-destructive mt-1">{captchaError}</p>}
                  </div>

                  <div className="space-y-3 rounded-lg border border-border bg-background p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent-privacy"
                        checked={privacyAccepted}
                        onCheckedChange={(v) => {
                          setPrivacyAccepted(v === true);
                          if (v === true) setPrivacyError(undefined);
                        }}
                        className="mt-0.5"
                        aria-required="true"
                        aria-invalid={!!privacyError}
                      />
                      <label htmlFor="consent-privacy" className="text-xs text-foreground leading-relaxed cursor-pointer">
                        <span className="text-destructive">*</span> Zapoznałem/-am się z{" "}
                        <Link to="/polityka-prywatnosci" target="_blank" className="text-primary hover:underline">Polityką prywatności</Link>{" "}
                        i akceptuję zasady przetwarzania moich danych.
                      </label>
                    </div>
                    {privacyError && <p className="text-xs font-medium text-destructive" role="alert">{privacyError}</p>}

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent-marketing"
                        checked={marketingAccepted}
                        onCheckedChange={(v) => setMarketingAccepted(v === true)}
                        className="mt-0.5"
                      />
                      <label htmlFor="consent-marketing" className="text-xs text-foreground leading-relaxed cursor-pointer">
                        Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną na podany adres e-mail lub numer telefonu
                        (zgoda zgodna z ustawą o świadczeniu usług drogą elektroniczną i Prawem telekomunikacyjnym). Zgoda jest dobrowolna i mogę ją wycofać w każdej chwili.
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-lg border border-border bg-background p-4 text-xs text-foreground/90 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <p>
                      <span className="font-semibold text-foreground">Klauzula informacyjna RODO:</span>{" "}
                      Administratorem Twoich danych jest {COMPANY.name} ({COMPANY.address}). Dane przetwarzamy w celu odpowiedzi na zapytanie
                      (art. 6 ust. 1 lit. b i f RODO). Przysługuje Ci prawo dostępu, sprostowania, usunięcia, ograniczenia, sprzeciwu, przenoszenia danych
                      oraz wniesienia skargi do Prezesa UODO. Pełne informacje:{" "}
                      <Link to="/polityka-prywatnosci" className="text-primary hover:underline">Polityka prywatności</Link>.
                    </p>
                  </div>

                  <Button type="submit" size="lg" onClick={() => trackQuoteClick("contact_form_button")} className="w-full min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90" disabled={status === "loading"} aria-busy={status === "loading"}>
                    {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                    {status === "loading" ? t("contact.formSubmitting") : t("contact.formSubmit")}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Pola oznaczone <span className="text-destructive">*</span> są wymagane.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
