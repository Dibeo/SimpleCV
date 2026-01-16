import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) 
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    debug: true,
    ns: ['shared/topbar'],
    defaultNS: 'shared/topbar',
    backend: {
      loadPath: `${import.meta.env.BASE_URL}lang/{{lng}}/{{ns}}.json`
    },
    react: {
      useSuspense: true
    }
  });