"use client";

import Image from "next/image";
import ScrollSequence from "@/components/ScrollSequence";
import Timeline from "@/components/Timeline";
import PricingCalculator from "@/components/PricingCalculator";
import { ArrowRight, CheckCircle2, PlayCircle, Navigation } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="w-full relative selection:bg-accent selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] text-foreground">
              {t("home.hero.title1")} <br />
              <span className="text-accent">{t("home.hero.title2")}</span> {t("home.hero.title3") && <><br />{t("home.hero.title3")}</>}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              {t("home.hero.desc")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="bg-foreground text-background px-8 py-4 rounded-[3rem] font-medium tracking-wide hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                {t("home.hero.inspect")} <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-zinc-900 border border-zinc-800 text-white px-8 py-4 rounded-[3rem] font-medium tracking-wide hover:bg-black transition-colors flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5 text-accent" /> {t("home.hero.demo")}
              </button>
            </div>
          </div>
          
          <div className="relative w-full aspect-4/3 lg:aspect-square z-10 flex justify-end items-center flex-col gap-4">
            <div className="bg-zinc-900 text-white px-6 py-2 rounded-[3rem] text-sm font-medium tracking-wide shadow-lg border border-zinc-800">
              {t("home.hero.badge")}
            </div>
            <div className="relative w-full max-w-[800px] aspect-video rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border bg-black">
              <Image 
                src="/images/dashboard.png" 
                alt="Dashboard Mockup" 
                fill 
                className="object-cover object-top-left"
                priority
              />
            </div>
          </div>
        </div>

        {/* Ambient Background Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* 2. GÜVEN (TRUST) SECTION */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-zinc-900 text-white rounded-[3rem] py-16 px-8 shadow-2xl border border-zinc-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-zinc-700">
              <div className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">20M+</div>
                <div className="mt-2 text-sm text-zinc-400 uppercase tracking-widest">{t("home.trust.revenue")}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">6</div>
                <div className="mt-2 text-sm text-zinc-400 uppercase tracking-widest">{t("home.trust.usage")}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">100K+</div>
                <div className="mt-2 text-sm text-zinc-400 uppercase tracking-widest">{t("home.trust.orders")}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">99.9%</div>
                <div className="mt-2 text-sm text-zinc-400 uppercase tracking-widest">{t("home.trust.uptime")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCROLL ANIMATION SEQUENCE */}
      <ScrollSequence />

      {/* 4. WORKFLOW TIMELINE */}
      <Timeline />

      {/* 5. CANLI KURYE TAKİBİ */}
      <section className="py-32 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="bg-zinc-900 text-white rounded-[3rem] p-12 text-center max-w-4xl shadow-2xl border border-zinc-800 relative z-10 w-full">
            <div className="flex items-center justify-center gap-3 mb-4 text-accent">
              <Navigation className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {t("home.courier.title")}
            </h2>
            <p className="mt-6 text-zinc-300 text-lg">
              {t("home.courier.desc")}
            </p>
          </div>
          
          <div className="w-full max-w-6xl mt-12 relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-black z-0">
            <Image 
              src="/images/courier.png" 
              alt="Courier Tracking Mockup" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. MULTI-DEVICE VIEW */}
      <section className="py-32 bg-background overflow-hidden border-y border-border">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-center">
          <div className="bg-zinc-900 text-white rounded-[3rem] p-12 text-center max-w-4xl shadow-2xl border border-zinc-800">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {t("home.devices.title")}
            </h2>
            <p className="mt-4 text-zinc-300 text-lg">
              {t("home.devices.desc")}
            </p>
          </div>
        </div>
        
        <div className="relative max-w-6xl mx-auto h-[400px] md:h-[600px] flex justify-center items-end px-6">
          {/* Laptop */}
          <div className="absolute z-10 w-[80%] md:w-[60%] aspect-video bg-white border border-border shadow-2xl rounded-t-2xl overflow-hidden bottom-0">
             <Image src="/images/dashboard.png" alt="Desktop View" fill className="object-cover object-top" />
          </div>
          {/* Tablet */}
          <div className="absolute z-20 w-[40%] md:w-[30%] aspect-3/4 bg-white border border-border shadow-2xl rounded-2xl overflow-hidden -bottom-10 left-[5%] md:left-[10%]">
             <Image src="/images/pos.png" alt="Tablet View" fill className="object-cover object-center" />
          </div>
          {/* Mobile */}
          <div className="absolute z-30 w-[20%] md:w-[15%] aspect-9/16 bg-white border-4 border-zinc-800 shadow-2xl rounded-4xl overflow-hidden bottom-10 right-[10%] md:right-[15%]">
             <Image src="/images/waiter.png" alt="Mobile View" fill className="object-cover object-top" />
          </div>
        </div>
      </section>

      {/* 7. ŞUBE YÖNETİMİ */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border border-border">
            <Image src="/images/map.png" alt="Branch Map Mockup" fill className="object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              {t("home.branches.title1")} <br/><span className="text-accent">{t("home.branches.title2")}</span>
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              {t("home.branches.desc")}
            </p>
            <ul className="mt-8 space-y-4">
              {[t("home.branches.f1"), t("home.branches.f2"), t("home.branches.f3")].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-medium text-foreground">
                  <CheckCircle2 className="w-6 h-6 text-accent" /> {item}
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
