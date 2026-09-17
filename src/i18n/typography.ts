/**
 * Poprawki typografii polskiej stosowane globalnie do tekstów z tłumaczeń:
 * - twarda spacja po jednoliterowych spójnikach (i, w, z, o, a, u, e-mail itp.),
 * - półpauza zamiast dywizu użytego jako myślnik w zdaniu.
 */
const ORPHANS = /(^|[\s(„"'>])([aiouwzAIOUWZ])\s+/g;

export const polishTypography = (text: string): string => {
  if (!text) return text;
  let out = text;
  // dywiz otoczony spacjami -> półpauza
  out = out.replace(/ - /g, " – ");
  // twarde spacje po jednoliterowych wyrazach (dwa przebiegi, bo regexy nakładają się)
  out = out.replace(ORPHANS, "$1$2\u00A0");
  out = out.replace(ORPHANS, "$1$2\u00A0");
  return out;
};
