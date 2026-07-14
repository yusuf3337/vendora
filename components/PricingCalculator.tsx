"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const integrations = [
  { id: "ys", name: "Yemek Sepeti", code: "YS", price: 100 },
  { id: "gt", name: "Getir", code: "GT", price: 100 },
  { id: "ty", name: "Trendyol", code: "TY", price: 100 },
  { id: "mg", name: "Migros", code: "MG", price: 100 },
  { id: "mk", name: "Mobil Kurye", code: "MK", price: 208 },
  { id: "qr", name: "QR Menü", code: "QR", price: 187 },
  { id: "os", name: "Online Satış + QR", code: "OS", price: 312.5 },
];

export default function PricingCalculator() {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(true);
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>([]);

  const basePrice = 1499; // Standard monthly base price
  
  const toggleIntegration = (id: string) => {
    setActiveIntegrations((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Calculate prices
  const calculateTotal = () => {
    let total = basePrice;
    integrations.forEach((int) => {
      if (activeIntegrations.includes(int.id)) {
        total += int.price;
      }
    });

    // Apply 20% discount if yearly
    if (isYearly) {
      total = total * 0.8;
    }
    return total;
  };

  return (
    <section id="fiyatlandirma" className="py-32 bg-background border-t border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-zinc-900 text-white border border-zinc-800 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {t("pricing.title")}
            </h2>
            <p className="mt-4 text-zinc-300 text-lg">
              {t("pricing.desc")}
            </p>

            {/* Toggle Switch */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={cn("text-sm font-medium", !isYearly ? "text-white" : "text-zinc-500")}>{t("pricing.monthly")}</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-zinc-800 border border-zinc-700 transition-colors"
              >
                <span 
                  className={cn(
                    "inline-block h-6 w-6 transform rounded-full bg-accent transition-transform duration-300 ease-in-out",
                    isYearly ? "translate-x-9" : "translate-x-1"
                  )} 
                />
              </button>
              <span className={cn("text-sm font-medium", isYearly ? "text-white" : "text-zinc-500")}>
                {t("pricing.yearly")} 
                <span className="text-accent text-xs bg-accent/10 px-2 py-0.5 rounded-full ml-1">{t("pricing.discount")}</span>
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Dahili Özellikler */}
            <div className="bg-zinc-800/40 rounded-4xl p-8 border border-zinc-700/50">
              <h3 className="text-2xl font-semibold mb-6">{t("pricing.featuresTitle")}</h3>
              <ul className="space-y-4">
                {[
                  t("pricing.f1"),
                  t("pricing.f2"),
                  t("pricing.f3"),
                  t("pricing.f4"),
                  t("pricing.f5"),
                  t("pricing.f6"),
                  t("pricing.f7")
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-zinc-700/50 flex justify-between items-center">
                <span className="text-zinc-400">{t("pricing.standardPrice")}</span>
                <span className="text-xl font-medium">₺{isYearly ? (basePrice * 0.8).toFixed(2) : basePrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Right Column: Entegrasyonlar */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t("pricing.integrationsTitle")} <span className="text-sm font-normal text-zinc-400 ml-2">{t("pricing.optional")}</span></h3>
              <div className="space-y-3">
                {integrations.map((int) => (
                  <button 
                    key={int.id}
                    onClick={() => toggleIntegration(int.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left",
                      activeIntegrations.includes(int.id) 
                        ? "bg-accent/10 border-accent text-white" 
                        : "bg-zinc-800/30 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs",
                        activeIntegrations.includes(int.id) ? "bg-accent text-white" : "bg-zinc-700 text-zinc-300"
                      )}>
                        {int.code}
                      </div>
                      <span className="font-medium text-lg">{int.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">₺{isYearly ? (int.price * 0.8).toFixed(2) : int.price.toFixed(2)} {t("pricing.perMonth")}</span>
                      <div className={cn(
                        "w-10 h-6 rounded-full flex items-center px-1 transition-colors",
                        activeIntegrations.includes(int.id) ? "bg-accent" : "bg-zinc-700"
                      )}>
                        <div className={cn(
                          "w-4 h-4 rounded-full bg-white transition-transform",
                          activeIntegrations.includes(int.id) ? "translate-x-4" : "translate-x-0"
                        )} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row gap-6 justify-between items-center">
            <div>
              <p className="text-sm text-zinc-400 mb-1">{t("pricing.totalLabel")}</p>
              <div className="text-5xl font-bold tracking-tighter">
                ₺{calculateTotal().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
            <button className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-[3rem] font-medium tracking-wide hover:bg-zinc-200 transition-colors">
              {t("pricing.startNow")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
