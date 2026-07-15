"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Vendora Logo" width={200} height={56} className="h-12 w-auto" />
        </div>
        <div className="flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="/urun" className="hover:text-foreground transition-colors">{t("footer.product")}</a>
          <Link href="/ozellikler" className="hover:text-foreground transition-colors">{t("footer.features")}</Link>
          <a href="/#fiyatlandirma" className="hover:text-foreground transition-colors">{t("footer.pricing")}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t("footer.contact")}</a>
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Vendora. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
