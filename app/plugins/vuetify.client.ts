// plugins/vuetify.client.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import { ar, en } from 'vuetify/locale'

export default defineNuxtPlugin((nuxtApp) => {
    // ✅ Safe check for client environment
    const isClient = typeof window !== 'undefined'

    // ✅ Dynamically read locale from localStorage or default to 'en'
    const savedLocale = isClient ? localStorage.getItem('locale') as 'ar' | 'en' | null : null
    const currentLocale = savedLocale || 'en'

    const customMessages = {
        en: {
            ...en,
            permitApplications: 'Permit Applications',
        },
        ar: {
            ...ar,
            permitApplications: 'طلبات التصاريح',
        },
    }
    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: { mdi },
        },
        locale: {
            locale: currentLocale, // ✅ dynamically set
            fallback: 'en',
            messages: customMessages,
            rtl: { ar: true, en: false },
        },
    })

    // ✅ Apply correct document direction immediately
    if (isClient) {
        const isRtl = currentLocale === 'ar'
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr'

        // ✅ Update Vuetify internal RTL flag if available
        const anyVuetify = vuetify as any
        if (anyVuetify?.locale?.isRtl) {
            anyVuetify.locale.isRtl.value = isRtl
        }
    }

    // ✅ Register Vuetify globally
    nuxtApp.vueApp.use(vuetify)
})
