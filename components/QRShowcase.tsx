"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Info, Share2, ChevronDown } from "lucide-react";

type Venue = {
  id: string;
  name: string;
  color: string;
  theme: string;
  imageColor: string;
  categories: { name: string; count: number }[];
};

const venues: Venue[] = [
  { 
    id: "garrison", 
    name: "The Garrison Pub", 
    color: "bg-zinc-800", 
    theme: "Dark Theme", 
    imageColor: "bg-zinc-900",
    categories: [{ name: "Fıçı Biralar", count: 12 }, { name: "Şişe Biralar", count: 24 }, { name: "Atıştırmalıklar", count: 8 }]
  },
  { 
    id: "lufi", 
    name: "Lufi Cocktails", 
    color: "bg-pink-600", 
    theme: "Vibrant Theme", 
    imageColor: "bg-pink-100",
    categories: [{ name: "İmza Kokteyller", count: 15 }, { name: "Klasikler", count: 20 }, { name: "Alkolsuz", count: 5 }]
  },
  { 
    id: "kaktus", 
    name: "Kaktus Company", 
    color: "bg-emerald-600", 
    theme: "Nature Theme", 
    imageColor: "bg-emerald-50",
    categories: [{ name: "Kahveler", count: 18 }, { name: "Tatlılar", count: 10 }, { name: "Sandviçler", count: 6 }]
  },
  { 
    id: "judith", 
    name: "Judith Plaj", 
    color: "bg-blue-500", 
    theme: "Beach Theme", 
    imageColor: "bg-cyan-100",
    categories: [{ name: "Yiyecekler", count: 13 }, { name: "Burgerler", count: 4 }, { name: "Tostlar", count: 3 }]
  },
  { 
    id: "hezarfen", 
    name: "Hezarfen Olgunlar", 
    color: "bg-amber-600", 
    theme: "Classic Theme", 
    imageColor: "bg-amber-50",
    categories: [{ name: "Sıcak İçecekler", count: 15 }, { name: "Soğuk İçecekler", count: 12 }, { name: "Nargile", count: 25 }]
  },
  { 
    id: "panini", 
    name: "Panini Gusto", 
    color: "bg-red-600", 
    theme: "Italian Theme", 
    imageColor: "bg-red-50",
    categories: [{ name: "Panini", count: 14 }, { name: "Makarna", count: 8 }, { name: "Salata", count: 6 }]
  },
  { 
    id: "freedom", 
    name: "Freedom Pub", 
    color: "bg-purple-600", 
    theme: "Neon Theme", 
    imageColor: "bg-purple-100",
    categories: [{ name: "Kokteyller", count: 22 }, { name: "Biralar", count: 30 }, { name: "Shotlar", count: 15 }]
  },
];

export default function QRShowcase() {
  const [activeVenue, setActiveVenue] = useState<Venue>(venues[3]); // Default to Judith Plaj

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
        </div>

        {/* Right Side: Phone Mockup */}
        <div className="relative w-full h-[600px] flex justify-center items-center">
          {/* Phone Frame */}
          <div className="relative w-[300px] h-[600px] bg-white dark:bg-zinc-950 rounded-[3rem] border-[8px] border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 flex flex-col">
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
                className={cn("w-full h-full flex flex-col pt-10", activeVenue.imageColor)}
              >
                {/* Header inside phone */}
                <div className="px-5 py-3 bg-white/50 backdrop-blur-md flex items-center justify-between border-b border-black/5">
                  <span className="font-bold text-sm truncate text-black">{activeVenue.name}</span>
                  <div className="flex gap-2 text-black/50">
                    <Search className="w-4 h-4" />
                    <Share2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Banner Area */}
                <div className="w-full aspect-[4/3] bg-black/5 relative overflow-hidden flex items-center justify-center p-4">
                    <div className={cn("w-full h-full rounded-xl shadow-inner flex items-center justify-center border-4 border-white/20", activeVenue.color)}>
                        <span className="text-white font-black text-2xl rotate-[-10deg] opacity-50 tracking-widest uppercase">{activeVenue.theme}</span>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
                  {activeVenue.categories.map((cat, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                      <span className="font-medium text-black">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-black/40">{cat.count} ürün</span>
                        <ChevronDown className="w-4 h-4 text-black/30" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Fake items */}
                  <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between opacity-50">
                     <span className="font-medium text-black">Özel Seçenekler</span>
                     <ChevronDown className="w-4 h-4 text-black/30" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-0"></div>
        </div>
      </div>
    </section>
  );
}
