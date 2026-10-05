/** Devis indicatif. Les montants de référence sont en francs suisses ; l'euro est la devise par défaut. */

import type { Lang } from "./i18n-data";

export type Currency = "CHF" | "EUR" | "USD" | "CZK";

export const CURRENCIES: { code: Currency; label: Record<Lang, string>; rate: number }[] = [
  { code: "EUR", label: { fr: "France / UE · EUR", en: "France / EU · EUR", de: "Frankreich / EU · EUR", sk: "Francúzsko / EÚ · EUR", cs: "Francie / EU · EUR" }, rate: 0.97 },
  { code: "CHF", label: { fr: "Suisse · CHF", en: "Switzerland · CHF", de: "Schweiz · CHF", sk: "Švajčiarsko · CHF", cs: "Švýcarsko · CHF" }, rate: 1 },
  { code: "USD", label: { fr: "États-Unis · USD", en: "United States · USD", de: "USA · USD", sk: "Spojené štáty · USD", cs: "Spojené státy · USD" }, rate: 1.11 },
  { code: "CZK", label: { fr: "Tchéquie · CZK", en: "Czech Republic · CZK", de: "Tschechien · CZK", sk: "Česko · CZK", cs: "Česko · CZK" }, rate: 26 },
];

const SYMBOL: Record<Currency, string> = { CHF: "CHF", EUR: "€", USD: "$", CZK: "Kč" };

export function computePrice(
  base: number,
  perScreen: number,
  perLang: number,
  screens: number,
  langs: number,
): number | null {
  if (base <= 0) return null;
  const extraScreens = perScreen * Math.max(0, screens - 5);
  const extraLangs = perLang * Math.max(0, langs - 1);
  return base + extraScreens + extraLangs;
}

export function formatCurrency(amountChf: number, currency: Currency): string {
  const rate = CURRENCIES.find((c) => c.code === currency)?.rate ?? 1;
  const converted = Math.round((amountChf * rate) / 10) * 10;
  const formatted = converted.toLocaleString("fr-CH");
  if (currency === "USD") return `${SYMBOL.USD}${formatted}`;
  if (currency === "CZK") {
    const grouped = String(converted).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
    return `${grouped}\u00a0${SYMBOL.CZK}`;
  }
  return `${SYMBOL[currency]} ${formatted}`;
}