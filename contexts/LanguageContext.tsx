'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslations, Translations } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    // Cargar idioma guardado en localStorage o detectar del navegador
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['es', 'en', 'pt'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en' || browserLang === 'pt') {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}


