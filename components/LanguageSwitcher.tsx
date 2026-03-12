"use client";

import { useLocale } from "./LocaleProvider";
import { getLocaleLabel } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const locales: Locale[] = ["en", "hi", "cg"];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex gap-1 bg-cream rounded-lg p-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            locale === l
              ? "bg-terracotta text-white"
              : "text-gray-600 hover:text-terracotta"
          }`}
        >
          {getLocaleLabel(l)}
        </button>
      ))}
    </div>
  );
}
