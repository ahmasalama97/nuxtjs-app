<template>
    <v-app-bar app flat color="white" elevation="0" class="border-b">
        <v-container max-width="100%">
            <v-row class="d-flex align-center justify-space-between" style="padding: 0 16px;">
                <!-- Mobile Menu Button -->
                <div class="d-flex align-center">
                    <v-btn icon class="d-md-none" @click="menuOpen = true" aria-label="menu">
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>

                    <!-- Logo -->
                    <NuxtLink to="/" class="d-inline-block mx-12">
                        <img src="/images/Logo.png" alt="Apartment Listings Logo" class="logo" />
                    </NuxtLink>


                    <!-- Desktop Navigation -->
                    <div class="d-none d-md-flex align-center" style="gap: 24px;">
                        <NuxtLink to="/" class="nav-link">{{ locale === 'ar' ? 'الصفحة الرئيسية' : 'Home' }}
                        </NuxtLink>
                    </div>
                </div>
                <div class="d-flex align-center">
                    <NuxtLink to="/" class="icon-link">
                        <div>{{ locale === 'ar' ? 'بحث' : 'Search' }}</div><img src="/images/Search.png" alt="Search"
                            class="icon-img" />
                    </NuxtLink>

                    <NuxtLink to="/" class="icon-link" @click.prevent="toggleLocale">
                        <div>{{ locale === 'ar' ? 'English' : 'العربية' }}</div>
                        <img src="/images/Translate.png" alt="Translate" class="icon-img" />
                    </NuxtLink>


                    <NuxtLink to="/" class="icon-link">
                        <div>{{ locale === 'ar' ? 'تسجيل الدخول' : 'Sign In' }}</div><img src="/images/User.png"
                            alt="Login" class="icon-img" />
                    </NuxtLink>
                </div>


            </v-row>
        </v-container>

        <!-- Drawer (Mobile Menu) -->
        <v-navigation-drawer v-model="menuOpen" location="left" temporary width="280">
            <v-sheet class="pa-4">
                <div class="d-flex align-center justify-space-between mb-2">
                    <span class="font-weight-bold">{{ locale === 'ar' ? 'الصفحة الرئيسية' : 'Home' }}</span>
                    <v-btn icon @click="menuOpen = false" aria-label="close">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>

                <v-list>
                    <v-list-item link to="/" @click="menuOpen = false">
                        <v-list-item-title>{{ locale === 'ar' ? 'الصفحة الرئيسية' : 'Home' }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-sheet>
        </v-navigation-drawer>
    </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useLocale } from '~/composables/useLocale'
import { useNuxtApp } from '#app'
import { useI18n } from 'vue-i18n'

const menuOpen = ref(false)
const { locale, toggleLocale } = useLocale()

// Keep the document and Vuetify root in sync with the chosen locale direction.
// We avoid accessing $vuetify directly to prevent runtime/typing issues —
// instead toggle the standard Vuetify RTL class on the root application element
// and set the document direction attribute.
let applyDirection = (isRtl: boolean) => {
    // set the global document direction (html element)
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'

    // Vuetify adds the class `v-application--is-rtl` to its root; toggle it if present
    const appEl = document.querySelector('.v-application') || document.body
    if (appEl) {
        appEl.classList.toggle('v-application--is-rtl', isRtl)
    }
}

// Also attempt to update Vuetify's internal locale RTL flag if the instance
// is available via Nuxt's injection. This makes the flip more reliable for
// Vuetify components that read its internal state.
const nuxt = useNuxtApp()
const anyVuetify = (nuxt as any)?.$vuetify
if (anyVuetify) {
    const originalApply = applyDirection
    applyDirection = (isRtl: boolean) => {
        originalApply(isRtl)
        try {
            if (anyVuetify?.locale?.isRtl) {
                anyVuetify.locale.isRtl.value = isRtl
            }
        } catch (e) {
            /* ignore */
        }
    }
}

onMounted(() => {
    applyDirection(locale.value === 'ar')
})

watch(locale, (newLocale) => {
    applyDirection(newLocale === 'ar')
})
</script>



<style scoped>
.border-b {
    border-bottom: 1px solid #eee;
}

.logo {
    height: 48px;
    width: auto;
    object-fit: contain;
}

.nav-link {
    text-decoration: none;
    color: #111;
    font-weight: 500;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #1976d2;
    /* Vuetify primary color */
}

.icon-link {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 16px;
    text-decoration: none;
    color: #111;
    font-weight: 400;
    transition: color 0.2s;
}
</style>
