import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en';
import cs from './cs';

i18n
.use(initReactI18next)
.init({
  fallbackLng: 'en',
  resources: {
    en: en,
    cs: cs,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  },
});
  
export default i18n;