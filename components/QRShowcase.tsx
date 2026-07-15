"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Search, Info, Share2, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    id: "garrison", 
    name: "The Garrison Pub", 
    logoText: "GP",
    pageBg: "bg-[#032e16]",
    headerBg: "bg-[#fefce8]",
    headerText: "text-[#032e16]",
    cardBg: "bg-[#fefce8]",
    cardBorder: "border-[#fefce8]/10",
    cardText: "text-[#032e16]",
    bannerImage: "/images/barVintage3.png",
    theme: "Happy Hour!",
    badgeBg: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
    categories: [{ name: "Fıçı Biralar", count: 3 }, { name: "Yerli Biralar", count: 2 }, { name: "İthal Biralar", count: 2 }]
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
    categories: [{ name: "İmza Kokteyller", count: 2 }, { name: "Klasikler", count: 2 }]
  },
  { 
    id: "kaktus", 
    name: "Kaktus Company", 
    logoText: "KC",
    pageBg: "bg-[#f7f4eb]",
    headerBg: "bg-[#fdfbf7]",
    headerText: "text-emerald-950",
    cardBg: "bg-white",
    cardBorder: "border-zinc-200",
    cardText: "text-emerald-950",
    bannerImage: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop",
    theme: "Kahve & Ekmek",
    badgeBg: "bg-emerald-600/15 text-emerald-600 border border-emerald-600/20",
    categories: [{ name: "Nitelikli Kahveler", count: 3 }, { name: "Ekşi Mayalı & Tatlı", count: 2 }]
  },
  { 
    id: "judith", 
    name: "Judith Plaj", 
    logoText: "JP",
    pageBg: "bg-[#e0f7fa]",
    headerBg: "bg-white",
    headerText: "text-zinc-800",
    cardBg: "bg-white",
    cardBorder: "border-zinc-200",
    cardText: "text-zinc-800",
    bannerImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    theme: "Stand Up Comedy",
    badgeBg: "bg-blue-500/15 text-blue-500 border border-blue-500/20",
    categories: [{ name: "Aperatifler", count: 2 }, { name: "Burgerler", count: 2 }, { name: "Tostlar", count: 2 }]
  },
  { 
    id: "hezarfen", 
    name: "Hezarfen Olgunlar", 
    logoText: "HO",
    pageBg: "bg-[#110e08]",
    headerBg: "bg-[#fdf6e2]",
    headerText: "text-amber-950",
    cardBg: "bg-[#221c10]",
    cardBorder: "border-amber-900/40",
    cardText: "text-amber-100",
    bannerImage: "https://images.unsplash.com/photo-1542157585-ef2081f79836?q=80&w=600&auto=format&fit=crop",
    theme: "Nargile & Kahve",
    badgeBg: "bg-amber-600/15 text-amber-500 border border-amber-650/20",
    categories: [{ name: "Çay & Geleneksel Kahveler", count: 2 }, { name: "Premium Nargileler", count: 2 }]
  },
  { 
    id: "panini", 
    name: "Panini Gusto", 
    logoText: "PG",
    pageBg: "bg-[#fdfaf6]",
    headerBg: "bg-white",
    headerText: "text-red-950",
    cardBg: "bg-white",
    cardBorder: "border-zinc-200",
    cardText: "text-red-950",
    bannerImage: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=600&auto=format&fit=crop",
    theme: "Gurme Panini",
    badgeBg: "bg-red-650/15 text-red-650 border border-red-650/20",
    categories: [{ name: "Gurme Paniniler", count: 2 }, { name: "Ev Yapımı Makarnalar", count: 2 }]
  },
  { 
    id: "freedom", 
    name: "Freedom Pub", 
    logoText: "FP",
    pageBg: "bg-[#0a0f0d]",
    headerBg: "bg-[#132219]",
    headerText: "text-white",
    cardBg: "bg-[#1c3024]",
    cardBorder: "border-[#1c3024]/40",
    cardText: "text-white",
    bannerImage: "/images/barVintage4.png",
    theme: "Yeni Lezzetler",
    badgeBg: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
    categories: [{ name: "Signature Cocktails", count: 2 }, { name: "Global Kokteyller", count: 2 }, { name: "Viski", count: 2 }, { name: "Şaraplar", count: 2 }]
  },
];

export default function QRShowcase() {
  const [activeVenue, setActiveVenue] = useState<Venue>(venues[3]); // Default to Judith Plaj
  const [qrUrl, setQrUrl] = useState("");
  const { language, t } = useLanguage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQrUrl(`${window.location.origin}/demo/menu?venue=${activeVenue.id}&lang=${language}`);
    }
  }, [activeVenue.id, language]);

  return (
    <section className="py-24 bg-background overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Text and Interactions */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            QR Menünüzü <br className="hidden md:block lg:hidden" />
            <span className="bg-linear-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
              Renklendirin.
            </span>
          </h2>
          
          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            QR menünüzü dilediğiniz gibi şekillendirin, temalar oluşturun ve kendi
            markanızı yansıtın.
            <br className="hidden md:block" />
            <br className="hidden md:block" />
            Panonuza ekleyeceğiniz duyurularla müşterilerinizi bilgilendirin, harici
            bağlantılar ekleyerek müşterilerinizi yönlendirin.
          </p>

          <div className="mt-12 w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-6">Keşfedin</h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {venues.map((venue) => (
                <button
                  key={venue.id}
                  onMouseEnter={() => setActiveVenue(venue)}
                  onClick={() => setActiveVenue(venue)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105",
                    activeVenue.id === venue.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  )}
                >
                  {venue.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* QR Code Scan Section */}
          <div className="mt-10 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-between shadow-lg relative overflow-hidden group/qr hover:border-zinc-700 transition-colors">
            <div className="flex-1 text-left">
              <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                {t("home.qr.scanTitle")}
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {t("home.qr.scanDesc")}
              </p>
              {qrUrl && (
                <Link
                  href={qrUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold hover:underline"
                >
                  {t("home.qr.openLink")}
                </Link>
              )}
            </div>
            
            {/* Dynamic QR Display */}
            <div className="relative w-32 h-32 bg-white p-2 rounded-2xl border border-zinc-800 shadow-inner flex items-center justify-center shrink-0 overflow-hidden">
              {qrUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}`}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-zinc-100 animate-pulse rounded-lg" />
              )}
              {/* Pulse Scanner Line Animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-accent/80 opacity-60 shadow-[0_0_10px_#FF4500] animate-bounce pointer-events-none" style={{ animationDuration: '3s', top: '10%' }} />
            </div>
          </div>
        </div>

        {/* Right Side: Phone Mockup */}
        <div className="relative w-full h-[600px] flex justify-center items-center">
          {/* Phone Frame */}
          <div className="relative w-[300px] h-[600px] bg-white dark:bg-zinc-950 rounded-[3rem] border-8 border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 flex flex-col">
            {/* Notch / Dynamic Island placeholder */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none">
              <div className="w-24 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-b-xl"></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={cn("w-full h-full flex flex-col pt-6 select-none", activeVenue.pageBg)}
              >
                {/* Header inside phone */}
                <div className={cn("px-4 py-3 flex items-center justify-between border-b border-zinc-950/5 dark:border-white/5 shadow-sm", activeVenue.headerBg, activeVenue.headerText)}>
                  <div className="flex items-center gap-2 max-w-[70%]">
                    <div className="w-7 h-7 rounded-full bg-zinc-900/5 dark:bg-white/10 flex items-center justify-center font-black text-[10px] shrink-0">
                      {activeVenue.logoText}
                    </div>
                    <span className="font-extrabold text-xs truncate leading-none text-left">{activeVenue.name}</span>
                  </div>
                  <div className="flex gap-2 opacity-70 scale-90">
                    <div className="w-6 h-6 rounded-full bg-zinc-950/5 dark:bg-white/10 flex items-center justify-center">
                      <Search className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-zinc-950/5 dark:bg-white/10 flex items-center justify-center">
                      <Share2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Banner Area */}
                <div className="px-4 mt-4 shrink-0">
                  <div className="w-full aspect-4/3 relative overflow-hidden rounded-2xl shadow-md bg-zinc-900 border border-zinc-800/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={activeVenue.bannerImage} 
                      alt={activeVenue.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    
                    <div className="absolute inset-0 p-4 flex flex-col justify-between text-left">
                      <span className="text-[7px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full text-white self-start">
                        Kampanya
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-white font-black text-sm uppercase leading-tight">{activeVenue.theme}</h4>
                        <p className="text-[9px] text-white/80 leading-relaxed truncate">Özel fırsatları ve indirimleri menüde keşfedin.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-20 no-scrollbar">
                  {activeVenue.categories.map((cat, idx) => (
                    <div 
                      key={idx} 
                      className={cn("rounded-xl p-3 border shadow-sm flex items-center justify-between text-left", activeVenue.cardBg, activeVenue.cardBorder, activeVenue.cardText)}
                    >
                      <span className="font-extrabold text-[10px] tracking-wide uppercase">{cat.name}</span>
                      <div className="flex items-center gap-1.5 text-[9px] opacity-60">
                        <span>{cat.count} ürün</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Fake items */}
                  <div className={cn("rounded-xl p-3 border shadow-sm flex items-center justify-between text-left opacity-40", activeVenue.cardBg, activeVenue.cardBorder, activeVenue.cardText)}>
                    <span className="font-extrabold text-[10px] tracking-wide uppercase">Özel Menü</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Fake bottom navigation bar */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-black/5 flex items-center justify-around px-6 z-20">
                <div className="w-6 h-6 rounded-full bg-black/10"></div>
                <div className="w-12 h-1 bg-black/20 rounded-full mb-2 absolute bottom-2"></div>
                <div className="w-6 h-6 rounded-full bg-black/10"></div>
            </div>

          </div>
          
          {/* Decorative blur blob behind the phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[80px] z-0"></div>
        </div>
      </div>
    </section>
  );
}
