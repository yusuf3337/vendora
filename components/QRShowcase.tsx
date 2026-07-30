"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Search, Share2, ChevronDown, QrCode } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

type Venue = {
  id: string;
  name: string;
  logoText: string;
  pageBg: string;
  headerBg: string;
  headerText: string;
  cardBg: string;
  cardBorder: string;
  cardText: string;
  bannerImage: string;
  theme: string;
  badgeBg: string;
  categories: { name: string; count: number }[];
};

const venues: Venue[] = [
  {
    id: "judith",
    name: "Judith Plaj",
    logoText: "JP",
    pageBg: "bg-[#0b1329]",
    headerBg: "bg-[#142347]",
    headerText: "text-white",
    cardBg: "bg-[#182952]",
    cardBorder: "border-blue-500/20",
    cardText: "text-blue-100",
    bannerImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    theme: "Stand Up Comedy",
    badgeBg: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    categories: [{ name: "Aperatifler", count: 4 }, { name: "Burgerler", count: 3 }, { name: "Tostlar", count: 2 }],
  },
  {
    id: "garrison",
    name: "The Garrison Pub",
    logoText: "GP",
    pageBg: "bg-[#032e16]",
    headerBg: "bg-[#084523]",
    headerText: "text-emerald-100",
    cardBg: "bg-[#0c592e]",
    cardBorder: "border-emerald-500/20",
    cardText: "text-emerald-100",
    bannerImage: "/images/barVintage3.png",
    theme: "Happy Hour!",
    badgeBg: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
    categories: [{ name: "Fıçı Biralar", count: 3 }, { name: "Yerli Biralar", count: 2 }, { name: "İthal Biralar", count: 2 }],
  },
  {
    id: "lufi",
    name: "Lufi Cocktails",
    logoText: "LC",
    pageBg: "bg-[#090514]",
    headerBg: "bg-[#1a0b2e]",
    headerText: "text-pink-100",
    cardBg: "bg-[#24123f]",
    cardBorder: "border-pink-900/50",
    cardText: "text-pink-100",
    bannerImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop",
    theme: "Signature Night",
    badgeBg: "bg-pink-600/15 text-pink-400 border border-pink-600/20",
    categories: [{ name: "İmza Kokteyller", count: 5 }, { name: "Klasikler", count: 4 }],
  },
  {
    id: "freedom",
    name: "Freedom Pub",
    logoText: "FP",
    pageBg: "bg-[#0a0f0d]",
    headerBg: "bg-[#132219]",
    headerText: "text-white",
    cardBg: "bg-[#1c3024]",
    cardBorder: "border-emerald-900/40",
    cardText: "text-white",
    bannerImage: "/images/barVintage4.png",
    theme: "Yeni Lezzetler",
    badgeBg: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
    categories: [{ name: "Signature Cocktails", count: 3 }, { name: "Viski & Şarap", count: 4 }],
  },
];

export default function QRShowcase() {
  const [activeVenue, setActiveVenue] = useState<Venue>(venues[0]);
  const [qrUrl, setQrUrl] = useState("");
  const { language, t } = useLanguage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQrUrl(`${window.location.origin}/demo/menu?venue=${activeVenue.id}&lang=${language}`);
    }
  }, [activeVenue.id, language]);

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side: Text and Interactions */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Badge variant="glow" className="mb-4">
            <QrCode className="w-3.5 h-3.5 mr-1" /> İNTERAKTİF DİJİTAL MENÜ
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
            QR Menünüzü <br />
            <span className="text-gradient-orange">Kişiselleştirin.</span>
          </h2>

          <p className="mt-6 text-lg text-zinc-600 leading-relaxed max-w-xl">
            İşletmenizin kurumsal kimliğine özel temalar, duyuru panoları ve anlık fiyat güncellemeleri sunan dinamik QR menü deneyimi. Müşterileriniz garson beklemeden sipariş verebilir.
          </p>

          {/* Venue Switcher Pills */}
          <div className="mt-10 w-full">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
              Örnek Mekan Temaları
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              {venues.map((venue) => (
                <button
                  key={venue.id}
                  onClick={() => setActiveVenue(venue)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer",
                    activeVenue.id === venue.id
                      ? "bg-accent text-white border-accent shadow-md shadow-orange-500/20 scale-105"
                      : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200/60"
                  )}
                >
                  {venue.name}
                </button>
              ))}
            </div>
          </div>

          {/* QR Code Card */}
          <div className="mt-8 w-full max-w-xl glass-card rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-between shadow-md relative overflow-hidden group hover:border-accent/40 transition-colors">
            <div className="flex-1 text-left space-y-2">
              <h4 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                {t("home.qr.scanTitle")}
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {t("home.qr.scanDesc")}
              </p>
              {qrUrl && (
                <Link
                  href={qrUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-accent text-xs font-semibold hover:underline pt-2"
                >
                  {t("home.qr.openLink")} &rarr;
                </Link>
              )}
            </div>

            {/* Dynamic QR Display */}
            <div className="relative w-28 h-28 bg-white p-2 rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-center shrink-0 overflow-hidden">
              {qrUrl ? (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    qrUrl
                  )}`}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-zinc-100 animate-pulse rounded-lg" />
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Phone Mockup */}
        <div className="relative w-full h-145 flex justify-center items-center">
          {/* Phone Frame */}
          <div className="relative w-75 h-145 bg-zinc-950 rounded-[3rem] border-[6px] border-zinc-800 shadow-2xl overflow-hidden z-10 flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-50 pointer-events-none">
              <div className="w-20 h-4 bg-zinc-900 rounded-b-xl"></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={cn("w-full h-full flex flex-col pt-5 select-none", activeVenue.pageBg)}
              >
                {/* Header inside phone */}
                <div
                  className={cn(
                    "px-4 py-3 flex items-center justify-between border-b border-white/10 shadow-sm",
                    activeVenue.headerBg,
                    activeVenue.headerText
                  )}
                >
                  <div className="flex items-center gap-2 max-w-[70%]">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-black text-[10px] shrink-0">
                      {activeVenue.logoText}
                    </div>
                    <span className="font-extrabold text-xs truncate leading-none text-left">
                      {activeVenue.name}
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-70">
                    <Search className="w-3.5 h-3.5 text-white" />
                    <Share2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Banner Area */}
                <div className="px-4 mt-3 shrink-0">
                  <div className="w-full aspect-video relative overflow-hidden rounded-2xl shadow-md bg-zinc-900 border border-white/10">
                    <img
                      src={activeVenue.bannerImage}
                      alt={activeVenue.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 p-3 flex flex-col justify-between text-left">
                      <span className="text-[8px] font-bold uppercase tracking-wider bg-accent px-2 py-0.5 rounded-full text-white self-start">
                        Günün Fırsatı
                      </span>
                      <h4 className="text-white font-extrabold text-xs leading-tight">
                        {activeVenue.theme}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-16">
                  {activeVenue.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "rounded-xl p-3 border shadow-sm flex items-center justify-between text-left",
                        activeVenue.cardBg,
                        activeVenue.cardBorder,
                        activeVenue.cardText
                      )}
                    >
                      <span className="font-bold text-[10px] tracking-wide uppercase">
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] opacity-70">
                        <span>{cat.count} çeşit</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
