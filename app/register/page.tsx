"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Mail,
  HeadphonesIcon,
  Globe,
  Monitor,
  Apple,
  Play,
  ChevronDown,
  User,
  Phone,
  Building2,
  MapPin,
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

const countryData = {
  Türkiye: [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bursa",
    "Çanakkale",
    "Denizli",
    "Diyarbakır",
    "Eskişehir",
    "Gaziantep",
    "Hatay",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kayseri",
    "Kocaeli",
    "Konya",
    "Malatya",
    "Manisa",
    "Muğla",
    "Samsun",
    "Tekirdağ",
    "Trabzon",
    "Şanlıurfa",
  ],
  KKTC: ["Lefkoşa", "Gazimağusa", "Girne", "Güzelyurt", "İskele"],
  Azerbaycan: ["Bakü", "Gence", "Sumgayıt", "Mingeçevir", "Nahçıvan"],
};

export default function RegisterPage() {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const [promoIndex, setPromoIndex] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState<keyof typeof countryData | "">("");
  const [selectedCity, setSelectedCity] = useState("");

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

  const cities = selectedCountry
    ? [...countryData[selectedCountry]].sort((a, b) => a.localeCompare(b, "tr-TR"))
    : [];

  return (
    <div className="min-h-screen flex items-center relative overflow-hidden bg-slate-50 text-zinc-900 selection:bg-accent selection:text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-dot-pattern opacity-60" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-12">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-zinc-900 space-y-6 hidden lg:block">
          <Link href="/" className="inline-block mb-2">
            <img
              src="/images/logo.png"
              alt="Vendora Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <p className="text-accent font-bold tracking-wider text-xs md:text-sm uppercase">
            14 GÜN ÜCRETSİZ DENEME HAKKI
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

        {/* Right Content - Register Card */}
        <div className="w-full max-w-125">
          <div className="glass-card rounded-4xl p-8 md:p-10 border border-zinc-200 bg-white shadow-xl relative overflow-hidden">
            {/* Top Bar of Card */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
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
                <span className="text-zinc-600">Canlı Destek</span>
              </div>
            </div>

            {/* Welcome Heading */}
            <div className="mb-6 space-y-1">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                Aramıza Katılın!
              </h2>
              <p className="text-xs text-zinc-500">
                Restoranınızı dijitalleştirmek için hemen kaydolun.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Adınız"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-10 pr-3 text-xs focus:outline-none focus:border-accent transition-all placeholder:text-zinc-400"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Soyadınız"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-10 pr-3 text-xs focus:outline-none focus:border-accent transition-all placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-accent transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-accent transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Building2 className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="İşletme Adınız"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-accent transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Globe className="h-4 w-4" />
                  </div>
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value as any);
                      setSelectedCity("");
                    }}
                    required
                    className={cn(
                      "w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-10 pr-8 text-xs focus:outline-none focus:border-accent transition-all appearance-none",
                      !selectedCountry && "text-zinc-400"
                    )}
                  >
                    <option value="" disabled className="text-zinc-400">Ülke</option>
                    {Object.keys(countryData).map((country) => (
                      <option key={country} value={country} className="text-zinc-900">
                        {country}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedCountry}
                    required
                    className={cn(
                      "w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-3 pl-10 pr-8 text-xs focus:outline-none focus:border-accent transition-all appearance-none",
                      !selectedCity && "text-zinc-400",
                      !selectedCountry && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    <option value="" disabled className="text-zinc-400">Şehir</option>
                    {cities.map((city) => (
                      <option key={city} value={city} className="text-zinc-900">
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              <Button variant="glow" size="lg" className="w-full gap-2 mt-3 font-semibold">
                14 Gün Ücretsiz Başla <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500 font-medium">
              Zaten hesabınız var mı?{" "}
              <Link href="/login" className="text-accent font-bold hover:underline ml-1">
                Giriş yapın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
