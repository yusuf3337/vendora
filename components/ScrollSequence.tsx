"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Utensils, Box, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const screens = [
  {
    id: "pos",
    src: "/images/pos.png",
    title: "POS & Hızlı Adisyon",
    icon: Smartphone,
    desc: "Saniyeler içinde masa adisyonu açın, parçalı ödemeleri tek tıkla tamamlayın.",
  },
  {
    id: "waiter",
    src: "/images/waiter.png",
    title: "Mobil Garson Terminali",
    icon: Utensils,
    desc: "Garsonlar masadan ayrılmadan siparişi direkt mutfak ekranlarına iletsin.",
  },
  {
    id: "kitchen",
    src: "/images/kitchen.png",
    title: "Mutfak Ekranı (KDS)",
    icon: Monitor,
    desc: "İstasyon bazlı sipariş takibi, hazırlık süreleri ve sesli sipariş uyarısı.",
  },
  {
    id: "dashboard",
    src: "/images/dashboard.png",
    title: "Stok & Raporlama",
    icon: Box,
    desc: "Anlık stok düşümü, reçete yönetimi ve detaylı kâr-zarar tabloları.",
  },
  {
    id: "map",
    src: "/images/map.png",
    title: "Çoklu Şube Haritası",
    icon: Map,
    desc: "Tüm şubelerinizin ciro ve operasyon verilerini tek haritada canlı izleyin.",
  },
];

export default function ScrollSequence() {
  const [activeTab, setActiveTab] = useState(0);

  // Auto switch preview tabs every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % screens.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeScreen = screens[activeTab];

  return (
    <section className="py-20 bg-slate-50 border-y border-zinc-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="glow" className="mb-3">
            <Monitor className="w-3.5 h-3.5 mr-1" /> CANLI MODÜL EKOSİSTEMİ
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
            Tüm Operasyon Tek Ekranda
          </h2>
          <p className="mt-3 text-zinc-600 text-sm md:text-base">
            Modüller arasında geçiş yaparak Vendora'nın restoran yönetimine getirdiği hızı görün.
          </p>
        </div>

        {/* Interactive Tab Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {screens.map((screen, idx) => {
            const Icon = screen.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs",
                  isActive
                    ? "bg-accent text-white shadow-md shadow-orange-500/20 scale-105"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{screen.title}</span>
              </button>
            );
          })}
        </div>

        {/* Screen Showcase Frame */}
        <div className="relative w-full max-w-5xl aspect-video mx-auto rounded-3xl overflow-hidden shadow-xl border border-zinc-200 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={activeScreen.src}
                alt={activeScreen.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
                quality={95}
                priority
              />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 glass-card px-6 py-3.5 rounded-2xl border border-zinc-200 shadow-lg flex items-center justify-between gap-4 max-w-md">
                <div className="text-left space-y-0.5">
                  <h4 className="text-sm font-bold text-zinc-900">
                    {activeScreen.title}
                  </h4>
                  <p className="text-xs text-zinc-600 line-clamp-1">
                    {activeScreen.desc}
                  </p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}