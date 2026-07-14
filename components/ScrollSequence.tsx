"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const screens = [
  { id: "pos", src: "/images/pos.png", title: "POS Ekranı" },
  { id: "waiter", src: "/images/waiter.png", title: "Garson Ekranı" },
  { id: "kitchen", src: "/images/kitchen.png", title: "Mutfak Ekranı" },
  { id: "dashboard", src: "/images/dashboard.png", title: "Stok ve Raporlar" },
  { id: "map", src: "/images/map.png", title: "Şube Yönetimi" },
];

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-foreground text-background">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-10 w-full text-center z-10">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Tüm Operasyon Tek Ekranda</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-lg">
            Aşağı kaydırdıkça sistemin farklı modüllerini keşfedin.
          </p>
        </div>

        <div className="relative w-[90vw] max-w-5xl aspect-video mt-12 md:mt-24">
          {screens.map((screen, index) => {
            const start = index / screens.length;
            const end = (index + 1) / screens.length;
            
            // Fade in and out
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.05), start, end - 0.05, end],
              [0, 1, 1, 0]
            );

            // Slight scale effect for premium feel
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.05), start, end - 0.05, end],
              [0.95, 1, 1, 1.05]
            );

            return (
              <motion.div
                key={screen.id}
                style={{ opacity, scale }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                  <Image
                    src={screen.src}
                    alt={screen.title}
                    fill
                    className="object-cover"
                    quality={100}
                    priority={index === 0}
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-foreground/80 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-700">
                    <span className="text-sm font-medium tracking-wide text-background">{screen.title}</span>
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
