"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Dictionaries
import tr from "../locales/tr";
import en from "../locales/en";
import ru from "../locales/ru";
import de from "../locales/de";
import fr from "../locales/fr";

const dictionaries: Record<string, any> = { tr, en, ru, de, fr };

export type LanguageCode = "tr" | "en" | "ru" | "de" | "fr";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("app_lang") as LanguageCode;
    if (storedLang && dictionaries[storedLang]) {
      setLanguageState(storedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  // Function to get nested keys like "header.product"
  const t = (key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let value = dictionaries[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to Turkish if key not found in selected language
        let fallbackValue = dictionaries["tr"];
        for (const fk of keys) {
            if (fallbackValue && typeof fallbackValue === "object" && fk in fallbackValue) {
                fallbackValue = fallbackValue[fk];
            } else {
                return key; // Missing translation
            }
        }
        value = fallbackValue;
        break;
      }
    }

    if (typeof value !== "string") return key;

    let parsedValue = value;
    if (variables) {
      Object.entries(variables).forEach(([vKey, vValue]) => {
        parsedValue = parsedValue.replace(new RegExp(`{${vKey}}`, "g"), String(vValue));
      });
    }

    return parsedValue;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
