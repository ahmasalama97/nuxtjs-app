<template>
  <v-app :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <NuxtLayout />
    <NuxtSnackbar />
    <SiteFooter />
  </v-app>
</template>

<script setup lang="ts">
import { useLocale } from '~/composables/useLocale'
const { locale } = useLocale()
</script>
