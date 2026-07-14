"use client";

import { motion } from "framer-motion";
import { User, ClipboardList, ChefHat, CheckCircle2, Receipt, PackageMinus, CalendarCheck, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Timeline() {
  const { t } = useLanguage();

  const steps = [
    { id: 1, title: t("timeline.t1"), icon: User },
    { id: 2, title: t("timeline.t2"), icon: ClipboardList },
    { id: 3, title: t("timeline.t3"), icon: ChefHat },
    { id: 4, title: t("timeline.t4"), icon: CheckCircle2 },
    { id: 5, title: t("timeline.t5"), icon: Receipt },
    { id: 6, title: t("timeline.t6"), icon: PackageMinus },
    { id: 7, title: t("timeline.t7"), icon: CalendarCheck },
    { id: 8, title: t("timeline.t8"), icon: BarChart3 },
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            {t("timeline.title1")} <span className="text-accent">{t("timeline.title2")}</span> {t("timeline.title3")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("timeline.subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 md:mb-24 ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Center Node */}
                <div className="absolute left-[28px] md:left-1/2 w-14 h-14 bg-background border-4 border-background shadow-[0_0_0_2px_var(--color-border)] rounded-full flex items-center justify-center -translate-x-1/2 z-10 text-foreground transition-colors duration-300 hover:text-accent hover:shadow-[0_0_0_2px_var(--color-accent)]">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 w-full md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}>
                  <div className="bg-zinc-900 text-white border border-zinc-800 p-8 rounded-[3rem] shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4">
                    <h3 className="text-xl font-medium w-full">{step.title}</h3>
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
