<template>
  <v-card class="application-card">
    <v-img :src="image" height="160px" />
    <v-card-title class="d-flex justify-space-between align-center">
      <div>
        <div class="title">{{ application.applicant_name }}</div>
        <div class="subtitle">{{ application.applicant_email }}</div>
        <v-chip :color="statusColor" small class="padding: 10px">{{ application.application_status }}</v-chip>
      </div>
    </v-card-title>

    <v-card-text>
      <div class="desc">{{ application.permit_type }}</div>
      <div class="mt-4 small grey--text">Submitted: {{ application.submitted_at }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn text @click="$emit('view', application)">View</v-btn>
      <v-spacer />
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$emit('change-status', application.id, 'Approved')">
            <v-list-item-title>Approve</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('change-status', application.id, 'Rejected')">
            <v-list-item-title>Reject</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Application } from './useApplications';

const props = defineProps<{ application: Application, image?: string }>()

const statusColor = computed(() => {
  switch (props.application.application_status) {
    case 'Approved': return 'green'
    case 'Rejected': return 'red'
    default: return 'amber'
  }
})

const prettyDate = computed(() => new Date(props.application.createdAt).toLocaleString())

const image = props.image || '/images/card-placeholder.jpg'
</script>

<style scoped>
.application-card { max-width: 320px; }
.title { font-weight: 200; font-size: 1rem }
.subtitle { font-size: 0.9rem; color: #666 }
.desc { min-height: 40px }
</style>
