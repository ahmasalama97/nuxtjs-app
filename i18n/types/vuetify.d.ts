// types/vuetify.d.ts
import 'vue'
import { Vuetify } from 'vuetify'

declare module '#app' {
    interface NuxtApp {
        $vuetify: Vuetify
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $vuetify: Vuetify
    }
}
