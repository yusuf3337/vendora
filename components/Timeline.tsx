"use client";

import { motion } from "framer-motion";
import {
  User,
  ClipboardList,
  ChefHat,
  CheckCircle2,
  Receipt,
  PackageMinus,
  CalendarCheck,
  BarChart3,
  GitCommit,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export default function Timeline() {
  const { t } = useLanguage();

  const steps = [
    { id: 1, title: t("timeline.t1"), icon: User, desc: "Müşteri restorana giriş yapar veya masadaki QR kodu okutur." },
    { id: 2, title: t("timeline.t2"), icon: ClipboardList, desc: "Garson veya dijital menü üzerinden sipariş anında sisteme düşer." },
    { id: 3, title: t("timeline.t3"), icon: ChefHat, desc: "Mutfak ekranına (KDS) düşen sipariş istasyonlara göre hazırlanır." },
    { id: 4, title: t("timeline.t4"), icon: CheckCircle2, desc: "Hazırlanan sipariş bildirimle servis personeline iletilir." },
    { id: 5, title: t("timeline.t5"), icon: Receipt, desc: "Adisyon parçalı, nakit veya POS ile hızlıca kapatılır." },
    { id: 6, title: t("timeline.t6"), icon: PackageMinus, desc: "Kullanılan malzemeler reçeteye göre stoktan otomatik düşer." },
    { id: 7, title: t("timeline.t7"), icon: CalendarCheck, desc: "Gün sonu (Z Raporu) ve kasa mutabakatı saniyeler içinde tamamlanır." },
    { id: 8, title: t("timeline.t8"), icon: BarChart3, desc: "Kâr-zarar, garson performansı ve şube analizleri oluşturulur." },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <Badge variant="glow" className="mb-4">
            <GitCommit className="w-3.5 h-3.5 mr-1" /> UÇTAN UCA OTOMASYON AKIŞI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            {t("timeline.title1")}{" "}
            <span className="text-gradient-orange">{t("timeline.title2")}</span>{" "}
            {t("timeline.title3")}
          </h2>
          <p className="mt-4 text-zinc-600 text-base md:text-lg max-w-xl mx-auto">
            {t("timeline.subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-7 md:left-1/2 top-4 bottom-4 w-0.5 bg-linear-to-b from-accent/20 via-accent to-accent/20 -translate-x-1/2" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative flex items-center mb-10 md:mb-16 ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Center Node */}
                <div className="absolute left-7 md:left-1/2 w-12 h-12 bg-white border-2 border-accent/60 shadow-md rounded-full flex items-center justify-center -translate-x-1/2 z-10 text-zinc-900 transition-all duration-200 hover:scale-110">
                  <Icon className="w-5 h-5 text-accent" />
                </div>

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 w-full md:w-1/2 ${
                    isEven ? "md:pl-14" : "md:pr-14 text-left md:text-right"
                  }`}
                >
                  <div className="glass-card glass-card-hover p-6 rounded-3xl border border-zinc-200 shadow-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider justify-start md:justify-end">
                      <span>Adım {step.id}</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
