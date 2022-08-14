import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en';
import cs from './cs';
import ms from './ms';
import zh from './zh';

i18n
.use(initReactI18next)
.init({
  fallbackLng: 'en',
  resources: {
    en: en,
    cs: cs,
    ms: ms,
    zh: zh,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  },
});
  
export default i18n;