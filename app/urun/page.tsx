"use client";

import Image from "next/image";
import { ArrowRight, Box, BarChart3, Navigation, Store, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductPage() {
  const { t } = useLanguage();

  const features = [
    {
      id: "pos",
      title: t("product.f1.title"),
      desc: t("product.f1.desc"),
      icon: Smartphone,
      img: "/images/pos.png",
      reverse: false,
    },
    {
      id: "kds",
      title: t("product.f2.title"),
      desc: t("product.f2.desc"),
      icon: Store,
      img: "/images/kitchen.png",
      reverse: true,
    },
    {
      id: "stok",
      title: t("product.f3.title"),
      desc: t("product.f3.desc"),
      icon: Box,
      img: "/images/dashboard.png",
      reverse: false,
    },
    {
      id: "kurye",
      title: t("product.f4.title"),
      desc: t("product.f4.desc"),
      icon: Navigation,
      img: "/images/courier.png",
      reverse: true,
    },
    {
      id: "rapor",
      title: t("product.f5.title"),
      desc: t("product.f5.desc"),
      icon: BarChart3,
      img: "/images/dashboard.png",
      reverse: false,
    },
  ];

  return (
    <main className="w-full relative selection:bg-accent selection:text-white pt-32 pb-20">
      
      {/* HEADER HERO */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-32">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] text-foreground">
          {t("product.heroTitle1")} <br />
          <span className="text-accent">{t("product.heroTitle2")}</span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
          {t("product.heroDesc")}
        </p>
      </section>

      {/* FEATURES LOOP */}
      <section className="max-w-7xl mx-auto px-6 space-y-32">
        {features.map((feat) => (
          <div key={feat.id} className={`flex flex-col lg:flex-row gap-16 items-center ${feat.reverse ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* TEXT */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="w-16 h-16 bg-zinc-900 rounded-4xl flex items-center justify-center text-accent shadow-lg border border-zinc-800">
                <feat.icon className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
                {feat.title}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="w-full lg:w-1/2 relative aspect-video md:aspect-4/3 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-800 bg-black">
              <Image 
                src={feat.img} 
                alt={feat.title} 
                fill 
                className="object-cover"
              />
            </div>
            
          </div>
        ))}
      </section>

      {/* CALL TO ACTION */}
      <section className="mt-40 mb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-zinc-900 text-white border border-zinc-800 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/30 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {t("product.ctaTitle")}
            </h2>
            <p className="mt-6 text-zinc-300 text-lg max-w-lg mx-auto">
              {t("product.ctaDesc")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-10 py-4 rounded-[3rem] font-medium tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                {t("product.ctaButton")} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
