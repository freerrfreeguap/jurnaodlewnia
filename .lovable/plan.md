## Cel
Dodać duże, mocno widoczne CTA („Wyślij zapytanie" + „Poproś o wycenę") w wielu sensownych miejscach na stronie, żeby były na każdej podstronie i przewijanie strony głównej regularnie je przypominało.

## 1. Nowy komponent `src/components/CtaButtonsBlock.tsx`
Reużywalny pas z dwoma dużymi CTA prowadzącymi do `/kontakt`:
- Lewy: `variant="cta"` — `{t("common.sendInquiry")}` (z ikoną ArrowRight).
- Prawy: `variant="outline"` — `{t("common.requestQuote")}` (subtelne pulsowanie).
- Wymiary: `h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-semibold`.
- Layout: wyśrodkowany na pełną szerokość, optional krótki nagłówek/podtytuł przekazany propsami (`title`, `subtitle`, `tone: "light" | "navy" | "minimal"`).
- Trzy warianty tła:
  - `minimal` — separator nad/pod, jasne tło, dla wstawek między sekcjami.
  - `navy` — granatowe (`bg-primary text-primary-foreground`), dla mocniejszego akcentu.
  - `light` — `bg-secondary`, neutralny.

## 2. `src/components/HeroSection.tsx`
- Zamienić drugi przycisk `hero.ctaProcess → /technologia` na **„Poproś o wycenę"** (`common.requestQuote`) prowadzący do `/kontakt`, tak by oba hero-CTA były tymi samymi, które user chce „rzucać w oczy". Klasa i rozmiar bez zmian.

## 3. Strona główna `src/pages/Index.tsx`
Wstawić `<CtaButtonsBlock>` w 4 strategicznych miejscach (oprócz istniejącego QuickQuoteBanner):
1. Po `WhyUsSection` (tone `navy`, tytuł „Gotowi na projekt?").
2. Po `CapabilitiesShowcase` (tone `minimal`).
3. Po `RealizationsGallery` (tone `light`).
4. Po `ApplicationsSection` (tone `navy`).

(QuickQuoteBanner zostaje — jego buttony też powiększymy do tych samych wymiarów `h-14 md:h-16`.)

## 4. Podstrony — po jednym bloku CTA na końcu treści
- `src/pages/Uslugi.tsx` — `tone="navy"` po `ServicesSection`.
- `src/pages/Technologia.tsx` — `tone="navy"` po `RealizationsGallery`.
- `src/pages/Branze.tsx` — `tone="navy"` po `IndustriesSection`.
- `src/pages/ProdukcjaBiezaca.tsx` — `tone="navy"` po galerii.
- `src/pages/Kontakt.tsx` — bez zmian (już jest formularz; dodawanie CTA do siebie samej nie ma sensu).

## 5. `QuickQuoteBanner.tsx`
Podbić rozmiar obu przycisków do `h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl font-semibold`, żeby były spójne z nową rodziną CTA.

## Poza zakresem
- Brak zmian tłumaczeń, routingu, formularzy, kolorystyki ogólnej.
- Brak zmian w `StickyMobileCTA`.