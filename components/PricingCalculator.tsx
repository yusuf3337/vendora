"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>(["ys", "gt", "qr"]);

  const basePrice = 1499;

  const toggleIntegration = (id: string) => {
    setActiveIntegrations((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = basePrice;
    integrations.forEach((int) => {
      if (activeIntegrations.includes(int.id)) {
        total += int.price;
      }
    });

    if (isYearly) {
      total = total * 0.8;
    }
    return total;
  };

  const formattedTotal = calculateTotal()
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <section
      id="fiyatlandirma"
      className="py-24 relative bg-white border-t border-zinc-200/80 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="glow" className="mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> ESNEK & AÇIK FİYATLANDIRMA
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
            {t("pricing.title")}
          </h2>
          <p className="mt-4 text-zinc-600 text-lg">
            {t("pricing.desc")}
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center gap-2 bg-zinc-100 p-1.5 rounded-full border border-zinc-200">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                !isYearly
                  ? "bg-white text-zinc-900 shadow-xs font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              {t("pricing.monthly")}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer",
                isYearly
                  ? "bg-accent text-white shadow-md shadow-orange-500/20 font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              <span>{t("pricing.yearly")}</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                {t("pricing.discount")}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Glass Card */}
        <div className="glass-card rounded-4xl p-8 md:p-12 border border-zinc-200 shadow-lg relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left Column: Standard Included Features */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    {t("pricing.featuresTitle")}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Tüm paketlerde sınırsız kullanım ve bulut yedekleme dahildir.
                  </p>
                </div>
                <Badge variant="accent">Temel Paket</Badge>
              </div>

              <ul className="space-y-3.5">
                {[
                  t("pricing.f1"),
                  t("pricing.f2"),
                  t("pricing.f3"),
                  t("pricing.f4"),
                  t("pricing.f5"),
                  t("pricing.f6"),
                  t("pricing.f7"),
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-700 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex justify-between items-center bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                <span className="text-sm text-zinc-600">{t("pricing.standardPrice")}</span>
                <span className="text-lg font-bold text-zinc-900">
                  ₺{isYearly ? (basePrice * 0.8).toFixed(0) : basePrice} <span className="text-xs text-zinc-500 font-normal">/ ay</span>
                </span>
              </div>
            </div>

            {/* Right Column: Optional Integrations */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <h3 className="text-xl font-bold text-zinc-900">
                  {t("pricing.integrationsTitle")}
                </h3>
                <span className="text-xs text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                  {t("pricing.optional")}
                </span>
              </div>

              <div className="space-y-2.5 max-h-85 overflow-y-auto pr-1">
                {integrations.map((int) => {
                  const isSelected = activeIntegrations.includes(int.id);
                  const priceFormatted = (
                    isYearly ? int.price * 0.8 : int.price
                  ).toFixed(0);

                  return (
                    <button
                      key={int.id}
                      onClick={() => toggleIntegration(int.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 text-left group cursor-pointer",
                        isSelected
                          ? "bg-accent/10 border-accent/50 text-zinc-900 shadow-xs"
                          : "bg-zinc-50/80 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                      )}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all",
                            isSelected
                              ? "bg-accent text-white shadow-xs"
                              : "bg-zinc-200 text-zinc-700 group-hover:bg-zinc-300"
                          )}
                        >
                          {int.code}
                        </div>
                        <span className="font-semibold text-sm">{int.name}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-zinc-700">
                          +₺{priceFormatted} <span className="text-zinc-500 font-normal">/{t("pricing.perMonth")}</span>
                        </span>
                        <div
                          className={cn(
                            "w-9 h-5 rounded-full flex items-center p-0.5 transition-colors",
                            isSelected ? "bg-accent" : "bg-zinc-200"
                          )}
                        >
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-xs",
                              isSelected ? "translate-x-4" : "translate-x-0"
                            )}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Total Summary Bar */}
          <div className="mt-10 pt-8 border-t border-zinc-200 flex flex-col md:flex-row gap-6 justify-between items-center bg-zinc-50 p-6 md:p-8 rounded-3xl">
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                {t("pricing.totalLabel")}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
                  ₺{formattedTotal}
                </span>
                <span className="text-zinc-500 text-sm font-medium">
                  / ay {isYearly ? "(yıllık ödeme)" : ""}
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2 font-semibold">
                <Zap className="w-5 h-5 fill-white/20" />
                {t("pricing.startNow")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
