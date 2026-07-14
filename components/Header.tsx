"use client";

import Image from "next/image";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Mail, Phone, PhoneCall, ChevronDown } from "lucide-react";
import CallbackModal from "./CallbackModal";
import { cn } from "@/lib/utils";
import { useLanguage, LanguageCode } from "@/contexts/LanguageContext";

const languages: { code: LanguageCode; name: string; flag: string }[] = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const activeLang = languages.find((l) => l.code === language) || languages[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex flex-col">
        {/* TOPBAR */}
        <div className="bg-zinc-900 text-white text-xs border-b border-zinc-800 relative z-50">
          <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
            {/* Left Contact Info */}
            <div className="flex items-center gap-6">
              <a href="mailto:info@vendora.com.tr" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">info@vendora.com.tr</span>
              </a>
              <a href="tel:+905428191504" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>+90 542 819 1504</span>
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 h-full">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 hover:text-accent transition-colors h-full px-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("header.callUs")}</span>
              </button>

              <div className="w-px h-4 bg-zinc-700 hidden sm:block" />

              {/* Language Switcher */}
              <div className="relative h-full flex items-center" ref={langRef}>
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 hover:text-accent transition-colors h-full px-2"
                >
                  <span>{activeLang.flag}</span>
                  <span className="uppercase">{activeLang.code}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isLangOpen && (
                  <ul className="absolute top-full right-0 mt-1 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden py-1 z-50">
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
                            "w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors",
                            activeLang.code === lang.code 
                              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium" 
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
                          )}
                        >
                          <span>{lang.flag}</span>
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
        <div className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm relative z-40">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="Vendora Logo" width={200} height={56} className="h-12 w-auto" priority />
            </Link>
            <nav className="hidden md:flex items-center gap-3">
              <Link href="/urun" className="bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                {t("header.product")}
              </Link>
              <Link href="/ozellikler" className="bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                {t("header.features")}
              </Link>
              <a href="/#fiyatlandirma" className="bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                {t("header.pricing")}
              </a>
            </nav>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                {t("header.login")}
              </button>
              <button className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                {t("header.tryFree")}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
