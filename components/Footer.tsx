"use client";

import { useLocale } from "./LocaleProvider";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-terracotta font-semibold">{t("footer_text")}</p>
        <p className="text-sm text-gray-500 mt-1">{t("footer_privacy")}</p>
        <p className="text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} DIDI — Not for profit
        </p>
      </div>
    </footer>
  );
}
