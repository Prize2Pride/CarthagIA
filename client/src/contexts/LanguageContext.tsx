import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar" | "fr" | "de" | "it" | "es" | "pt" | "ko" | "ja" | "zh";

interface LanguageMetadata {
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
}

const LANGUAGE_METADATA: Record<Language, LanguageMetadata> = {
  en: { name: "English", nativeName: "English", dir: "ltr", flag: "🇬🇧" },
  ar: { name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇸🇦" },
  fr: { name: "French", nativeName: "Français", dir: "ltr", flag: "🇫🇷" },
  de: { name: "German", nativeName: "Deutsch", dir: "ltr", flag: "🇩🇪" },
  it: { name: "Italian", nativeName: "Italiano", dir: "ltr", flag: "🇮🇹" },
  es: { name: "Spanish", nativeName: "Español", dir: "ltr", flag: "🇪🇸" },
  pt: { name: "Portuguese", nativeName: "Português", dir: "ltr", flag: "🇵🇹" },
  ko: { name: "Korean", nativeName: "한국어", dir: "ltr", flag: "🇰🇷" },
  ja: { name: "Japanese", nativeName: "日本語", dir: "ltr", flag: "🇯🇵" },
  zh: { name: "Chinese (Mandarin)", nativeName: "中文", dir: "ltr", flag: "🇨🇳" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
  metadata: LanguageMetadata;
  allLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("carthagiaLanguage") as Language) || "en";
    }
    return "en";
  });

  const metadata = LANGUAGE_METADATA[language];
  const dir = metadata.dir;
  const allLanguages = Object.keys(LANGUAGE_METADATA) as Language[];

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("carthagiaLanguage", lang);
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = LANGUAGE_METADATA[lang].dir;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    // Load language-specific fonts
    loadLanguageFonts(language);
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, metadata, allLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

// Load language-specific fonts
function loadLanguageFonts(language: Language) {
  if (typeof window === "undefined") return;

  const fontLinks: Record<Language, string> = {
    en: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    ar: "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600;700&display=swap",
    fr: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    de: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    it: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    es: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    pt: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    ko: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700&display=swap",
    ja: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700&display=swap",
    zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600;700&display=swap",
  };

  const link = document.createElement("link");
  link.href = fontLinks[language];
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
