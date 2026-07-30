"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Lock,
  HeadphonesIcon,
  Globe,
  Monitor,
  Apple,
  Play,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useLanguage, LanguageCode } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const languages: { code: LanguageCode; name: string; flag: string }[] = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

const promoTexts = [
  "Güçlü altyapı, dinamik QR menüler ve kusursuz kurye takibi...\nİşletmenizi yönetmenin en kolay ve en modern hali.",
  "Gelişmiş raporlama, detaylı stok yönetimi ve anlık bildirimler...\nRestoranınızın her anını her yerden kontrol edin.",
  "Sorunsuz entegrasyonlar, kullanıcı dostu arayüz ve 7/24 kesintisiz destek...\nSatışlarınızı artırırken müşteri memnuniyetini zirveye taşıyın.",
];

export default function LoginPage() {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const [promoIndex, setPromoIndex] = useState(0);

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
    const timer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoTexts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center relative overflow-hidden bg-slate-50 text-zinc-900 selection:bg-accent selection:text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-dot-pattern opacity-60" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-20">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-zinc-900 space-y-6">
          <Link href="/" className="inline-block mb-2">
            <img
              src="/images/logo.png"
              alt="Vendora Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <p className="text-accent font-bold tracking-wider text-xs md:text-sm uppercase">
            TÜRKİYE'NİN EN YENİLİKÇİ RESTORAN SİSTEMİ
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-zinc-900">
            İşinizi <br />
            <span className="text-gradient-orange">otomatikleştirin.</span>
          </h1>

          <div className="relative min-h-25 max-w-xl">
            {promoTexts.map((text, idx) => (
              <p
                key={idx}
                className={cn(
                  "absolute inset-0 text-base md:text-lg text-zinc-600 leading-relaxed font-normal transition-all duration-700 ease-in-out whitespace-pre-line",
                  idx === promoIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                )}
              >
                {text}
              </p>
            ))}
          </div>

          <div className="pt-8 border-t border-zinc-200 space-y-4">
            <p className="text-zinc-500 font-semibold tracking-widest text-xs uppercase">
              DESTEKLENEN PLATFORMLAR
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Monitor, label: "Web Desktop" },
                { icon: Apple, label: "iOS App" },
                { icon: Play, label: "Android App" },
                { icon: Globe, label: "Cloud Sync" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 flex items-center gap-2.5 text-xs text-zinc-700 shadow-2xs hover:border-accent/40 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-accent" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Login Card */}
        <div className="w-full max-w-115">
          <div className="glass-card rounded-4xl p-8 md:p-10 border border-zinc-200 bg-white shadow-xl relative overflow-hidden">
            {/* Top Bar of Card */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="h-9 rounded-full border border-zinc-200 bg-zinc-50 flex items-center gap-2 px-3 text-xs shadow-2xs hover:border-zinc-300 text-zinc-900 transition-colors"
                >
                  <span>{activeLang.flag}</span>
                  <span className="uppercase font-semibold">{activeLang.code}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </button>

                {isLangOpen && (
                  <ul className="absolute top-full left-0 mt-2 w-36 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden py-1 z-50">
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
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
                          {lang.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <HeadphonesIcon className="w-4 h-4 text-accent" />
                <span className="text-zinc-600">7/24 Destek</span>
              </div>
            </div>

            {/* Welcome Heading */}
            <div className="mb-6 space-y-1">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                Giriş Yapın
              </h2>
              <p className="text-xs text-zinc-500">
                Vendora yönetim paneline erişmek için bilgilerinizi girin.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  E-posta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="ornek@restoran.com"
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-accent text-sm transition-all placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Şifre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-accent text-sm transition-all placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-zinc-300 text-accent focus:ring-accent"
                  />
                  <span className="text-xs text-zinc-600 font-medium">Beni Hatırla</span>
                </label>
                <a
                  href="#"
                  className="text-xs text-zinc-500 hover:text-accent transition-colors font-medium"
                >
                  Şifremi unuttum?
                </a>
              </div>

              <Button variant="glow" size="lg" className="w-full gap-2 mt-2 font-semibold">
                Giriş Yap <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-100 text-center text-xs text-zinc-500 font-medium">
              Hesabınız yok mu?{" "}
              <Link
                href="/register"
                className="text-accent font-bold hover:underline ml-1"
              >
                14 Gün Ücretsiz Deneyin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
