"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Store,
  Navigation,
  Box,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FeaturesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 pt-36 pb-24 selection:bg-accent selection:text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="glow" className="mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> GELİŞMİŞ ÖZELLİK MİMARİSİ
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight"
          >
            {t("featuresPage.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-600 leading-relaxed"
          >
            {t("featuresPage.heroSubtitle")}
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {/* Main POS Card - Spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 relative glass-card border border-zinc-200 bg-white rounded-4xl p-8 md:p-12 overflow-hidden shadow-md hover:border-accent/40 transition-all duration-300 group"
          >
            <div className="relative z-10 w-full md:w-[55%] space-y-4">
              <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center text-accent shadow-xs">
                <Smartphone className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 leading-tight">
                {t("featuresPage.posTitle")}
              </h2>
              <p className="text-zinc-600 text-base leading-relaxed">
                {t("featuresPage.posDesc")}
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Hızlı Adisyon Yönetimi",
                  "Masa Taşıma ve Birleştirme",
                  "Parçalı ve Çoklu Ödeme",
                  "Çevrimdışı (Offline) Çalışma",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-zinc-700 gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Image Absolute Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[120%] hidden md:block">
              <div className="relative w-full h-full -right-6">
                <Image
                  src="/images/pos.png"
                  alt="POS"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-left rounded-l-3xl shadow-xl border-l-4 border-t-4 border-b-4 border-zinc-200 group-hover:-translate-x-3 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Courier Card - Spans 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative glass-card border border-zinc-200 bg-white rounded-4xl p-8 overflow-hidden hover:border-accent/40 transition-all duration-300 flex flex-col group shadow-md"
          >
            <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center text-accent mb-4 shadow-xs">
              <Navigation className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">
              {t("featuresPage.courierTitle")}
            </h2>
            <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
              {t("featuresPage.courierDesc")}
            </p>
            <div className="mt-auto relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xs border border-zinc-200">
              <Image
                src="/images/courier.png"
                alt="Courier Tracking"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Kitchen Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-card border border-zinc-200 bg-white rounded-4xl p-8 overflow-hidden hover:border-accent/40 transition-all duration-300 group shadow-md"
          >
            <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center text-accent mb-4 shadow-xs">
              <Store className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">
              {t("featuresPage.kdsTitle")}
            </h2>
            <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
              {t("featuresPage.kdsDesc")}
            </p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xs border border-zinc-200">
              <Image
                src="/images/kitchen.png"
                alt="Kitchen Display"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Stock Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative glass-card border border-zinc-200 bg-white rounded-4xl p-8 overflow-hidden hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center text-accent mb-4 shadow-xs">
                <Box className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                {t("featuresPage.stockTitle")}
              </h2>
              <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                {t("featuresPage.stockDesc")}
              </p>
            </div>
            <ul className="space-y-3 mt-auto">
              {[
                "Detaylı Reçete Yönetimi",
                "Gerçek Zamanlı Stok Düşümü",
                "Kritik Stok Seviyesi Uyarısı",
              ].map((item, i) => (
                <li key={i} className="flex items-center text-zinc-700 gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
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
            className="relative glass-card border border-zinc-200 bg-white rounded-4xl p-8 overflow-hidden hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center text-accent mb-4 shadow-xs">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                {t("featuresPage.reportTitle")}
              </h2>
              <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                {t("featuresPage.reportDesc")}
              </p>
            </div>
            <div className="mt-auto relative w-full aspect-video rounded-2xl overflow-hidden shadow-xs border border-zinc-200 bg-slate-50 p-4">
              {/* Decorative Chart Bars */}
              <div className="w-full h-full flex items-end justify-between gap-2">
                {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-accent rounded-t-sm transition-all duration-500 group-hover:bg-orange-500"
                    style={{ height: `${h}%`, opacity: 0.7 + i * 0.04 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* DEEP DIVE MATRIX */}
        <div className="mt-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              {t("featuresPage.deepDiveTitle")}
            </h2>
          </div>

          <div className="glass-card border border-zinc-200 bg-white rounded-4xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "POS Özellikleri",
                  items: [
                    "Hızlı Satış Ekranı",
                    "Masa Yönetimi",
                    "Paket Servis Takibi",
                    "Parçalı/Çoklu Ödeme",
                    "İkram & İade Yönetimi",
                    "QR Menü Entegrasyonu",
                  ],
                },
                {
                  title: "Mutfak Yönetimi",
                  items: [
                    "KDS Sipariş Ekranı",
                    "Hazırlık Süresi Takibi",
                    "İstasyon Bazlı Dağıtım",
                    "Geciken Sipariş Uyarısı",
                    "Otomatik Yazıcı Çıktısı",
                    "Garson Çağırma Sistemi",
                  ],
                },
                {
                  title: "Stok & Maliyet",
                  items: [
                    "Detaylı Reçetelendirme",
                    "Gerçek Zamanlı Düşüm",
                    "Çoklu Depo Yönetimi",
                    "Kritik Stok Alarmları",
                    "Sayım & Fire İşlemleri",
                    "Tedarikçi ve Fatura Yönetimi",
                  ],
                },
                {
                  title: "Raporlama & Yönetim",
                  items: [
                    "Anlık Satış Raporları",
                    "Kâr & Zarar Analizi",
                    "Personel Performansı",
                    "Çoklu Şube Yönetimi",
                    "Gelişmiş Yetkilendirme",
                    "Otomatik Bulut Yedekleme",
                  ],
                },
              ].map((column, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.items.map((item, i) => (
                      <li key={i} className="flex items-start text-zinc-600 gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span className="text-xs font-semibold text-zinc-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-28 mb-12 glass-card border border-zinc-200 bg-white rounded-4xl p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              {t("featuresPage.ctaTitle")}
            </h2>
            <Link href="/register">
              <Button variant="glow" size="lg" className="gap-2 text-base font-semibold">
                <Zap className="w-5 h-5" />
                {t("featuresPage.ctaButton")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
