<template>
  <v-sheet elevation="0" class="pa-4 white">
    <!-- Header -->
    <div class="list-head">
      <div>{{ locale === 'ar' ? 'الحالة' : 'Status' }}</div>
      <div>{{ locale === 'ar' ? 'اسم المقدم' : 'Applicant Name' }}</div>
      <div>{{ locale === 'ar' ? 'البريد الالكتروني' : 'Applicant Email' }}</div>
      <div>{{ locale === 'ar' ? 'نوع التقديم' : 'Permit Type' }}</div>
      <div>{{ locale === 'ar' ? 'تاريخ التقديم' : 'Submitted Date' }}</div>
      <div class="text-right"></div>
    </div>

    <!-- Rows -->
    <div v-for="app in applications" :key="app.id" class="list-row">
      <div>
        <v-chip :color="chipColor(app.application_status)" small class="status-chip">
          {{ chipLabel(app.application_status, locale) }}
        </v-chip>
      </div>
      <div>{{ app.applicant_name }}</div>
      <div>{{ app.applicant_email || '-' }}</div>
      <div>{{ app.permit_type }}</div>
      <div>{{ app.submitted_at ? formatDate(app.submitted_at) : formatDate(app.createdAt) }}</div>
      <div class="text-right">
        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="action-btn">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('change-status', app.id, 'Approved')">
              <v-list-item-title>{{ locale === 'ar' ? 'يعتمد' : 'Approve' }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$emit('change-status', app.id, 'Rejected')">
              <v-list-item-title>{{ locale === 'ar' ? 'يرفض' : 'Reject' }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { Application } from '../composables/useApplications'
import { useLocale } from '~/composables/useLocale'

const props = defineProps<{ applications: Application[] }>()
const { locale } = useLocale()

const chipColor = (status: string) => {
  if (status === 'Approved') return 'green lighten-2'
  if (status === 'Rejected') return 'pink lighten-3'
  return 'orange lighten-2'
}

const chipLabel = (status: string, locale: string) => {
  if (status === 'Approved') return locale === 'ar' ? 'نشط' : 'Active'
  if (status === 'Rejected') return locale === 'ar' ? 'مرفوض' : 'Rejected'
  return locale === 'ar' ? 'قيد الانتظار' : 'Pending'
}

const formatDate = (iso?: string) => {
  if (!iso) return '-'
  try {
    return new Date(iso).toLocaleString()
  } catch (e) {
    return iso
  }
}
</script>

<style scoped>
.list-head,
.list-row {
  display: grid;
  grid-template-columns: 120px 140px 260px 180px 180px 120px;
  /* same for all rows */
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  gap: 12px;
}

.list-head {
  font-weight: 700;
  color: #444;
  background: #f3f4f6;
  margin-bottom: 8px;
}

.list-row {
  background: #fff;
  border: 1px solid #eee;
  margin-top: 8px;
}

.status-chip {
  text-transform: none;
}

.action-btn {
  box-shadow: none;
}
</style>
