"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Utensils, 
  Bell, 
  CreditCard, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  X, 
  CheckCircle,
  HelpCircle,
  Hash,
  ChevronDown,
  Share2
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  badge?: string;
};

type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

type BannerData = {
  badge: string;
  title: string;
  desc: string;
  bgClass: string;
  textClass?: string;
  buttonText?: string;
  illustration?: string;
  imageUrl?: string;
};

type VenueData = {
  name: string;
  desc: string;
  logoText: string;
  mainCategoryHeader: string;
  theme: {
    accent: string;      // Tailwind bg class, e.g., 'bg-amber-500'
    accentText: string;  // Tailwind text class, e.g., 'text-amber-500'
    accentBorder: string;// Tailwind border class, e.g., 'border-amber-500'
    accentHover: string; // Tailwind hover class
    accentGlow: string;  // CSS drop shadow or color glow
    gradient: string;    // Header banner gradient
    pageBg: string;      // Body page background color (e.g. bg-[#032e16] or bg-[#e0f7fa])
    headerBg: string;    // Header background (e.g. bg-[#fefce8])
    headerText: string;  // Header text color (e.g. text-[#032e16])
    cardBg: string;      // Accordion drawer background
    cardBorder: string;  // Accordion drawer border
    cardText: string;    // Accordion drawer text color
    badgeBg: string;     // Product badge style
  };
  banners: BannerData[];
  categories: MenuCategory[];
};

const venueMenus: Record<string, VenueData> = {
  garrison: {
    name: "The Garrison Pub",
    desc: "By order of the Peaky Blinders. Premium stouts, whiskey and pub bites.",
    logoText: "GP",
    mainCategoryHeader: "Biralar",
    theme: {
      accent: "bg-[#f97316]",
      accentText: "text-[#eab308]",
      accentBorder: "border-[#eab308]",
      accentHover: "hover:bg-amber-600",
      accentGlow: "shadow-amber-500/25",
      gradient: "from-emerald-950/80 to-zinc-950",
      pageBg: "bg-[#032e16]",
      headerBg: "bg-[#fefce8]",
      headerText: "text-[#032e16]",
      cardBg: "bg-[#fefce8]",
      cardBorder: "border-[#fefce8]/10",
      cardText: "text-[#032e16]",
      badgeBg: "bg-orange-500/15 text-orange-400 border border-orange-500/20"
    },
    banners: [
      { badge: "HAPPY HOUR!", title: "Tüm Signature Kokteyller'de Her Gün Her Saat", desc: "1 Alana 2.'si %50 İndirimli", bgClass: "bg-[#047857]", textClass: "text-[#fefce8]", illustration: "🍹", imageUrl: "/images/barVintage3.png" },
      { badge: "MAÇ GÜNÜ", title: "Dev Ekranda Canlı Maç Keyfi", desc: "Maç saatinde duble fıçı bira alımına özel atıştırmalık sepeti hediye!", bgClass: "bg-amber-900/60 border border-amber-800/30", textClass: "text-amber-100", illustration: "⚽" },
      { badge: "BİNGÖL BALI", title: "Özel Kahvaltılık Süzme Bal", desc: "Kahvaltı tabağı alan herkese ikramımızdır.", bgClass: "bg-amber-950 text-amber-100 border border-amber-800/20", illustration: "🍯" }
    ],
    categories: [
      {
        id: "drafts",
        name: "Fıçı Biralar",
        items: [
          { id: "g1", name: "Shelby Irish Stout", desc: "Dark, creamy stout with chocolate and roasted coffee notes.", price: 210, badge: "İmza" },
          { id: "g2", name: "Garrison IPA", desc: "Bold, hoppy IPA with refreshing pine and citrus aroma.", price: 195, badge: "Popüler" },
          { id: "g3", name: "Birmingham Lager", desc: "Crisp, cold, and refreshing light lager.", price: 160 }
        ]
      },
      {
        id: "local",
        name: "Yerli Biralar",
        items: [
          { id: "g4", name: "Efes Pilsen Özel Seri", desc: "Taze ve ferah içimli yerli lager.", price: 140 },
          { id: "g5", name: "Bomonti Filtresiz", desc: "%100 malt, filtresiz yumuşak içim.", price: 155, badge: "Favori" }
        ]
      },
      {
        id: "import",
        name: "İthal Biralar",
        items: [
          { id: "g6", name: "Guinness Draft", desc: "Meşhur İrlanda siyah birası, kremamsı köpük.", price: 230 },
          { id: "g7", name: "Corona Extra", desc: "Limon dilimiyle sunulan serinletici Meksika birası.", price: 210 }
        ]
      },
      {
        id: "bucket",
        name: "Kova Biralar",
        items: [
          { id: "g8", name: "Yerli Bira Kovası (4 Adet)", desc: "Buz dolu kova içerisinde 4 adet yerli bira.", price: 520, badge: "Kampanya" },
          { id: "g9", name: "İthal Bira Kovası (4 Adet)", desc: "Buz dolu kova içerisinde 4 adet ithal bira.", price: 780 }
        ]
      }
    ]
  },
  lufi: {
    name: "Lufi Cocktails",
    desc: "Vibrant craft cocktails, ambient house beats, and a neon paradise.",
    logoText: "LC",
    mainCategoryHeader: "Kokteyller",
    theme: {
      accent: "bg-pink-600",
      accentText: "text-pink-500",
      accentBorder: "border-pink-600",
      accentHover: "hover:bg-pink-700",
      accentGlow: "shadow-pink-500/25",
      gradient: "from-pink-900/60 to-zinc-950",
      pageBg: "bg-[#090514]",
      headerBg: "bg-[#1a0b2e]",
      headerText: "text-pink-100",
      cardBg: "bg-[#24123f]",
      cardBorder: "border-pink-900/50",
      cardText: "text-pink-100",
      badgeBg: "bg-pink-600/15 text-pink-400 border border-pink-600/20"
    },
    banners: [
      { badge: "SIGNATURE NIGHT", title: "Lufi Signature Experience", desc: "Cuma geceleri DJ performansı eşliğinde özel imza kokteyllerimiz.", bgClass: "bg-pink-950/70 border border-pink-500/25", textClass: "text-pink-100", illustration: "🍸", imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop" }
    ],
    categories: [
      {
        id: "signature",
        name: "İmza Kokteyller",
        items: [
          { id: "l1", name: "Sweet Lufi Rose", desc: "Premium gin, fresh wild raspberries, lime, cardamon syrup, rose water mist.", price: 260, badge: "En Sevilen" },
          { id: "l2", name: "Tropical Neon Glow", desc: "White rum, fresh mango purée, coconut milk, lime, fresh mint spray.", price: 280, badge: "Yeni" }
        ]
      },
      {
        id: "classics",
        name: "Klasikler",
        items: [
          { id: "l3", name: "Spicy Hibiscus Margarita", desc: "Tequila Blanco, hibiscus infusion, fresh lime juice, orange liqueur, jalapeño.", price: 240 },
          { id: "l4", name: "Old Fashioned Barrel", desc: "Angostura bitters, orange peel, bourbon, slow-stirred over a clear ice block.", price: 250 }
        ]
      }
    ]
  },
  kaktus: {
    name: "Kaktus Company",
    desc: "Nature-inspired specialty coffee shop with organic roasts and fresh sourdough bakery.",
    logoText: "KC",
    mainCategoryHeader: "Menü",
    theme: {
      accent: "bg-emerald-600",
      accentText: "text-emerald-500",
      accentBorder: "border-emerald-600",
      accentHover: "hover:bg-emerald-700",
      accentGlow: "shadow-emerald-500/25",
      gradient: "from-emerald-950/60 to-zinc-950",
      pageBg: "bg-[#f7f4eb]",
      headerBg: "bg-[#fdfbf7]",
      headerText: "text-emerald-950",
      cardBg: "bg-white",
      cardBorder: "border-zinc-200",
      cardText: "text-emerald-950",
      badgeBg: "bg-emerald-600/15 text-emerald-600 border border-emerald-600/20"
    },
    banners: [
      { badge: "KAHVE & EKMEK", title: "Ekşi Mayalı Avokado Toast", desc: "Taze ezilmiş avokado ve organik ekşi mayalı ekmekle güne harika başlayın.", bgClass: "bg-emerald-900 border border-emerald-800/20", textClass: "text-emerald-50", illustration: "🥑", imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop" }
    ],
    categories: [
      {
        id: "coffee",
        name: "Nitelikli Kahveler",
        items: [
          { id: "k1", name: "Flat White", desc: "Double shot of single-origin espresso with velvety milk micro-foam.", price: 85 },
          { id: "k2", name: "Ceremonial Matcha Latte", desc: "Uji ceremonial grade green tea matcha whisked with oat milk.", price: 110, badge: "Sağlıklı" },
          { id: "k3", name: "Iced V60 Ethiopia", desc: "Lightly roasted Ethiopian beans cold-dripped with fruity profile.", price: 95 }
        ]
      },
      {
        id: "bakery",
        name: "Ekşi Mayalı & Tatlı",
        items: [
          { id: "k4", name: "Avokado Sourdough", desc: "Poached free-range egg, smashed avocado, feta crumbles, microgreens on sourdough toast.", price: 190, badge: "Favori" },
          { id: "k5", name: "San Sebastian Cheesecake", desc: "Creamy baked basque cheesecake with warm pouring Belgian dark chocolate.", price: 140 }
        ]
      }
    ]
  },
  judith: {
    name: "Judith Plaj & Grill",
    desc: "Premium Seaside Beach Club & Bar. Feel the breeze, enjoy the taste.",
    logoText: "JP",
    mainCategoryHeader: "Yiyecekler",
    theme: {
      accent: "bg-[#2563eb]",
      accentText: "text-[#2563eb]",
      accentBorder: "border-[#2563eb]",
      accentHover: "hover:bg-blue-700",
      accentGlow: "shadow-blue-500/25",
      gradient: "from-cyan-900/60 to-zinc-950",
      pageBg: "bg-[#e0f7fa]",
      headerBg: "bg-white",
      headerText: "text-zinc-800",
      cardBg: "bg-white",
      cardBorder: "border-zinc-200",
      cardText: "text-zinc-800",
      badgeBg: "bg-blue-500/15 text-blue-500 border border-blue-500/20"
    },
    banners: [
      { badge: "STANDUP COMEDY", title: "TERASTA NELER OLUYOR", desc: "Alpay Erdem 'Kolsuz Tişört' Stand-Up Gösterisi. 12.06.2024 Çarşamba 21:00.", bgClass: "bg-linear-to-r from-orange-500 to-amber-500 text-white", buttonText: "ALPAY ERDEM", illustration: "🎤", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop" },
      { badge: "BEACH DINING", title: "Gün Batımında Canlı Müzik", desc: "Her Cumartesi 19:30'da akustik caz eşliğinde akşam yemeği.", bgClass: "bg-linear-to-r from-cyan-600 to-blue-600 text-white", illustration: "🎷" }
    ],
    categories: [
      {
        id: "aperitifs",
        name: "Aperatifler",
        items: [
          { id: "ju1", name: "Çıtır Kalamar Tava", desc: "Tava kalamar, tarator sos ile.", price: 290, badge: "Taze" },
          { id: "ju2", name: "Patates Kızartması", desc: "Baharatlı elma dilim patates.", price: 130 }
        ]
      },
      {
        id: "burgers",
        name: "Burgerler",
        items: [
          { id: "ju3", name: "Beach Club Baconburger", desc: "Premium dry-aged beef patty, double cheddar, crispy bacon, house burger sauce.", price: 340, badge: "Efsane" },
          { id: "ju4", name: "Klasik Cheeseburger", desc: "Dana köfte, cheddar peyniri, turşu, karamelize soğan.", price: 280 }
        ]
      },
      {
        id: "toasts",
        name: "Tostlar",
        items: [
          { id: "ju5", name: "Ayvalık Tostu", desc: "Bol malzemeli karışık Ayvalık tostu.", price: 160 },
          { id: "ju6", name: "Kaşarlı Tost", desc: "Ekşi mayalı ekmeğe çift kaşarlı tost.", price: 110 }
        ]
      }
    ]
  },
  hezarfen: {
    name: "Hezarfen Olgunlar",
    desc: "Geleneksel lezzetler, nargile keyfi ve sıcak ortam.",
    logoText: "HO",
    mainCategoryHeader: "Menü",
    theme: {
      accent: "bg-amber-600",
      accentText: "text-amber-600",
      accentBorder: "border-amber-600",
      accentHover: "hover:bg-amber-700",
      accentGlow: "shadow-amber-600/25",
      gradient: "from-amber-900/50 to-zinc-950",
      pageBg: "bg-[#110e08]",
      headerBg: "bg-[#fdf6e2]",
      headerText: "text-amber-950",
      cardBg: "bg-[#221c10]",
      cardBorder: "border-amber-900/40",
      cardText: "text-amber-100",
      badgeBg: "bg-amber-600/15 text-amber-500 border border-amber-650/20"
    },
    banners: [
      { badge: "GELENEKSEL", title: "Nargile ve Kumda Kahve", desc: "Geleneksel yöntemlerle hazırlanan közde kahvemiz ve özel aromalarımız.", bgClass: "bg-amber-900/60 border border-amber-800/20", textClass: "text-amber-100", illustration: "☕", imageUrl: "https://images.unsplash.com/photo-1542157585-ef2081f79836?q=80&w=600&auto=format&fit=crop" }
    ],
    categories: [
      {
        id: "hot_drinks",
        name: "Çay & Geleneksel Kahveler",
        items: [
          { id: "hz1", name: "Damla Sakızlı Türk Kahvesi", desc: "Bakır cezvede yavaş yavaş pişirilen geleneksel Ege aromalı kahve.", price: 75 },
          { id: "hz2", name: "Taze Demleme Çay", desc: "Rize çay yapraklarından demlenmiş, ince belli bardakta.", price: 30, badge: "Taze" }
        ]
      },
      {
        id: "shishas",
        name: "Premium Nargileler",
        items: [
          { id: "hz3", name: "Love 66 Special", desc: "Eşsiz kavun, tatlı karpuz ve ferahlatıcı buzlu nane aroması.", price: 350 },
          { id: "hz4", name: "Hezarfen Gold Shisha", desc: "Özel ananas gövdesi üzerinde egzotik tropikal meyve aromaları.", price: 480, badge: "İmza" }
        ]
      }
    ]
  },
  panini: {
    name: "Panini Gusto",
    desc: "Gourmet Italian street food, house pesto, and fresh handmade daily pasta.",
    logoText: "PG",
    mainCategoryHeader: "Yiyecekler",
    theme: {
      accent: "bg-red-600",
      accentText: "text-red-500",
      accentBorder: "border-red-600",
      accentHover: "hover:bg-red-700",
      accentGlow: "shadow-red-500/25",
      gradient: "from-red-950/50 to-zinc-950",
      pageBg: "bg-[#fdfaf6]",
      headerBg: "bg-white",
      headerText: "text-red-950",
      cardBg: "bg-white",
      cardBorder: "border-zinc-200",
      cardText: "text-red-950",
      badgeBg: "bg-red-650/15 text-red-650 border border-red-650/20"
    },
    banners: [
      { badge: "ITALIANO", title: "Gurme Panini Deneyimi", desc: "Prosciutto ve taze mozzarella ile hazırlanan Napoli usulü paninilerimizi deneyin.", bgClass: "bg-red-900 border border-red-800/25", textClass: "text-white", illustration: "🥪", imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=600&auto=format&fit=crop" }
    ],
    categories: [
      {
        id: "panini",
        name: "Gurme Paniniler",
        items: [
          { id: "p1", name: "Prosciutto Mozzarella Panini", desc: "Prosciutto crudo, fresh buffalo mozzarella, rocket, sun-dried tomato pesto.", price: 210, badge: "İtalyan" },
          { id: "p2", name: "Pollo Pesto Panini", desc: "Grilled chicken breast, creamy pesto sauce, melted provolone cheese.", price: 185 }
        ]
      },
      {
        id: "pasta",
        name: "Ev Yapımı Makarnalar",
        items: [
          { id: "p3", name: "Truffle Tagliatelle", desc: "Handmade egg pasta with forest wild mushrooms and truffle cream sauce.", price: 280, badge: "Favori" },
          { id: "p4", name: "Penne all'Arrabbiata", desc: "Spicy tomato sauce, cherry tomatoes, fresh garlic, extra virgin olive oil.", price: 170 }
        ]
      }
    ]
  },
  freedom: {
    name: "Freedom Pub",
    desc: "Neon lights, rock music, loaded food, and strong custom shots.",
    logoText: "FP",
    mainCategoryHeader: "İçecek",
    theme: {
      accent: "bg-purple-600",
      accentText: "text-purple-500",
      accentBorder: "border-purple-600",
      accentHover: "hover:bg-purple-700",
      accentGlow: "shadow-purple-500/25",
      gradient: "from-purple-950/50 to-zinc-950",
      pageBg: "bg-[#0a0f0d]",
      headerBg: "bg-[#132219]",
      headerText: "text-white",
      cardBg: "bg-[#1c3024]",
      cardBorder: "border-[#1c3024]/40",
      cardText: "text-white",
      badgeBg: "bg-purple-500/15 text-purple-400 border border-purple-500/20"
    },
    banners: [
      { badge: "YENİ LEZZETLER", title: "Yes Freedom! Yeni Lezzetlerimizle Tanışın. 😎", desc: "Trüf mantarlı patates tabağı, BBQ Hot Wings, Taco tabağı ve daha fazlası Olgunlar şubemizde.", bgClass: "bg-[#1c3024]", textClass: "text-[#f4edd2] border border-[#f4edd2]/25", buttonText: "KEŞFET", illustration: "🍟", imageUrl: "/images/barVintage4.png" }
    ],
    categories: [
      {
        id: "signatures",
        name: "Signature Cocktails",
        items: [
          { id: "f1", name: "Electric Neon Lemonade", desc: "Vodka, blue curaçao, sour mix, splash of lemon-lime soda.", price: 230, badge: "Popüler" },
          { id: "f2", name: "Freedom Kamikaze (4 Shots)", desc: "Shaken vodka, triple sec, and fresh lime juice served icy cold.", price: 240 }
        ]
      },
      {
        id: "globals",
        name: "Global Kokteyller",
        items: [
          { id: "f3", name: "Whiskey Sour", desc: "Bourbon, lemon juice, simple syrup, egg white froth.", price: 240 },
          { id: "f4", name: "Classic Gin Tonic", desc: "Gin, premium tonic, lime wedge garnish.", price: 210 }
        ]
      },
      {
        id: "whiskies",
        name: "Viski",
        items: [
          { id: "f5", name: "Jack Daniels", desc: "Classic Tennessee honey or old no. 7 whiskey.", price: 190 },
          { id: "f6", name: "Chivas Regal 12Y", desc: "Premium blended Scotch whiskey.", price: 240 }
        ]
      },
      {
        id: "wines",
        name: "Şaraplar",
        items: [
          { id: "f7", name: "Kırmızı Şarap (Kadeh)", desc: "Öküzgözü kırmızı sek şarap.", price: 160 },
          { id: "f8", name: "Beyaz Şarap (Kadeh)", desc: "Sauvignon Blanc beyaz sek şarap.", price: 160 }
        ]
      }
    ]
  }
};

function InnerDemoMenu() {
  const searchParams = useSearchParams();
  const venueId = searchParams.get("venue") || "judith";
  const venue = useMemo(() => venueMenus[venueId] || venueMenus.judith, [venueId]);

  const { language, setLanguage, t } = useLanguage();

  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'options' | 'cardForm' | 'processing' | 'success'>('options');
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processingStatus, setProcessingStatus] = useState("");

  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Notifications helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const addToCart = (id: string, name: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    triggerToast(`"${name}" ${t("demoMenu.added")}`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const copy = { ...prev };
      if (copy[id] <= 1) {
        delete copy[id];
      } else {
        copy[id]--;
      }
      return copy;
    });
  };

  // Compute products list with filtering
  const allProducts = useMemo(() => {
    const products: MenuItem[] = [];
    venue.categories.forEach(cat => {
      cat.items.forEach(item => {
        products.push(item);
      });
    });
    return products;
  }, [venue]);

  const filteredCategories = useMemo(() => {
    return venue.categories.map(cat => {
      const filteredItems = cat.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
      return {
        ...cat,
        items: filteredItems
      };
    }).filter(cat => cat.items.length > 0 && (activeCategory === "all" || cat.id === activeCategory));
  }, [venue, searchQuery, activeCategory]);

  // Calculations
  const cartItemCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    let total = 0;
    allProducts.forEach(item => {
      if (cart[item.id]) {
        total += item.price * cart[item.id];
      }
    });
    return total;
  }, [cart, allProducts]);

  // Cart items helper
  const cartItemsList = useMemo(() => {
    return allProducts
      .filter(item => cart[item.id] > 0)
      .map(item => ({
        ...item,
        qty: cart[item.id]
      }));
  }, [cart, allProducts]);

  // Actions
  const handleCallWaiter = () => {
    triggerToast(t("demoMenu.waiterCalled"));
  };

  const handlePayTable = (method: "cash" | "card") => {
    setIsPaymentModalOpen(false);
    triggerToast(t("demoMenu.paymentSuccess"));
  };

  const billAmount = useMemo(() => {
    return cartTotal > 0 ? cartTotal : 280;
  }, [cartTotal]);

  const startPaymentProcess = () => {
    setPaymentStep('processing');
    setProcessingStatus("3D Secure doğrulaması başlatılıyor...");
    
    setTimeout(() => {
      setProcessingStatus(t("demoMenu.securingConnection"));
    }, 1200);

    setTimeout(() => {
      setPaymentStep('success');
      setCart({}); // Empty the cart on successful payment
    }, 2800);
  };

  const handlePlaceOrder = () => {
    setCart({});
    setIsCartOpen(false);
    triggerToast("Siparişiniz mutfağa iletildi! Masa 4.");
  };

  return (
    <div className={`min-h-screen ${venue.theme.pageBg} text-zinc-100 flex flex-col justify-start relative select-none transition-colors duration-500`}>
      
      {/* Container simulating mobile viewport */}
      <div className={`max-w-md mx-auto w-full min-h-screen ${venue.theme.pageBg} border-x border-zinc-900 shadow-2xl relative flex flex-col pb-28 transition-colors duration-500`}>
        
        {/* BRANDED STICKY HEADER */}
        <div className={`sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-zinc-950/10 dark:border-white/5 backdrop-blur-md ${venue.theme.headerBg} ${venue.theme.headerText} shadow-md transition-all`}>
          <div className="flex items-center gap-3">
            {/* Branded Circle Logo */}
            <div className="w-10 h-10 rounded-full bg-zinc-900/5 dark:bg-white/10 flex items-center justify-center font-black border border-zinc-950/10 dark:border-white/10 text-sm tracking-wider shadow-inner shrink-0">
              {venue.logoText}
            </div>
            <div className="text-left">
              <h1 className="text-base font-black tracking-tight leading-tight">{venue.name}</h1>
              <p className="text-[10px] opacity-65 leading-none mt-0.5">Masa 4</p>
            </div>
          </div>
          
          {/* Header Action Icons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCallWaiter}
              title={t("demoMenu.callWaiter")}
              className="w-8 h-8 rounded-full bg-zinc-950/5 dark:bg-white/10 flex items-center justify-center hover:bg-zinc-950/10 dark:hover:bg-white/20 active:scale-90 transition-transform"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPaymentModalOpen(true)}
              title={t("demoMenu.payTable")}
              className="w-8 h-8 rounded-full bg-zinc-950/5 dark:bg-white/10 flex items-center justify-center hover:bg-zinc-950/10 dark:hover:bg-white/20 active:scale-90 transition-transform"
            >
              <CreditCard className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PROMOTIONAL BANNER CAROUSEL */}
        {venue.banners && venue.banners.length > 0 && (
          <div className="mt-5 px-4 space-y-3 shrink-0">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-zinc-900 border border-zinc-800/10">
              <AnimatePresence mode="wait">
                {venue.banners.map((banner, index) => {
                  if (index !== activeSlide) return null;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 flex flex-col justify-between overflow-hidden ${banner.bgClass} ${banner.textClass || "text-white"}`}
                    >
                      {/* Image background if present */}
                      {banner.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={banner.imageUrl} 
                          alt={banner.title} 
                          className="absolute inset-0 w-full h-full object-cover z-0"
                        />
                      )}
                      {/* Dark overlay for readability */}
                      {banner.imageUrl && (
                        <div className="absolute inset-0 bg-black/60 z-0" />
                      )}

                      {/* Content Wrapper */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                        {/* Top Row: Badge & Illustration/Icon */}
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-black uppercase tracking-widest bg-white/25 dark:bg-black/35 px-2.5 py-1 rounded-full">
                            {banner.badge}
                          </span>
                          {banner.illustration && (
                            <span className="text-3xl filter drop-shadow-md animate-bounce">{banner.illustration}</span>
                          )}
                        </div>

                        {/* Middle: Content */}
                        <div className="my-auto space-y-2 text-left">
                          <h2 className="text-xl font-black tracking-tight leading-tight uppercase font-sans">
                            {banner.title}
                          </h2>
                          <p className="text-xs font-medium opacity-85 leading-relaxed">
                            {banner.desc}
                          </p>
                        </div>

                        {/* Bottom Button if applicable */}
                        {banner.buttonText && (
                          <div className="text-left mt-2">
                            <button className="px-5 py-2 bg-white/95 text-zinc-900 hover:bg-white text-xs font-black rounded-xl uppercase tracking-wider active:scale-95 transition-all shadow-md">
                              {banner.buttonText}
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination Circles */}
            {venue.banners.length > 1 && (
              <div className="flex justify-center gap-1.5 py-1">
                {venue.banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all flex items-center justify-center shadow-sm ${
                      activeSlide === index
                        ? `${venue.theme.accent} text-white`
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SEARCH INPUT */}
        <div className="px-4 mt-5">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={t("demoMenu.searchPlaceholder")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Accordion Main Header */}
        <div className="px-4 mt-6">
          <h2 className={`text-sm font-black tracking-widest text-left uppercase ${venue.theme.headerText} opacity-80`}>
            {venue.mainCategoryHeader}
          </h2>
        </div>

        {/* Accordion Collapsible Drawers */}
        <div className="px-4 pb-12 mt-3 space-y-3 flex-1">
          {filteredCategories.map(cat => {
            const isExpanded = searchQuery.trim() !== "" || expandedCategory === cat.id;
            return (
              <div 
                key={cat.id} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${venue.theme.cardBg} ${venue.theme.cardBorder} ${venue.theme.cardText}`}
              >
                {/* Accordion Button */}
                <button
                  onClick={() => {
                    if (searchQuery.trim() === "") {
                      setExpandedCategory(expandedCategory === cat.id ? null : cat.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-4 font-bold text-left transition-colors`}
                >
                  <span className="text-xs font-black tracking-wide uppercase">{cat.name}</span>
                  <div className="flex items-center gap-2 text-[10px] opacity-60">
                    <span>{t("demoMenu.itemCount", { count: cat.items.length })}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="border-t border-zinc-900/10 dark:border-white/10"
                    >
                      <div className="p-4 space-y-3 bg-black/5 dark:bg-black/25">
                        {cat.items.map(item => {
                          const qty = cart[item.id] || 0;
                          return (
                            <div 
                              key={item.id}
                              className="flex gap-4 items-center justify-between py-3 border-b border-zinc-900/5 dark:border-white/5 last:border-0"
                            >
                              <div className="flex-1 pr-2 text-left">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm leading-snug">{item.name}</h4>
                                  {item.badge && (
                                    <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ${venue.theme.badgeBg}`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-zinc-500 text-[11px] mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
                                <div className="font-black mt-2 text-xs">
                                  ₺{item.price}
                                </div>
                              </div>

                              {/* Plus/Minus Controls */}
                              <div className="shrink-0 flex items-center bg-black/10 dark:bg-white/5 rounded-full p-0.5 border border-zinc-950/15 dark:border-white/10">
                                {qty > 0 ? (
                                  <>
                                    <button 
                                      onClick={() => removeFromCart(item.id)}
                                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 text-zinc-400 active:scale-90 transition-transform"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-5 text-center text-xs font-bold">{qty}</span>
                                    <button 
                                      onClick={() => addToCart(item.id, item.name)}
                                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 text-zinc-300 active:scale-90 transition-transform"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </>
                                ) : (
                                  <button 
                                    onClick={() => addToCart(item.id, item.name)}
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white active:scale-90 transition-transform"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredCategories.length === 0 && (
            <div className="py-16 text-center text-zinc-500 flex flex-col items-center justify-center gap-3">
              <Utensils className="w-8 h-8 text-zinc-700" />
              <p className="text-xs">Aradığınız kriterlere uygun ürün bulunamadı.</p>
            </div>
          )}
        </div>

        {/* PERSISTENT FLOATING BOTTOM CART BAR */}
        <AnimatePresence>
          {cartItemCount > 0 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-16 inset-x-4 max-w-xs mx-auto z-45"
            >
              <button
                onClick={() => setIsCartOpen(true)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-white shadow-xl ${venue.theme.accent} ${venue.theme.accentHover} hover:scale-[1.02] active:scale-98 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">
                    {cartItemCount}
                  </div>
                  <span className="font-bold text-xs tracking-wide">Siparişi Gör</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base">₺{cartTotal}</span>
                  <ShoppingBag className="w-4 h-4 opacity-80" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CART DRAWER MODAL */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/80 z-50 flex justify-center items-end"
              />
              
              {/* Drawer content */}
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-zinc-950 border-t border-zinc-800 rounded-t-[2.5rem] z-50 max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-zinc-900 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className={`w-5 h-5 ${venue.theme.accentText}`} />
                    <h2 className="text-xl font-bold text-white">{t("demoMenu.cartTitle")}</h2>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItemsList.map(item => (
                    <div key={item.id} className="flex justify-between items-center gap-4 py-1">
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                        <span className="text-zinc-500 text-xs">₺{item.price} x {item.qty}</span>
                      </div>
                      <div className="flex items-center bg-zinc-900 rounded-full border border-zinc-800 p-1 shrink-0">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">{item.qty}</span>
                        <button 
                          onClick={() => addToCart(item.id, item.name)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {cartItemsList.length === 0 && (
                    <div className="py-12 text-center text-zinc-500">
                      {t("demoMenu.emptyCart")}
                    </div>
                  )}
                </div>

                {/* Bottom Order Button Area */}
                <div className="p-6 border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-md space-y-4 shrink-0">
                  <div className="flex justify-between items-center font-bold text-white">
                    <span>{t("demoMenu.total")}</span>
                    <span className="text-2xl">₺{cartTotal}</span>
                  </div>
                  
                  <button
                    onClick={handlePlaceOrder}
                    disabled={cartItemsList.length === 0}
                    className={`w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg transition-transform active:scale-95 ${
                      cartItemsList.length > 0
                        ? `${venue.theme.accent} ${venue.theme.accentHover}`
                        : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    }`}
                  >
                    Mutfak Siparişini Gönder
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Bottom Control Pill */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 rounded-full px-4 py-2 flex items-center gap-3.5 shadow-xl z-40 transition-all">
          {/* Language Flag Toggle */}
          <button 
            onClick={() => {
              const targetLang = language === "tr" ? "en" : "tr";
              setLanguage(targetLang);
              triggerToast(targetLang === "tr" ? "Dil: Türkçe" : "Language: English");
            }}
            className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-sm shadow-sm border border-zinc-700 active:scale-90 transition-transform"
          >
            {language === "tr" ? "🇹🇷" : "🇬🇧"}
          </button>
          
          {/* Divider */}
          <div className="w-px h-3.5 bg-zinc-850" />
          
          {/* Scroll To Top */}
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white active:scale-90 transition-transform"
          >
            <ChevronDown className="w-3.5 h-3.5 rotate-180" />
          </button>

          {/* Divider */}
          <div className="w-px h-3.5 bg-zinc-850" />

          {/* Share Button */}
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin + "/demo/menu?venue=" + venueId);
              triggerToast(t("demoMenu.copied"));
            }}
            className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white active:scale-90 transition-transform"
          >
            <Share2 className="w-3 h-3" />
          </button>
        </div>

               {/* PAYMENT MODAL */}
        <AnimatePresence>
          {isPaymentModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  if (paymentStep !== 'processing') {
                    setIsPaymentModalOpen(false);
                    setPaymentStep('options');
                  }
                }}
                className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4"
              />
              
              {/* Modal Container */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                layout
                className="fixed bg-zinc-900 border border-zinc-800 rounded-3xl p-6 z-50 max-w-sm w-full shadow-2xl flex flex-col text-center"
              >
                {/* 1. OPTIONS STEP */}
                {paymentStep === 'options' && (
                  <>
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                      <CreditCard className={`w-6 h-6 ${venue.theme.accentText}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{t("demoMenu.choosePayment")}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                      Masa 4 için hesap ödeme yöntemi seçin.
                      {cartTotal === 0 && <span className="block text-accent font-semibold mt-1">Örnek tutar: ₺{billAmount}</span>}
                    </p>

                    <div className="flex flex-col gap-3">
                      {/* Online Credit Card (Recommended) */}
                      <button 
                        onClick={() => setPaymentStep('cardForm')}
                        className={`w-full py-4 px-5 ${venue.theme.accent} ${venue.theme.accentHover} text-white font-bold text-sm rounded-2xl active:scale-95 transition-all flex items-center justify-between shadow-lg`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-white" />
                          <span className="text-left font-bold">{t("demoMenu.onlineCard")}</span>
                        </div>
                        <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">Hızlı</span>
                      </button>

                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => handlePayTable("card")}
                          className="py-3.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-2xl border border-zinc-700 active:scale-95 transition-all flex flex-col items-center gap-1.5"
                        >
                          <Utensils className="w-4 h-4 opacity-70" />
                          <span>{t("demoMenu.card")}</span>
                        </button>
                        <button 
                          onClick={() => handlePayTable("cash")}
                          className="py-3.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-2xl border border-zinc-700 active:scale-95 transition-all flex flex-col items-center gap-1.5"
                        >
                          <ShoppingBag className="w-4 h-4 opacity-70" />
                          <span>{t("demoMenu.cash")}</span>
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsPaymentModalOpen(false)}
                      className="mt-6 text-zinc-500 hover:text-white text-xs font-semibold"
                    >
                      {t("demoMenu.close")}
                    </button>
                  </>
                )}

                {/* 2. CARDFORM STEP */}
                {paymentStep === 'cardForm' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        onClick={() => setPaymentStep('options')}
                        className="text-xs text-zinc-500 hover:text-white font-bold flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Geri
                      </button>
                      <span className="text-[10px] font-bold text-zinc-500 tracking-wider">ONLINE ÖDEME</span>
                    </div>

                    {/* Live Card Preview */}
                    <div className="relative w-full aspect-[1.586/1] rounded-2xl p-5 text-white overflow-hidden shadow-xl border border-white/10 mb-6 bg-linear-to-br from-zinc-800/80 to-zinc-900/90 backdrop-blur-md">
                      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[45px] opacity-20 ${venue.theme.accent}`} />
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-9 h-7 rounded bg-amber-400/85 shadow-inner flex items-center justify-center border border-amber-300/40">
                          <div className="grid grid-cols-2 gap-0.5 w-6 h-4 opacity-30">
                            <div className="border border-zinc-950/20" />
                            <div className="border border-zinc-950/20" />
                            <div className="border border-zinc-950/20" />
                            <div className="border border-zinc-950/20" />
                          </div>
                        </div>
                        <div className="text-right text-[10px] font-black italic tracking-widest text-white/50">
                          {cardNumber.startsWith("4") ? "VISA" : cardNumber.startsWith("5") ? "MASTERCARD" : "CARD"}
                        </div>
                      </div>

                      <div className="text-lg font-mono tracking-[0.15em] font-semibold text-white/90 mb-5 text-left">
                        {cardNumber || "•••• •••• •••• ••••"}
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="text-left max-w-[70%]">
                          <div className="text-[8px] font-bold uppercase text-white/40 tracking-wider">Kart Sahibi</div>
                          <div className="text-xs font-bold truncate uppercase tracking-wider">{cardHolder || "AD SOYAD"}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[8px] font-bold uppercase text-white/40 tracking-wider">Son Kul.</div>
                          <div className="text-xs font-mono font-bold tracking-wider">{expiry || "AA/YY"}</div>
                        </div>
                      </div>
                    </div>

                    {/* Credit Card Form */}
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!cardNumber || !cardHolder || !expiry || !cvv) return;
                        startPaymentProcess();
                      }}
                      className="space-y-3 text-left"
                    >
                      <div>
                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{t("demoMenu.cardHolder")}</label>
                        <input 
                          type="text" 
                          placeholder={t("demoMenu.cardHolderPlaceholder")}
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          required
                          className="w-full px-4 py-2.5 mt-1 bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors uppercase font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{t("demoMenu.cardNo")}</label>
                        <input 
                          type="text" 
                          placeholder={t("demoMenu.cardNoPlaceholder")}
                          value={cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            const formatted = val.match(/.{1,4}/g)?.join(" ") || "";
                            if (formatted.length <= 19) {
                              setCardNumber(formatted);
                            }
                          }}
                          required
                          className="w-full px-4 py-2.5 mt-1 bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{t("demoMenu.expiry")}</label>
                          <input 
                            type="text" 
                            placeholder={t("demoMenu.expiry")}
                            value={expiry}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              let formatted = val;
                              if (val.length > 2) {
                                formatted = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                              }
                              if (formatted.length <= 5) {
                                setExpiry(formatted);
                              }
                            }}
                            required
                            className="w-full px-4 py-2.5 mt-1 bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{t("demoMenu.cvv")}</label>
                          <input 
                            type="password" 
                            placeholder="•••"
                            value={cvv}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              if (val.length <= 3) {
                                setCvv(val);
                              }
                            }}
                            required
                            className="w-full px-4 py-2.5 mt-1 bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className={`w-full py-3 mt-4 rounded-xl text-white font-bold text-sm transition-transform active:scale-95 ${venue.theme.accent} ${venue.theme.accentHover}`}
                      >
                        {t("demoMenu.payButton", { amount: `₺${billAmount}` })}
                      </button>
                    </form>
                  </>
                )}

                {/* 3. PROCESSING STEP */}
                {paymentStep === 'processing' && (
                  <div className="py-10 flex flex-col items-center justify-center">
                    <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                      <div className={`w-full h-full rounded-full border-4 border-zinc-800 border-t-accent animate-spin`} />
                    </div>
                    <h4 className="font-bold text-white text-base mb-2">{t("demoMenu.processingPayment")}</h4>
                    <p className="text-zinc-400 text-xs max-w-[240px] leading-relaxed animate-pulse">{processingStatus}</p>
                  </div>
                )}

                {/* 4. SUCCESS STEP */}
                {paymentStep === 'success' && (
                  <div className="py-8 flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 mb-6"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>
                    <h4 className="font-black text-xl text-white mb-2">{t("demoMenu.paymentSuccessTitle")}</h4>
                    <p className="text-zinc-400 text-xs max-w-[240px] leading-relaxed mb-6">{t("demoMenu.paymentSuccessDesc")}</p>
                    
                    <button 
                      onClick={() => {
                        setIsPaymentModalOpen(false);
                        setPaymentStep('options');
                        // Clear form
                        setCardNumber("");
                        setCardHolder("");
                        setExpiry("");
                        setCvv("");
                      }}
                      className={`w-full py-3.5 rounded-xl text-white text-sm font-bold active:scale-95 transition-transform ${venue.theme.accent} ${venue.theme.accentHover}`}
                    >
                      {t("demoMenu.close")}
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* NOTIFICATION TOAST OVERLAY */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="fixed bottom-24 inset-x-6 max-w-xs mx-auto bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50 text-sm font-semibold"
            >
              <CheckCircle className={`w-5 h-5 ${venue.theme.accentText} shrink-0`} />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer Info inside Sim Screen */}
        <div className="mt-auto py-8 text-center text-[10px] text-zinc-600 border-t border-zinc-900 bg-zinc-950/40">
          <Utensils className="w-4 h-4 mx-auto mb-1.5 opacity-30" />
          <span>Vendora QR Menü Alt Yapısı ile Çalışmaktadır</span>
          <br/>
          <Link href="/" className="text-zinc-500 hover:underline mt-1 inline-block">{t("demoMenu.backToHome")}</Link>
        </div>

      </div>
    </div>
  );
}

export default function DemoMenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        <div className="w-8 h-8 rounded-full border-2 border-t-accent border-zinc-800 animate-spin" />
      </div>
    }>
      <InnerDemoMenu />
    </Suspense>
  );
}
