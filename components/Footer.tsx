"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Phone, Mail, MapPin, Globe, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800 text-zinc-400 overflow-hidden pt-20 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-125 h-75 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-zinc-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Vendora Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Yeni nesil restoran yönetim platformu. POS, Mutfak Ekranı, Stok Takibi, Kurye Takibi ve QR Menü çözümleriyle işletmenizi dijitalleştirin.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Tüm Sistemler Aktif (99.9%)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              {t("footer.product")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/urun" className="hover:text-accent transition-colors">
                  POS & Adisyon Sistemi
                </Link>
              </li>
              <li>
                <Link href="/ozellikler" className="hover:text-accent transition-colors">
                  Mutfak Ekranı (KDS)
                </Link>
              </li>
              <li>
                <Link href="/ozellikler" className="hover:text-accent transition-colors">
                  Stok & Reçete Yönetimi
                </Link>
              </li>
              <li>
                <Link href="/ozellikler" className="hover:text-accent transition-colors">
                  Canlı Kurye Takibi
                </Link>
              </li>
              <li>
                <Link href="/demo/menu" className="hover:text-accent transition-colors">
                  QR Dijital Menü Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate / Support */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Kurumsal & İletişim
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+905428191504" className="hover:text-white transition-colors">
                  +90 542 819 1504
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@vendora.com.tr" className="hover:text-white transition-colors">
                  info@vendora.com.tr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                <span>İstanbul / Türkiye</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Bültene Katılın
            </h4>
            <p className="text-xs text-zinc-400">
              En son güncellemeler ve restoran teknolojileri hakkındaki bültenimize kaydolun.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent"
                />
                <Button
                  variant="accent"
                  size="sm"
                  className="absolute right-1 top-1 bottom-1 rounded-xl px-3"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Vendora. {t("footer.rights")}
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">KVKK Aydınlatma Metni</a>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <a href="#" className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:text-accent hover:border-accent transition-colors" title="Sosyal Medya">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:text-accent hover:border-accent transition-colors" title="Paylaş">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:text-accent hover:border-accent transition-colors" title="İletişim">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
