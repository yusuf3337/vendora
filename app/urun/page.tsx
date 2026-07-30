"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  BarChart3,
  Navigation,
  Store,
  Smartphone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      highlights: ["Hızlı Adisyon Oluşturma", "Parçalı / Çoklu Ödeme", "Masa Düzeni & Taşıma"],
    },
    {
      id: "kds",
      title: t("product.f2.title"),
      desc: t("product.f2.desc"),
      icon: Store,
      img: "/images/kitchen.png",
      reverse: true,
      highlights: ["Anlık Sipariş Ekranı", "Hazırlık Süresi Takibi", "Sesli Sipariş Uyarısı"],
    },
    {
      id: "stok",
      title: t("product.f3.title"),
      desc: t("product.f3.desc"),
      icon: Box,
      img: "/images/dashboard.png",
      reverse: false,
      highlights: ["Detaylı Reçetelendirme", "Otomatik Stok Düşümü", "Kritik Seviye Alarmları"],
    },
    {
      id: "kurye",
      title: t("product.f4.title"),
      desc: t("product.f4.desc"),
      icon: Navigation,
      img: "/images/courier.png",
      reverse: true,
      highlights: ["GPS Canlı Takip", "Kurye Performansı", "Teslimat Süresi Analizi"],
    },
    {
      id: "rapor",
      title: t("product.f5.title"),
      desc: t("product.f5.desc"),
      icon: BarChart3,
      img: "/images/dashboard.png",
      reverse: false,
      highlights: ["Kâr & Zarar Tabloları", "Garson Satış Analizi", "Otomatik Z Raporu"],
    },
  ];

  return (
    <main className="w-full relative selection:bg-accent selection:text-white bg-slate-50 text-zinc-900 pt-36 pb-24 overflow-hidden">
      {/* HEADER HERO */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-24 relative z-10">
        <Badge variant="glow" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" /> MODÜLER RESTORAN YAZILIMI
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-zinc-900">
          {t("product.heroTitle1")} <br />
          <span className="text-gradient-orange">{t("product.heroTitle2")}</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          {t("product.heroDesc")}
        </p>
      </section>

      {/* FEATURES LOOP */}
      <section className="max-w-7xl mx-auto px-6 space-y-24 relative z-10">
        {features.map((feat) => (
          <div
            key={feat.id}
            className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
              feat.reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* TEXT */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center text-accent shadow-xs">
                <feat.icon className="w-7 h-7" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-snug">
                {feat.title}
              </h2>
              <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
                {feat.desc}
              </p>
              <ul className="space-y-2.5 pt-2">
                {feat.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-zinc-800">
                    <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="w-full lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-zinc-200 bg-white group">
              <Image
                src={feat.img}
                alt={feat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>
          </div>
        ))}
      </section>

      {/* CALL TO ACTION */}
      <section className="mt-32 mb-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card border border-zinc-200 rounded-4xl p-12 md:p-16 text-center relative overflow-hidden shadow-lg bg-white">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              {t("product.ctaTitle")}
            </h2>
            <p className="mt-4 text-zinc-600 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              {t("product.ctaDesc")}
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/register">
                <Button variant="glow" size="lg" className="gap-2 text-base font-semibold">
                  {t("product.ctaButton")} <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
