import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    ns: ["common", "topbar", "sidebar"],
    defaultNS: "common",
    backend: {
      loadPath: "/ClearCV/lang/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: true,
    },
  });
