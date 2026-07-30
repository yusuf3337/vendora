"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Mail, Phone, PhoneCall, ChevronDown, Menu, X, Sparkles } from "lucide-react";
import CallbackModal from "./CallbackModal";
import { cn } from "@/lib/utils";
import { useLanguage, LanguageCode } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const languages: { code: LanguageCode; name: string; flag: string }[] = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export default function Header() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const activeLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  const navItems = [
    { href: "/urun", label: t("header.product") },
    { href: "/ozellikler", label: t("header.features") },
    { href: "/#fiyatlandirma", label: t("header.pricing") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 flex flex-col transition-all duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {/* TOPBAR */}
        <div className="bg-zinc-900 text-zinc-300 text-xs border-b border-zinc-800 relative z-50">
          <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
            {/* Left Contact Info */}
            <div className="flex items-center gap-6">
              <a
                href="mailto:info@vendora.com.tr"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span className="hidden sm:inline">info@vendora.com.tr</span>
              </a>
              <a
                href="tel:+905428191504"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>+90 542 819 1504</span>
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 h-full">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 hover:text-accent transition-colors h-full px-2 font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5 text-accent" />
                <span>{t("header.callUs")}</span>
              </button>

              <div className="w-px h-3 bg-zinc-700 hidden sm:block" />

              {/* Language Switcher */}
              <div className="relative h-full flex items-center" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors h-full px-2 font-medium"
                >
                  <span>{activeLang.flag}</span>
                  <span className="uppercase">{activeLang.code}</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      isLangOpen && "rotate-180 text-accent"
                    )}
                  />
                </button>

                {isLangOpen && (
                  <ul className="absolute top-full right-0 mt-1 w-36 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden py-1 z-50">
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-4 py-2 text-xs text-left transition-colors",
                            activeLang.code === lang.code
                              ? "bg-accent/10 text-accent font-semibold"
                              : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                          )}
                        >
                          <span className="text-sm">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div
          className={cn(
            "w-full border-b transition-all duration-300",
            scrolled
              ? "bg-white/90 backdrop-blur-xl border-zinc-200 shadow-sm py-2.5"
              : "bg-white/70 backdrop-blur-md border-zinc-200/60 py-3.5"
          )}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Vendora Logo"
                className="h-11 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1.5 rounded-full border border-zinc-200/80 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-zinc-900 bg-white shadow-xs font-semibold"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-full text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                {t("header.login")}
              </Link>
              <Link href="/register">
                <Button variant="glow" size="default" className="gap-2">
                  <Sparkles className="w-4 h-4 fill-white/20" />
                  {t("header.tryFree")}
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-zinc-700 hover:text-zinc-900 rounded-xl bg-zinc-100 border border-zinc-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-accent" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-200 px-6 py-6 space-y-4 shadow-xl">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-2xl text-base font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="pt-4 border-t border-zinc-200 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-2xl font-medium text-zinc-800 bg-zinc-100 border border-zinc-200"
                >
                  {t("header.login")}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-2xl font-semibold text-white bg-accent shadow-md shadow-orange-500/20"
                >
                  {t("header.tryFree")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
