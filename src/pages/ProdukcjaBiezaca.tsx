import PageLayout from "@/components/PageLayout";
import Seo from "@/components/Seo";
import CtaButtonsBlock from "@/components/CtaButtonsBlock";
import { breadcrumbLd } from "@/lib/seo";
import { useLanguage } from "@/i18n";
import img2 from "@/assets/leniar/leniar-2.webp.asset.json";
import img7 from "@/assets/leniar/leniar-7.webp.asset.json";
import img8 from "@/assets/leniar/leniar-8.webp.asset.json";
import img10 from "@/assets/leniar/leniar-10.webp.asset.json";
import img11 from "@/assets/leniar/leniar-11.webp.asset.json";
import img12 from "@/assets/leniar/leniar-12.webp.asset.json";
import img15 from "@/assets/leniar/leniar-15.webp.asset.json";
import img16 from "@/assets/leniar/leniar-16.webp.asset.json";
import img17 from "@/assets/leniar/leniar-17.webp.asset.json";
import img18 from "@/assets/leniar/leniar-18.webp.asset.json";
import img19 from "@/assets/leniar/leniar-19.webp.asset.json";
import imgStos from "@/assets/leniar/odlewy-surowe-stos.png.asset.json";

import imgWlew from "@/assets/leniar/odlew-z-ukladem-wlewowym.png.asset.json";
import imgPortfolio from "@/assets/leniar/portfolio-detali-zamak.png.asset.json";
import imgZebate from "@/assets/leniar/kola-zebate-rysunek.png.asset.json";
import imgFormaMasz from "@/assets/leniar/forma-w-maszynie.png.asset.json";

import imgInHand from "@/assets/leniar/detal-surowy-w-dloni.png.asset.json";
import imgRawTech from "@/assets/leniar/detal-techniczny-surowy.png.asset.json";
import imgRawHinges from "@/assets/leniar/zawiasy-surowe-zamak.png.asset.json";
import imgRawBodies from "@/assets/leniar/detale-korpusy-surowe.png.asset.json";
import imgLShapes from "@/assets/leniar/precyzyjne-korpusy-l.png.asset.json";
import imgHandlesInsert from "@/assets/leniar/uchwyty-techniczne-z-wkladka.png.asset.json";
import imgGatesSet from "@/assets/leniar/odlewy-z-ukladem-wlewowym-zestaw.png.asset.json";
import imgFormyWozek from "@/assets/leniar/formy-na-wozku-hala.png.asset.json";
import imgFrechOdlewy from "@/assets/leniar/maszyna-frech-z-odlewami.png.asset.json";
import imgSuroweL from "@/assets/leniar/surowe-l-zawiasy-zestaw.png.asset.json";
import imgChromZawias from "@/assets/leniar/chromowany-zawias-prysznicowy.png.asset.json";
import imgSuroweOdlewyZamakStos from "@/assets/leniar/surowe-odlewy-zamak-stos.png.asset.json";

const ProdukcjaBiezaca = () => {
  const { t } = useLanguage();

  const items: { image: string; alt: string; label: string }[] = [
    { image: imgSuroweOdlewyZamakStos.url, alt: "Stos surowych odlewów Zamak – różnorodne detale techniczne prosto z produkcji", label: "Surowe odlewy Zamak" },
    { image: imgPortfolio.url, alt: "Portfolio detali Zamak – przegląd różnorodnych odlewów ciśnieniowych", label: "Portfolio detali" },
    { image: imgGatesSet.url, alt: "Zestaw odlewów z układem wlewowym – elementy po wyjęciu z formy", label: "Odlewy z układem wlewowym" },
    { image: imgStos.url, alt: "Świeże odlewy ciśnieniowe Zamak – partia produkcyjna prosto z maszyny", label: "Partia produkcyjna" },
    { image: imgFrechOdlewy.url, alt: "Maszyna FRECH z paletą świeżych odlewów Zamak – produkcja seryjna", label: "Maszyna FRECH w pracy" },
    { image: imgFormyWozek.url, alt: "Park form wielogniazdowych H13 na wózku transportowym w hali odlewni", label: "Park form H13" },
    { image: imgSuroweL.url, alt: "Surowe odlewy L – komponenty konstrukcyjne prosto z formy", label: "Korpusy L – surowe" },
    { image: imgChromZawias.url, alt: "Chromowany zawias prysznicowy – wykończenie premium na detalu Zamak", label: "Detale chromowane" },
    
    { image: imgInHand.url, alt: "Surowy detal techniczny trzymany w dłoni – widok na żebra i geometrię", label: "Detal surowy – geometria" },
    { image: imgRawHinges.url, alt: "Surowe zawiasy i komponenty z Zamak 5 po odlewie", label: "Zawiasy po odlewie" },
    { image: imgRawBodies.url, alt: "Surowe korpusy techniczne i obudowy z odlewu ciśnieniowego", label: "Korpusy i obudowy" },
    { image: imgLShapes.url, alt: "Precyzyjne korpusy w kształcie L – detal cienkościenny", label: "Detale cienkościenne" },
    { image: imgHandlesInsert.url, alt: "Uchwyty techniczne z wkładką – detal funkcjonalny po odlewie", label: "Uchwyty z wkładką" },
    { image: imgRawTech.url, alt: "Surowy detal techniczny o geometrii obrotowej", label: "Detal techniczny" },
    { image: img11.url, alt: "Otwarta forma w maszynie odlewniczej", label: "Forma w maszynie" },
    { image: img12.url, alt: "Forma z odlanym detalem w chwili otwarcia", label: "Forma i detal" },
    { image: img7.url, alt: "Forma do odlewu ciśnieniowego zamontowana w maszynie", label: "Oprzyrządowanie odlewnicze" },
    { image: img19.url, alt: "Forma odlewnicza H13 – oprzyrządowanie produkcyjne", label: "Forma H13" },
    { image: img17.url, alt: "Magazyn form i oprzyrządowania produkcyjnego", label: "Magazyn form" },
    { image: img10.url, alt: "Wlewki Zamak 5 – materiał wsadowy do odlewu", label: "Wlewki Zamak 5" },
    { image: img16.url, alt: "Stanowisko kontroli wymiarowej z przyrządami pomiarowymi", label: "Kontrola wymiarowa" },
    { image: img2.url, alt: "Ważenie i kompletacja detali po obróbce", label: "Pakowanie detali" },
    
    { image: imgWlew.url, alt: "Odlew z układem wlewowym – para detali z centralnym wlewem", label: "Odlew z układem wlewowym" },
    { image: imgZebate.url, alt: "Koła zębate Zamak na tle rysunku technicznego – produkcja wg dokumentacji klienta", label: "Produkcja wg dokumentacji" },
    { image: imgFormaMasz.url, alt: "Forma odlewnicza zamontowana w maszynie z układem chłodzenia", label: "Forma wielogniazdowa" },
    { image: img8.url, alt: "Maszyna odlewnicza FRECH – produkcja wysokociśnieniowa Zamak 5", label: "Odlewanie ciśnieniowe" },
    { image: img15.url, alt: "Hala odlewni – park maszynowy do produkcji seryjnej", label: "Hala produkcyjna" },
    { image: img18.url, alt: "Strefa montażu i pakowania w hali produkcyjnej", label: "Montaż i pakowanie" },
  ];

  return (
    <PageLayout>
      <Seo
        title="Bieżąca produkcja – odlewnia Zamak 5 | Leniar"
        description="Aktualne realizacje z hali: maszyny FRECH, formy H13, odlewy ciśnieniowe Zamak 5, kontrola jakości, montaż i pakowanie. Zobacz produkcję."
        path="/produkcja-biezaca"
        jsonLd={breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Produkcja bieżąca", path: "/produkcja-biezaca" },
        ])}
      />
      <section className="section-padding pt-32">
        <div className="section-container">
          <div className="max-w-2xl mb-12">
            <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">
              {t("currentProduction.tag")}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
              {t("currentProduction.title")}
            </h1>
            <p className="text-muted-foreground leading-relaxed">{t("currentProduction.desc")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <figure
                key={i}
                className="group overflow-hidden rounded-xl bg-card shadow-none hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="bg-primary text-primary-foreground px-4 py-3 text-sm font-medium">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaButtonsBlock tone="navy" />
    </PageLayout>
  );
};

export default ProdukcjaBiezaca;
