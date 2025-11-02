<template>
  <v-main>
    <NuxtPage />
    <v-snackbar
      v-model="show"
      :color="color"
      timeout="3000"
      location="bottom right"
    >
      {{ message }}
    </v-snackbar>
  </v-main>
</template>

<script setup lang="ts">
import { useAppSnackbar } from '~/composables/useAppSnackbar'
const { show, message, color } = useAppSnackbar()
</script>
