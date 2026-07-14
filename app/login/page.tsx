"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, HeadphonesIcon, Globe, Monitor, Apple, Play } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center relative overflow-hidden bg-zinc-900">

      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-900/80 to-zinc-900/40 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 py-20">

        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-white">
          <p className="text-accent font-bold tracking-wider text-sm md:text-base uppercase mb-4">
            TÜRKİYE'NİN EN YENİLİKÇİ #YÖNETİM SİSTEMİ
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            İşinizi <br />
            otomatikleştirin
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-medium mb-12 max-w-xl">
            Güçlü altyapı, dinamik QR menüler ve kusursuz kurye takibi...
            İşletmenizi yönetmenin en kolay ve en modern hali. Sadece bir yazılım değil,
            işinizin yeni dijital gücü.
          </p>

          <div className="mt-12 pt-8 border-t border-zinc-700/50">
            <p className="text-zinc-400 font-semibold tracking-widest text-sm mb-6 uppercase">
              VENDORA TEKNOLOJİ
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 hover:bg-accent hover:border-accent transition-all flex items-center justify-center group">
                <Monitor className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
              </button>
              <button className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 hover:bg-accent hover:border-accent transition-all flex items-center justify-center group">
                <Apple className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
              </button>
              <button className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 hover:bg-accent hover:border-accent transition-all flex items-center justify-center group">
                <Play className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
              </button>
              <button className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 hover:bg-accent hover:border-accent transition-all flex items-center justify-center group">
                <Globe className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Content - Login Card */}
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl">

            {/* Top Bar of the Card */}
            <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-8 rounded border border-zinc-200 flex items-center justify-center text-lg shadow-sm">
                🇹🇷
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-zinc-800">Teknik Destek</p>
                  <p className="text-xs text-accent font-semibold">İletişime Geç</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <HeadphonesIcon className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Logo & Welcome */}
            <div className="flex flex-col items-center mb-8">
              <Link href="/">
                <img src="/images/logo.png" alt="Vendora Logo" className="h-16 mix-blend-multiply mb-4" />
              </Link>
              <h2 className="text-xl font-bold text-zinc-800">
                Vendora'ya hoşgeldiniz
              </h2>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="email"
                  placeholder="E-postanızı giriniz"
                  className="w-full bg-zinc-50 border border-zinc-100 text-zinc-900 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-zinc-400 font-medium"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="password"
                  placeholder="Şifrenizi giriniz"
                  className="w-full bg-zinc-50 border border-zinc-100 text-zinc-900 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-zinc-400 font-medium"
                />
              </div>

              <div className="flex items-center justify-between pt-2 pb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-accent focus:ring-accent/20" />
                  <span className="text-sm font-medium text-zinc-600">Beni Hatırla</span>
                </label>
                <a href="#" className="text-sm font-medium text-zinc-500 hover:text-accent transition-colors">
                  Şifrenizi unuttunuz?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#f98b3f] hover:bg-[#eb7a2e] text-white py-4 rounded-xl font-bold text-lg shadow-[0_8px_20px_rgba(249,139,63,0.3)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Giriş yap
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-zinc-500 font-medium">
              Hesabınız yok mu? <a href="#" className="text-[#f98b3f] font-bold hover:text-[#eb7a2e] transition-colors">Kayıt olun</a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
