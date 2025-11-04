import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    
    navigation: {
      home: 'Home',
      donate: 'Donate Blood',
      banks: 'Blood Banks',
      news: 'News',
      about: 'About Us',
      contact: 'Contact'
    },
    buttons: {
      login: 'Login',
      logout: 'Logout',
      signup: 'Sign Up'
    }
  },
  np: {
   
    navigation: {
      home: 'गृहपृष्ठ',
      donate: 'रक्त दान गर्नुहोस्',
      banks: 'रक्त बैंकहरू',
      news: 'समाचार',
      about: 'हाम्रो बारेमा',
      contact: 'सम्पर्क'
    },
    buttons: {
      login: 'लगइन',
      logout: 'लगआउट',
      signup: 'दर्ता गर्नुहोस्'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('appLanguage') || 'en';
    }
    return 'en';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appLanguage', language);
    }
  }, [language]);

  // Enhanced translation function with nested key support
  const t = (key, fallback = '') => {
    if (!key) return fallback;
    
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value ?? fallback ?? key;
  };

  // Toggle between English and Nepali
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'np' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ 
      t,
      language,
      setLanguage,
      toggleLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};