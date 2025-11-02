<template>
  <main style="background: #fafafa">
    <!-- Header -->
    <Header />
    <!-- Hero Carousel -->
    <section>
      <HeroBannerCarousel :brand="brand" :slides="slides" />
    </section>

    <!-- Permit Applications Section -->
    <section style="margin-top: 32px;">
      <div style="max-width:1200px;margin:0 auto;padding:0 12px;">
        <header style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <!-- <template> -->
          <strong style="font-size:20px">
            {{ locale === 'ar' ? 'طلبات التصاريح' : 'Permit Applications' }}
          </strong>
          <!-- </template> -->


          <NuxtLink to="/apply"
            :style="{ color: '#000', textDecoration: 'none', fontWeight: 500, border: '2px solid #d2d6db', borderRadius: '5px', padding: '12px' }">
            {{ locale === 'ar' ? 'قدم الآن' : 'Apply Now' }}</NuxtLink>
        </header>

        <PermitList :applications="applications" @delete="onDelete" @edit="onEdit" @change-status="onChangeStatus" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HeroBannerCarousel from "~/components/HeroBannerCarousel.vue";
import { brandColors } from "~/composables/providers";
import { useLocale } from '~/composables/useLocale'
import Header from "~/components/Header.vue";
import PermitList from "../components/PermitList.vue";
import { useApplications } from "../composables/useApplications";
import type { Application } from '../composables/useApplications'
import { useAppSnackbar } from '~/composables/useAppSnackbar'

const { openSnackbar } = useAppSnackbar()
const apiBase = String(useRuntimeConfig().public.apiBaseUrl || '').replace(/\/$/, '');

// translations
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { locale } = useLocale()

const { updateStatus } = useApplications()

const onChangeStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
  try {
    await updateStatus(id, status)

    if (applications?.value) {
      const idx = applications.value.findIndex((a) => a.id === id)
      if (idx !== -1) {
        const updatedApp = {
          ...applications.value[idx],
          id: applications.value[idx]?.id || id,
          application_status: status,
        } as Application

        applications.value[idx] = updatedApp
      }
    }

    openSnackbar('Status updated successfully', 'success')
    if (typeof refresh === 'function') {
      await refresh()
    }
  } catch (e) {
    console.error('Failed to update status', e)
  }
}


// Brand colors
const brand = brandColors;

// Carousel slides
const slides = [
  {
    id: 1,
    background_image: "images/Hero_Section_EN.png",
    align: "left",
  },
  {
    id: 2,
    background_image: "images/Hero_Section_EN_2.png",
    align: "left",
  },
];

const permitList = ref<any[]>([]);
const loading = ref(true);

const { items: applications, refresh } = useApplications()

const onDelete = (id: string) => {
  removeApplication(id)
}

const onEdit = (app: any) => {
  console.log('edit', app)
}

const removeApplication = (id: string) => {
  try {
    const svc = useApplications()
    svc.remove(id)
    refresh()
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    if (apiBase) {
      const res = await fetch(`${apiBase}/permits`)
      const data = await res.json()
      permitList.value = data?.data || []
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
  try {
    await refresh()
  } catch (e) {
    console.warn('Failed to refresh permits from API, falling back to local data.')
  }
})
</script>
