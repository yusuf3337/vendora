"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { Smartphone, Store, Navigation, Box, BarChart3, CheckCircle2 } from "lucide-react";

export default function FeaturesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent selection:text-accent-foreground">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-20 mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 leading-tight"
          >
            {t("featuresPage.heroTitle")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            {t("featuresPage.heroSubtitle")}
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {/* Main POS Card - Spans 2 cols */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 relative bg-zinc-900 border border-zinc-800 rounded-4xl p-8 md:p-12 overflow-hidden shadow-xl hover:border-accent/50 transition-colors group"
          >
            <div className="relative z-10 w-full md:w-[55%]">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-lg border border-zinc-700">
                <Smartphone className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4">{t("featuresPage.posTitle")}</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                {t("featuresPage.posDesc")}
              </p>
              <ul className="space-y-3">
                {["Hızlı Adisyon Yönetimi", "Masa Taşıma ve Birleştirme", "Parçalı ve Çoklu Ödeme", "Çevrimdışı (Offline) Çalışma"].map((item, i) => (
                  <li key={i} className="flex items-center text-zinc-300 gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Image Absolute Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[120%] hidden md:block">
              <div className="relative w-full h-full -right-12">
                <Image src="/images/pos.png" alt="POS" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-left rounded-l-3xl shadow-2xl border-l-8 border-t-8 border-b-8 border-zinc-800 group-hover:-translate-x-4 transition-transform duration-500" />
              </div>
            </div>
          </motion.div>

          {/* Courier Card - Spans 1 col */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative bg-zinc-900 border border-zinc-800 rounded-4xl p-8 overflow-hidden hover:border-accent/50 transition-colors flex flex-col group"
          >
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-sm border border-zinc-700">
              <Navigation className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">{t("featuresPage.courierTitle")}</h2>
            <p className="text-muted-foreground mb-8">
              {t("featuresPage.courierDesc")}
            </p>
            <div className="mt-auto relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg border border-border">
              <Image src="/images/courier.png" alt="Courier Tracking" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>

          {/* Kitchen Display */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-zinc-900 border border-zinc-800 rounded-4xl p-8 overflow-hidden hover:border-accent/50 transition-colors group"
          >
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-sm border border-zinc-700">
              <Store className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">{t("featuresPage.kdsTitle")}</h2>
            <p className="text-zinc-400 mb-8">
              {t("featuresPage.kdsDesc")}
            </p>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border-4 border-zinc-800">
              <Image src="/images/kitchen.png" alt="Kitchen Display" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>

          {/* Stock Management */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative bg-zinc-900 border border-zinc-800 rounded-4xl p-8 overflow-hidden hover:border-accent/50 transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-sm border border-zinc-700">
                <Box className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">{t("featuresPage.stockTitle")}</h2>
              <p className="text-zinc-400 mb-8">
                {t("featuresPage.stockDesc")}
              </p>
            </div>
            <ul className="space-y-3 mt-auto">
              {["Detaylı Reçete Yönetimi", "Gerçek Zamanlı Stok Düşümü", "Kritik Stok Seviyesi Uyarısı"].map((item, i) => (
                <li key={i} className="flex items-center text-zinc-300 gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Reporting */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative bg-zinc-900 border border-zinc-800 rounded-4xl p-8 overflow-hidden hover:border-accent/50 transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-sm border border-zinc-700">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">{t("featuresPage.reportTitle")}</h2>
              <p className="text-muted-foreground mb-8">
                {t("featuresPage.reportDesc")}
              </p>
            </div>
            <div className="mt-auto relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-border bg-white dark:bg-black p-4">
               {/* Decorative Chart Bars */}
               <div className="w-full h-full flex items-end justify-between gap-2">
                 {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                   <div key={i} className="w-full bg-accent rounded-t-sm transition-all duration-1000 group-hover:bg-orange-500" style={{ height: `${h}%`, opacity: 0.5 + (i * 0.05) }} />
                 ))}
               </div>
            </div>
          </motion.div>
        </div>

        {/* DEEP DIVE MATRIX */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t("featuresPage.deepDiveTitle")}
            </h2>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-4xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "POS Özellikleri", items: ["Hızlı Satış Ekranı", "Masa Yönetimi", "Paket Servis Takibi", "Parçalı/Çoklu Ödeme", "İkram & İade Yönetimi", "QR Menü Entegrasyonu"] },
                { title: "Mutfak Yönetimi", items: ["KDS Sipariş Ekranı", "Hazırlık Süresi Takibi", "İstasyon Bazlı Dağıtım", "Geciken Sipariş Uyarısı", "Otomatik Yazıcı Çıktısı", "Garson Çağırma Sistemi"] },
                { title: "Stok & Maliyet", items: ["Detaylı Reçetelendirme", "Gerçek Zamanlı Düşüm", "Çoklu Depo Yönetimi", "Kritik Stok Alarmları", "Sayım & Fire İşlemleri", "Tedarikçi ve Fatura Yönetimi"] },
                { title: "Raporlama & Yönetim", items: ["Anlık Satış Raporları", "Kâr & Zarar Analizi", "Personel Performansı", "Çoklu Şube Yönetimi", "Gelişmiş Yetkilendirme", "Otomatik Bulut Yedekleme"] }
              ].map((column, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    {column.title}
                  </h3>
                  <ul className="space-y-4">
                    {column.items.map((item, i) => (
                      <li key={i} className="flex items-start text-muted-foreground gap-2">
                        <CheckCircle2 className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-32 mb-20 bg-accent text-white rounded-4xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-accent opacity-50 mix-blend-multiply" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">{t("featuresPage.ctaTitle")}</h2>
            <button className="bg-white text-accent px-8 py-4 rounded-[3rem] text-lg font-semibold hover:scale-105 transition-transform shadow-xl">
              {t("featuresPage.ctaButton")}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
