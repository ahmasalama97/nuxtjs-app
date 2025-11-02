import { ref, onMounted, watch } from 'vue'
import { useNuxtApp } from '#app'

export const useLocale = () => {
    const nuxt = useNuxtApp()
    const locale = ref<'ar' | 'en'>('en')

    onMounted(() => {
        try {
            const saved = (typeof window !== 'undefined' && (window as any).localStorage)
                ? (window as any).localStorage.getItem('locale') as 'ar' | 'en' | null
                : null
            locale.value = saved || 'en'
        } catch (e) {
            locale.value = 'en'
        }

        document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'

        // Sync nuxt-i18n if available
        try {
            const anyI18n = (nuxt as any).$i18n
            if (anyI18n) {
                anyI18n.locale = locale.value
            }
        } catch (e) {
            // ignore
        }
    })

    watch(locale, (newLocale) => {
        try {
            if (typeof window !== 'undefined' && (window as any).localStorage) {
                (window as any).localStorage.setItem('locale', newLocale)
            }
        } catch (e) {
            // ignore
        }

        document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'

        // Sync nuxt-i18n if available (module exposes $i18n)
        try {
            const anyI18n = (nuxt as any).$i18n
            if (anyI18n) {
                anyI18n.locale = newLocale
            }
        } catch (e) {
            // ignore
        }
    })

    const toggleLocale = () => {
        locale.value = locale.value === 'en' ? 'ar' : 'en'
        window.location.reload()
    }

    return { locale, toggleLocale }
}
