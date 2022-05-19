import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {

    en: { translations: {

    }},

    de: { translations: {
        
    }}

}

i18n.use(initReactI18next).init({ resources,
    lng: window.ioApp?.lang || window.lang, // ioApp = cryptool.org
    interpolation: { escapeValue: false }
})

export default i18n
