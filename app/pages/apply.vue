<template>
  <Header />

  <div class="apply-page">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-sheet class="form-card" elevation="2" rounded>
            <div class="card-inner">
              <h2 class="title">{{ locale === 'ar' ? 'نموذج الطلب' : 'Application Form' }}</h2>

              <v-form ref="formRef" v-model="valid" lazy-validation>
                <div class="grid">

                  <!-- Name / Email -->
                  <div>
                    <label class="label">{{ locale === 'ar' ? 'الاسم' : 'Name' }}</label>
                    <v-text-field v-model="form.applicant_name" dense hide-details
                      :placeholder="locale === 'ar' ? 'الاسم' : 'Name'" />
                  </div>
                  <div>
                    <label class="label">{{ locale === 'ar' ? 'البريد الالكتروني' : 'Email' }}</label>
                    <v-text-field type="email" v-model="form.applicant_email" placeholder="example@mail.com" dense
                      hide-details />
                  </div>
                  <div class="full">
                    <label class="label">{{ locale === 'ar' ? 'نوع التقديم' : 'Application Type' }}</label>
                    <v-select v-model="form.permit_type" :items="types" dense hide-details
                      :placeholder="locale === 'ar' ? 'اختر النوع' : 'Select Type'" />

                    <div class="muted"></div>
                  </div>
                </div>
                <div class="actions">
                  <v-btn variant="outlined" @click="cancel">{{ locale === 'ar' ? 'الغاء' : 'Cancel' }}</v-btn>
                  <v-spacer />
                  <v-btn color="success" :disabled="!canSubmit" @click="submit">{{ locale === 'ar' ? 'تسجيل' : 'Submit'
                  }}</v-btn>
                </div>
              </v-form>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'
import { useApplications } from '~/composables/useApplications'
import { useAppSnackbar } from '~/composables/useAppSnackbar'
import { useLocale } from '~/composables/useLocale'

const formRef = ref()
const valid = ref(false)
const router = useRouter()
const config = useRuntimeConfig()
const { openSnackbar } = useAppSnackbar()
const apiBase = String(config.public?.apiBaseUrl || '').replace(/\/$/, '')
const { add, refresh } = useApplications()
const { locale } = useLocale()
const types = ['Construction', 'Event', 'Business', 'Other']

const form = ref({
  applicant_name: '',
  applicant_email: '',
  permit_type: types[0]
})

const canSubmit = computed(() => {
  return !!form.value.applicant_name && !!form.value.applicant_email && !!form.value.permit_type
})

const cancel = () => router.back()

const submit = async () => {
  if (!canSubmit.value) return

  const payload = {
    applicant_name: form.value.applicant_name,
    applicant_email: form.value.applicant_email,
    permit_type: form.value.permit_type,
    status: 'Pending',
    createdAt: new Date().toISOString()
  }

  // Try to POST to API first (if configured). On success, refresh local list from API.
  if (apiBase) {
    try {
      const res = await fetch(`${apiBase}/permits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        try { await refresh() } catch (e) { }

        openSnackbar('Application Submitted Successfully', 'success')
        router.push('/')
        return
      }
    } catch (e) {
      openSnackbar('Something Went Wrong', 'error')
    }
  }

  try {
    await add(payload as any)
  } catch (e) {
    console.error('Local save failed', e)
  }

  router.push('/')
}
</script>

<style scoped>
.apply-page {
  background: #f6f6f6;
  min-height: calc(100vh - 80px);
  padding: 36px 0;
}

.form-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.card-inner {
  padding: 18px;
}

.title {
  margin: 0 0 16px 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.grid .full {
  grid-column: 1 / -1;
}

.label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 6px;
  color: #333;
}

.muted {
  color: #8b8b8b;
  font-size: 0.85rem;
  margin-top: 6px;
}

.expiry {
  display: flex;
  gap: 10px;
  align-items: center;
  background: #eafaf0;
  padding: 10px;
  border-radius: 8px;
  margin-top: 16px;
}

.expiry-text {
  color: #0b7a4a;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 18px;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
