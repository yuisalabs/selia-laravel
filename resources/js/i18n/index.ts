import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../../../lang/en.json';
import id from '../../../lang/id.json';

const resources = {
    en: { translation: en },
    id: { translation: id },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: import.meta.env.DEV,
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        detection: {
            order: ['htmlTag', 'cookie', 'localStorage'],
            caches: ['cookie', 'localStorage'],
        },
    });

export default i18n;
