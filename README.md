# Vendora - Premium Restoran Yönetim Sistemi

Vendora, modern restoranların (POS, Mutfak Ekranı, Stok Takibi, Kurye Yönetimi, vb.) ihtiyaç duyduğu tüm yazılım çözümlerini tek bir panelde birleştiren yeni nesil bir restoran yönetim sistemidir. 

Bu proje, Vendora'nın potansiyel müşterilerine sunduğu premium hizmeti, aynı premium hissiyatı veren son derece modern, şık ve çok dilli (i18n) bir **Landing Page (Tanıtım Web Sitesi)** arayüzü ile sunmak amacıyla geliştirilmiştir.

## 🚀 Projenin Amacı ve Felsefesi
Bu proje yapılırken sıradan, sıkıcı kurumsal web sitelerinden uzaklaşılarak; **"Minimalizm, Bol Beyaz Alan (Nefes Alan Tasarım), Siyah/Karanlık Tema ve Keskin Kontrast"** prensipleri benimsenmiştir.
- **Neden Yapıldı?** Potansiyel müşterilere (restoran sahiplerine) sadece özellikleri okutmak değil, uygulamanın ne kadar hızlı ve kusursuz çalıştığını "hisssettirmek" için.
- **Nasıl Yapıldı?** Next.js App Router mimarisi üzerinde, Tailwind CSS'in sağladığı esneklik ve Framer Motion'ın sunduğu akıcı mikro-animasyonlar birleştirilerek.

## 💻 Kullanılan Teknolojiler
- **Framework:** Next.js (App Router) & React
- **Stil & Tasarım:** Tailwind CSS
- **Animasyonlar:** Framer Motion (Scroll efektleri, yumuşak geçişler)
- **İkonlar:** Lucide React
- **Çoklu Dil (i18n):** Özel yazılmış `LanguageContext` altyapısı sayesinde sayfa yenilenmeden anlık çalışan dil değiştirme sistemi (Türkçe, İngilizce, Rusça, Almanca, Fransızca).
- **Paket Yöneticisi:** npm

## 📂 Sayfalar ve Görevleri

Proje 3 temel sayfadan ve yardımcı bileşenlerden oluşur:

### 1. Ana Sayfa (`/app/page.tsx`)
Ziyaretçinin siteye girdiği anda etkileneceği ana vitrin.
- **Hero Bölümü:** Gerçek dashboard görseli ve iddialı bir giriş metni.
- **Timeline:** Müşterinin restorana girişinden, raporların oluşmasına kadar geçen sipariş akışının dikey, animasyonlu bir zaman çizelgesi.
- **Pricing Calculator (Fiyatlandırma):** Kullanıcıların ihtiyaç duyduğu entegrasyonları (Yemek Sepeti, Getir, vb.) açıp kapatarak kendi aylık/yıllık fiyatlarını hesaplayabildiği dinamik bileşen.

### 2. Ürün Sayfası (`/app/urun/page.tsx`)
Ürünün modüllerini sade ve geniş bir biçimde anlatan sayfa.
- Klasik ama modern bir "Z-Pattern" (bir sağda resim solda yazı, bir solda resim sağda yazı) yerleşimi kullanır.
- Görseller büyük, metinler oldukça okunabilirdir.

### 3. Özellikler Sayfası (`/app/ozellikler/page.tsx`)
Teknik detaylara inmek isteyen müşteriler için hazırlanan, tasarımsal olarak en zengin sayfalardan biri.
- **Bento Box Grid:** Modern arayüz tasarımının son trendi olan "Bento Box" (farklı boyutlardaki kutucukların asimetrik ızgarası) kullanılmıştır. POS, Mutfak, Kurye ve Stok özellikleri buralarda şık kartlarla anlatılır.
- **Deep Dive (Matris):** Tüm modüllerin içerdiği ufak teknik alt özelliklerin bir checklist (kontrol listesi) halinde sunulduğu veri tablosu.

## 🧩 Önemli Bileşenler (Components)
- `Header.tsx` & `Footer.tsx`: Sitenin navigasyonunu ve global dil seçicisini barındırır.
- `LanguageContext.tsx`: Sitenin beyni konumundaki çoklu dil (i18n) yöneticisi. LocalStorage ile kullanıcının son seçtiği dili hatırlar, varsayılan olarak Türkçe başlatır. SEO uyumluluğunu bozmadan (SSR uyumlu) çalışır.
- `PricingCalculator.tsx`: Ana sayfadaki dinamik fiyat hesaplama motoru.
- `CallbackModal.tsx`: "Sizi Arayalım" butonuna basıldığında açılan şık iletişim penceresi.

## ⚙️ Kurulum ve Geliştirme

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

3. **Görüntüleyin:**
   Tarayıcınızda `http://localhost:3000` adresine gidin.

---
*Not: Bu README.md dosyası, projenin vizyonunu, mimarisini ve kod yapısını hızlıca kavramak için hazırlanmıştır.*
