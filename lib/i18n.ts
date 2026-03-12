import type { Locale } from "./types";

import en from "@/messages/en.json";
import hi from "@/messages/hi.json";
import cg from "@/messages/cg.json";

const messages: Record<Locale, Record<string, string>> = { en, hi, cg };

export function t(key: string, locale: Locale = "hi"): string {
  return messages[locale]?.[key] ?? messages.en[key] ?? key;
}

export function getLocaleLabel(locale: Locale): string {
  const labels: Record<Locale, string> = {
    en: "English",
    hi: "हिंदी",
    cg: "छत्तीसगढ़ी",
  };
  return labels[locale];
}
