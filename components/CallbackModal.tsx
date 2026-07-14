"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const { t } = useLanguage();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl pointer-events-auto overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {t("modal.title")}
                </h3>
                <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                  {t("modal.subtitle")}
                </p>

                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1.5">
                    <label htmlFor="cb-name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {t("modal.name")} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="cb-name"
                      required
                      placeholder={t("modal.namePlaceholder")}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-zinc-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="cb-phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {t("modal.phone")} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="cb-phone"
                      required
                      placeholder={t("modal.phonePlaceholder")}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-zinc-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="cb-note" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {t("modal.note")} <span className="text-zinc-400 dark:text-zinc-500 font-normal">{t("modal.noteOptional")}</span>
                    </label>
                    <input
                      type="text"
                      id="cb-note"
                      placeholder={t("modal.notePlaceholder")}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-zinc-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-foreground text-background px-5 py-3.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex justify-center items-center"
                  >
                    {t("modal.submit")}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
