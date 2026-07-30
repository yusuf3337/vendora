"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollSequence from "@/components/ScrollSequence";
import Timeline from "@/components/Timeline";
import PricingCalculator from "@/components/PricingCalculator";
import QRShowcase from "@/components/QRShowcase";
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Navigation,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="w-full relative selection:bg-accent selection:text-white bg-slate-50 text-zinc-900 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center pt-32 pb-16 overflow-hidden bg-dot-pattern">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-10 items-center relative z-10">
          <div className="max-w-2xl space-y-6 text-center lg:text-left">
            <Badge variant="glow" className="animate-pulse">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> RESTORAN OTOMASYONUNDA YENİ STANDART
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-zinc-900">
              {t("home.hero.title1")} <br />
              <span className="text-gradient-orange">{t("home.hero.title2")}</span>{" "}
              {t("home.hero.title3") && (
                <>
                  <br />
                  {t("home.hero.title3")}
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-normal">
              {t("home.hero.desc")}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold">
                  {t("home.hero.inspect")} <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/demo/menu">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base">
                  <PlayCircle className="w-5 h-5 text-accent" /> {t("home.hero.demo")}
                </Button>
              </Link>
            </div>

            {/* Quick stats under Hero CTA */}
            <div className="pt-6 border-t border-zinc-200 flex items-center justify-center lg:justify-start gap-8 text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Kredi Kartı Gerekmez</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span>14 Gün Ücretsiz Deneme</span>
              </div>
            </div>
          </div>

          {/* Hero Mockup Frame */}
          <div className="relative w-full aspect-4/3 lg:aspect-square flex flex-col justify-center items-center">
            <div className="relative w-full max-w-180 aspect-video rounded-3xl overflow-hidden shadow-xl border border-zinc-200 bg-white group">
              <Image
                src="/images/dashboard.png"
                alt="Dashboard Mockup"
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/20 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge on Dashboard */}
              <div className="absolute bottom-4 left-4 glass-card px-4 py-2 rounded-2xl border border-zinc-200 flex items-center gap-3 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-zinc-900">Canlı Restoran Paneli</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GÜVEN (TRUST) SECTION */}
      <section className="py-14 relative bg-white border-y border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-4xl py-12 px-8 border border-zinc-200 shadow-xs relative overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
              <div className="text-center px-4 pt-4 md:pt-0">
                <div className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight flex justify-center items-center gap-1">
                  20M+ <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div className="mt-2 text-xs text-zinc-500 font-semibold uppercase tracking-widest">
                  {t("home.trust.revenue")}
                </div>
              </div>
              <div className="text-center px-4 pt-4 md:pt-0">
                <div className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
                  6+
                </div>
                <div className="mt-2 text-xs text-zinc-500 font-semibold uppercase tracking-widest">
                  {t("home.trust.usage")}
                </div>
              </div>
              <div className="text-center px-4 pt-4 md:pt-0">
                <div className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
                  100K+
                </div>
                <div className="mt-2 text-xs text-zinc-500 font-semibold uppercase tracking-widest">
                  {t("home.trust.orders")}
                </div>
              </div>
              <div className="text-center px-4 pt-4 md:pt-0">
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-600">
                  99.9%
                </div>
                <div className="mt-2 text-xs text-zinc-500 font-semibold uppercase tracking-widest">
                  {t("home.trust.uptime")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCROLL ANIMATION SEQUENCE */}
      <ScrollSequence />

      {/* 3.5 QR SHOWCASE */}
      <QRShowcase />

      {/* 4. WORKFLOW TIMELINE */}
      <Timeline />

      {/* 5. CANLI KURYE TAKİBİ */}
      <section className="py-24 bg-slate-50 overflow-hidden relative border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="glass-card rounded-4xl p-10 text-center max-w-3xl border border-zinc-200 relative z-10 w-full shadow-md">
            <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6 shadow-sm">
              <Navigation className="w-7 h-7" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
              {t("home.courier.title")}
            </h2>
            <p className="mt-4 text-zinc-600 text-base md:text-lg leading-relaxed">
              {t("home.courier.desc")}
            </p>
          </div>

          <div className="w-full max-w-5xl mt-12 relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-zinc-200 bg-white">
            <Image
              src="/images/courier.png"
              alt="Courier Tracking Mockup"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. MULTI-DEVICE VIEW */}
      <section className="py-24 bg-white overflow-hidden border-t border-zinc-200/80 relative">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-center">
          <div className="glass-card rounded-4xl p-10 text-center max-w-3xl border border-zinc-200 shadow-sm">
            <Badge variant="glow" className="mb-4">
              ÇOKLU CİHAZ DESTEĞİ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
              {t("home.devices.title")}
            </h2>
            <p className="mt-4 text-zinc-600 text-base md:text-lg">
              {t("home.devices.desc")}
            </p>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto h-105 md:h-140 flex justify-center items-end px-6">
          {/* Laptop */}
          <div className="absolute z-10 w-[82%] md:w-[62%] aspect-video bg-white border border-zinc-300 shadow-2xl rounded-t-3xl overflow-hidden bottom-0">
            <Image
              src="/images/dashboard.png"
              alt="Desktop View"
              fill
              sizes="(max-width: 1200px) 65vw, 800px"
              className="object-cover object-top"
            />
          </div>
          {/* Tablet */}
          <div className="absolute z-20 w-[42%] md:w-[32%] aspect-4/3 bg-white border border-zinc-300 shadow-2xl rounded-2xl overflow-hidden -bottom-8 left-[3%] md:left-[8%]">
            <Image
              src="/images/pos.png"
              alt="Tablet View"
              fill
              sizes="(max-width: 768px) 45vw, 400px"
              className="object-cover object-center"
            />
          </div>
          {/* Mobile */}
          <div className="absolute z-30 w-[22%] md:w-[16%] aspect-9/16 bg-zinc-900 border-4 border-zinc-800 shadow-2xl rounded-3xl overflow-hidden bottom-8 right-[8%] md:right-[12%]">
            <Image
              src="/images/waiter.png"
              alt="Mobile View"
              fill
              sizes="(max-width: 768px) 25vw, 250px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* 7. ŞUBE YÖNETİMİ */}
      <section className="py-24 relative border-t border-zinc-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl border border-zinc-200 bg-white">
            <Image
              src="/images/map.png"
              alt="Branch Map Mockup"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <Badge variant="glow">
              <MapPin className="w-3.5 h-3.5 mr-1" /> ZİNCİR RESTORAN YÖNETİMİ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
              {t("home.branches.title1")} <br />
              <span className="text-gradient-orange">{t("home.branches.title2")}</span>
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              {t("home.branches.desc")}
            </p>
            <ul className="space-y-4 pt-2">
              {[
                t("home.branches.f1"),
                t("home.branches.f2"),
                t("home.branches.f3"),
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-base font-semibold text-zinc-800">
                  <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. DİNAMİK FİYATLANDIRMA (PRICING CALCULATOR) */}
      <PricingCalculator />
    </main>
  );
}
