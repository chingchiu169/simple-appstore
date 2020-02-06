import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from "./locales/translation_en.json";
import translationTC from "./locales/translation_tc.json";
import translationCN from "./locales/translation_cn.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationEN },
            tc: { translation: translationTC },
            cn: { translation: translationCN }
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;