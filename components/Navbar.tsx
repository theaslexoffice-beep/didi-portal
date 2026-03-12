"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const links = [
    { href: "/", label: t("nav_home") },
    { href: "/complaints", label: t("nav_complaints") },
    { href: "/complaints/new", label: t("nav_submit") },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">🙏</span>
          <div>
            <span className="text-xl font-bold text-terracotta">DIDI</span>
            <p className="text-xs text-gray-500 hidden sm:block">
              {t("app_tagline")}
            </p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-700 hover:text-terracotta font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-gray-700 hover:text-terracotta font-medium border-b border-gray-100"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
