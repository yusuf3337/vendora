"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, PhoneCall, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

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
            className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-md bg-white border border-zinc-200 rounded-4xl shadow-2xl backdrop-blur-xl pointer-events-auto overflow-hidden relative text-zinc-900"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-900 transition-colors rounded-full bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-accent/15 border border-accent/30 rounded-full flex items-center justify-center mx-auto text-accent shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900">Talebiniz Alındı!</h3>
                    <p className="text-sm text-zinc-600">
                      Uzman ekibimiz en kısa sürede belirttiğiniz telefon numarasından sizinle iletişime geçecektir.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                        {t("modal.title")}
                      </h3>
                    </div>

                    <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                      {t("modal.subtitle")}
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="cb-name"
                          className="text-xs font-semibold text-zinc-700 uppercase tracking-wider"
                        >
                          {t("modal.name")} <span className="text-accent">*</span>
                        </label>
                        <Input
                          type="text"
                          id="cb-name"
                          required
                          placeholder={t("modal.namePlaceholder")}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="cb-phone"
                          className="text-xs font-semibold text-zinc-700 uppercase tracking-wider"
                        >
                          {t("modal.phone")} <span className="text-accent">*</span>
                        </label>
                        <Input
                          type="tel"
                          id="cb-phone"
                          required
                          placeholder={t("modal.phonePlaceholder")}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="cb-note"
                          className="text-xs font-semibold text-zinc-700 uppercase tracking-wider"
                        >
                          {t("modal.note")}{" "}
                          <span className="text-zinc-400 font-normal">
                            {t("modal.noteOptional")}
                          </span>
                        </label>
                        <Input
                          type="text"
                          id="cb-note"
                          placeholder={t("modal.notePlaceholder")}
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="glow"
                        size="lg"
                        className="w-full mt-4 font-semibold"
                      >
                        {t("modal.submit")}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
