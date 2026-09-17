/**
 * Pełna treść dokumentów prawnych w jednym miejscu.
 */

export const LEGAL_VERSION = "1.0";
export const LEGAL_UPDATED = "27 lipca 2026 r.";

export const COMPANY = {
  name: "Leniar&Leniar Sp. z o.o. Sp. komandytowa",
  legalForm: "spółka komandytowa",
  address: "ul. Szlak 67, 31-153 Kraków, województwo małopolskie",
  nip: "6793179929",
  regon: "382451991",
  krs: "0000769423",
  email: "roman.juryk@leniar.pl",
  phone: "+48 17 283 11 41",
  dpo: "nie powołano",
  complaintsEmail: "roman.juryk@leniar.pl",
};

/* ============================================================
   POLITYKA PRYWATNOŚCI
   ============================================================ */

export const PrivacyPolicyContent = () => (
  <div className="space-y-8">
    <header className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Wersja dokumentu: {LEGAL_VERSION} · Data ostatniej aktualizacji: {LEGAL_UPDATED}
      </p>
    </header>

    <section>
      <h2 className="text-xl font-semibold mb-3">1. Administrator danych osobowych</h2>
      <p>
        Administratorem Twoich danych osobowych jest <strong>{COMPANY.name}</strong> ({COMPANY.legalForm}),
        z siedzibą pod adresem: {COMPANY.address}, NIP: {COMPANY.nip}, REGON: {COMPANY.regon}, KRS: {COMPANY.krs}.
      </p>
      <p className="mt-2">
        Kontakt: e-mail{" "}
        <a className="text-primary hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, tel.{" "}
        <a className="text-primary hover:underline" href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>.
      </p>
      <p className="mt-2">
        Inspektor Ochrony Danych: <strong>{COMPANY.dpo}</strong>.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">2. Jakie dane zbieramy</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>dane podane w formularzu kontaktowym: imię i nazwisko, adres e-mail, nazwa firmy, numer telefonu, treść wiadomości, ewentualne załączniki techniczne (np. rysunki 2D/3D);</li>
        <li>dane techniczne i logi serwera: adres IP, identyfikator sesji, data i godzina wizyty, typ przeglądarki i urządzenia, adres URL strony odsyłającej;</li>
        <li>dane zapisane w plikach cookies i podobnych technologiach – w zakresie opisanym w <a className="text-primary hover:underline" href="/polityka-cookies">Polityce cookies</a>.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">3. Cele i podstawy prawne przetwarzania</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Odpowiedź na zapytanie i kontakt handlowy</strong> – art. 6 ust. 1 lit. b RODO (działania zmierzające do zawarcia umowy) oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora polegający na obsłudze korespondencji i relacji biznesowych B2B).
        </li>
        <li>
          <strong>Marketing własnych produktów i usług</strong> – art. 6 ust. 1 lit. a RODO (zgoda osoby, której dane dotyczą), w połączeniu z ustawą o świadczeniu usług drogą elektroniczną i Prawem telekomunikacyjnym w zakresie kanału komunikacji.
        </li>
        <li>
          <strong>Analityka, pomiary i cookies inne niż niezbędne</strong> – art. 6 ust. 1 lit. a RODO (zgoda wyrażona w banerze zgód).
        </li>
        <li>
          <strong>Ustalenie, dochodzenie i obrona roszczeń</strong> – art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora).
        </li>
        <li>
          <strong>Wypełnienie obowiązków prawnych</strong> (np. podatkowych, księgowych) – art. 6 ust. 1 lit. c RODO.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">4. Okres przechowywania danych</h2>
      <p>
        Dane przechowujemy przez okres: <strong>do zakończenia korespondencji handlowej oraz dodatkowo 3 lata na cele dowodowe i obronę przed ewentualnymi roszczeniami</strong>. W przypadku zgód marketingowych – do momentu ich wycofania. Dane przetwarzane na podstawie obowiązków prawnych przechowujemy przez okresy wymagane przepisami.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">5. Odbiorcy danych i podmioty przetwarzające</h2>
      <p>Twoje dane mogą być powierzane następującym kategoriom odbiorców i podprocesorów:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>dostawca hostingu strony i infrastruktury serwerowej – <strong>Lovable (hosting strony) oraz Supabase / Amazon Web Services – serwery w UE</strong>;</li>
        <li>dostawca poczty elektronicznej i narzędzi do wysyłki wiadomości – <strong>Resend (wysyłka wiadomości z formularza) oraz operator poczty firmowej</strong>;</li>
        <li>narzędzia analityczne i marketingowe – <strong>obecnie nie korzystamy z narzędzi analitycznych ani marketingowych</strong>;</li>
        <li>dostawca usługi ochrony przed botami (CAPTCHA) – <strong>hCaptcha (Intuition Machines, Inc.)</strong>;</li>
        <li>biuro rachunkowe, kancelaria prawna, podmioty świadczące usługi IT – w niezbędnym zakresie.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">6. Przekazywanie danych poza EOG</h2>
      <p>
        <strong>TAK</strong> – jeżeli korzystamy z narzędzi dostawców z siedzibą poza Europejskim Obszarem Gospodarczym (np. USA), przekazanie odbywa się na podstawie:{" "}
        <strong>standardowych klauzul umownych (SCC) zatwierdzonych przez Komisję Europejską lub decyzji o adekwatności (Data Privacy Framework)</strong>.
        Kopię zabezpieczeń można uzyskać kontaktując się na adres {COMPANY.email}.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">7. Twoje prawa</h2>
      <p>W związku z przetwarzaniem przysługuje Ci prawo do:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>dostępu do swoich danych oraz uzyskania ich kopii;</li>
        <li>sprostowania (poprawienia) danych;</li>
        <li>usunięcia danych („prawo do bycia zapomnianym");</li>
        <li>ograniczenia przetwarzania;</li>
        <li>wniesienia sprzeciwu wobec przetwarzania;</li>
        <li>przenoszenia danych;</li>
        <li>cofnięcia zgody w dowolnym momencie – co nie wpływa na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem;</li>
        <li>wniesienia skargi do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</li>
      </ul>
      <p className="mt-3">Aby skorzystać z praw, napisz na adres: <a className="text-primary hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">8. Dobrowolność podania danych</h2>
      <p>
        Podanie danych jest dobrowolne, lecz niezbędne do udzielenia odpowiedzi na zapytanie ofertowe i prowadzenia korespondencji biznesowej. Brak podania danych uniemożliwi obsługę zapytania. Wyrażenie zgód marketingowych jest w pełni dobrowolne i nie warunkuje udzielenia odpowiedzi.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">9. Profilowanie i zautomatyzowane decyzje</h2>
      <p>
        Twoje dane nie są wykorzystywane do zautomatyzowanego podejmowania decyzji wywołujących skutki prawne ani podobnie istotnych skutków, w tym profilowania w rozumieniu art. 22 RODO.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">10. Zmiany Polityki</h2>
      <p>
        Zastrzegamy możliwość aktualizacji niniejszej Polityki. Aktualna wersja jest zawsze dostępna na tej stronie wraz z datą publikacji i numerem wersji.
      </p>
    </section>
  </div>
);

/* ============================================================
   POLITYKA COOKIES
   ============================================================ */

export const CookiePolicyContent = ({ openSettings }: { openSettings: () => void }) => (
  <div className="space-y-8">
    <header className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Wersja dokumentu: {LEGAL_VERSION} · Data ostatniej aktualizacji: {LEGAL_UPDATED}
      </p>
    </header>

    <section>
      <h2 className="text-xl font-semibold mb-3">1. Czym są pliki cookies</h2>
      <p>
        Pliki cookies („ciasteczka") to niewielkie pliki tekstowe zapisywane przez przeglądarkę na Twoim urządzeniu końcowym. Używamy ich oraz innych podobnych technologii (np. local storage, piksele) w celu zapewnienia prawidłowego działania serwisu, analityki ruchu oraz – za Twoją zgodą – w celach marketingowych.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">2. Kategorie cookies</h2>
      <ul className="space-y-3">
        <li>
          <strong>Niezbędne</strong> – wymagane do działania strony i jej podstawowych funkcji (m.in. zapamiętanie wyboru zgód, sesja). Zawsze aktywne, nie wymagają zgody.
        </li>
        <li>
          <strong>Funkcjonalne</strong> – umożliwiają zapamiętanie preferencji użytkownika (np. wersja językowa, motyw). Włączane wyłącznie po uzyskaniu zgody.
        </li>
        <li>
          <strong>Analityczne</strong> – pozwalają mierzyć ruch i sposób korzystania ze strony w celu jej ulepszania. Włączane wyłącznie po uzyskaniu zgody.
        </li>
        <li>
          <strong>Marketingowe</strong> – służą do personalizacji treści i reklam oraz mierzenia skuteczności kampanii. Włączane wyłącznie po uzyskaniu zgody.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">3. Wykaz cookies używanych w serwisie</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-foreground">
            <tr>
              <th className="text-left p-3 font-semibold">Nazwa</th>
              <th className="text-left p-3 font-semibold">Dostawca</th>
              <th className="text-left p-3 font-semibold">Cel</th>
              <th className="text-left p-3 font-semibold">Czas przechowywania</th>
              <th className="text-left p-3 font-semibold">Kategoria</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-3 font-mono text-xs">leniar_consent</td>
              <td className="p-3">odlewnialeniar.pl</td>
              <td className="p-3">Zapis decyzji użytkownika dot. cookies</td>
              <td className="p-3">12 miesięcy</td>
              <td className="p-3">Niezbędne</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-xs">theme</td>
              <td className="p-3">odlewnialeniar.pl</td>
              <td className="p-3">Zapamiętanie jasnego / ciemnego motywu strony</td>
              <td className="p-3">12 miesięcy</td>
              <td className="p-3">Niezbędne</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-xs">language</td>
              <td className="p-3">odlewnialeniar.pl</td>
              <td className="p-3">Zapamiętanie wybranej wersji językowej (PL / EN / DE)</td>
              <td className="p-3">12 miesięcy</td>
              <td className="p-3">Niezbędne</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-xs">hCaptcha</td>
              <td className="p-3">hcaptcha.com</td>
              <td className="p-3">Ochrona formularza zapytania ofertowego przed botami</td>
              <td className="p-3">Sesja / do 30 dni</td>
              <td className="p-3">Niezbędne</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Nie stosujemy obecnie plików cookie analitycznych ani marketingowych. Tabela zostanie zaktualizowana po wdrożeniu takich narzędzi.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">4. Zarządzanie zgodą</h2>
      <p>
        W każdej chwili możesz zmienić lub wycofać udzieloną zgodę, klikając przycisk poniżej. Możesz również zarządzać plikami cookies bezpośrednio w ustawieniach swojej przeglądarki (Chrome, Firefox, Safari, Edge i inne) – w tym je usuwać i blokować.
      </p>
      <button
        type="button"
        onClick={openSettings}
        className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Otwórz ustawienia cookies
      </button>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">5. Skutki wyłączenia cookies</h2>
      <p>
        Wyłączenie cookies niezbędnych może uniemożliwić poprawne korzystanie z części funkcji serwisu. Wyłączenie pozostałych kategorii ogranicza naszą zdolność do mierzenia ruchu i poprawy jakości serwisu.
      </p>
    </section>
  </div>
);

/* ============================================================
   REGULAMIN
   ============================================================ */

export const TermsContent = () => (
  <div className="space-y-8">
    <header className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Wersja dokumentu: {LEGAL_VERSION} · Data wejścia w życie: {LEGAL_UPDATED}
      </p>
    </header>

    <section>
      <h2 className="text-xl font-semibold mb-3">§1. Definicje</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Usługodawca</strong> – {COMPANY.name} ({COMPANY.legalForm}), {COMPANY.address}, NIP: {COMPANY.nip}, REGON: {COMPANY.regon}, KRS: {COMPANY.krs}.</li>
        <li><strong>Serwis</strong> – strona internetowa dostępna pod adresem odlewnialeniar.pl.</li>
        <li><strong>Użytkownik</strong> – osoba fizyczna, prawna lub jednostka organizacyjna korzystająca z Serwisu.</li>
        <li><strong>Usługa</strong> – usługa świadczona drogą elektroniczną w rozumieniu ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">§2. Postanowienia ogólne</h2>
      <p>
        Niniejszy Regulamin określa zasady korzystania z Serwisu oraz świadczenia drogą elektroniczną usług polegających w szczególności na obsłudze formularza kontaktowego (zapytań ofertowych B2B) oraz – jeżeli zostanie udostępniona – usługi newslettera.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">§3. Rodzaj i zakres usług</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>obsługa zapytań kierowanych przez formularz kontaktowy (RFQ);</li>
        <li>udostępnianie treści informacyjnych dotyczących oferty Usługodawcy;</li>
        <li>(opcjonalnie) wysyłka newslettera na podstawie odrębnej zgody Użytkownika.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">§4. Warunki świadczenia usług i wymagania techniczne</h2>
      <p>Do prawidłowego korzystania z Serwisu wymagane jest:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>urządzenie z dostępem do Internetu;</li>
        <li>aktualna wersja przeglądarki internetowej (Chrome, Firefox, Safari, Edge) z włączoną obsługą JavaScript;</li>
        <li>aktywny adres e-mail – dla usług wymagających komunikacji elektronicznej.</li>
      </ul>
      <p className="mt-3">
        Korzystanie z Serwisu jest nieodpłatne. Usługodawca zastrzega prawo do przerw technicznych niezbędnych dla utrzymania i rozwoju Serwisu.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">§5. Zakaz dostarczania treści bezprawnych</h2>
      <p>
        Użytkownika obowiązuje zakaz dostarczania treści o charakterze bezprawnym, w szczególności naruszających dobra osobiste, prawa własności intelektualnej osób trzecich, a także treści obraźliwych, wulgarnych lub wprowadzających w błąd.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">§6. Tryb reklamacji</h2>
      <p>
        Reklamacje dotyczące usług świadczonych drogą elektroniczną można składać na adres e-mail:{" "}
        <a className="text-primary hover:underline" href={`mailto:${COMPANY.complaintsEmail}`}>{COMPANY.complaintsEmail}</a>.
        Reklamacja powinna zawierać: oznaczenie Użytkownika (w tym dane kontaktowe), opis problemu oraz oczekiwany sposób rozpatrzenia. Reklamacje rozpatrywane są w terminie <strong>14 dni</strong> od dnia otrzymania.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">§7. Prawa autorskie i własność intelektualna</h2>
      <p>
        Wszelkie treści zamieszczone w Serwisie (teksty, grafiki, zdjęcia, logotypy, układ strony) stanowią przedmiot praw autorskich i są chronione zgodnie z ustawą z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych. Wykorzystywanie ich w jakiejkolwiek formie wymaga uprzedniej, pisemnej zgody Usługodawcy.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">§8. Ochrona danych osobowych</h2>
      <p>
        Zasady przetwarzania danych osobowych opisane są w <a className="text-primary hover:underline" href="/polityka-prywatnosci">Polityce prywatności</a>. Zasady dotyczące plików cookies określa <a className="text-primary hover:underline" href="/polityka-cookies">Polityka cookies</a>.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">§9. Postanowienia końcowe</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>W sprawach nieuregulowanych Regulaminem stosuje się prawo polskie, w szczególności Kodeks cywilny oraz ustawę o świadczeniu usług drogą elektroniczną.</li>
        <li>Spory wynikłe z korzystania z Serwisu rozstrzyga sąd właściwy miejscowo dla siedziby Usługodawcy (dotyczy relacji B2B).</li>
        <li>Usługodawca zastrzega prawo do zmiany Regulaminu. Aktualna wersja jest publikowana w Serwisie z datą wejścia w życie.</li>
      </ul>
    </section>
  </div>
);


