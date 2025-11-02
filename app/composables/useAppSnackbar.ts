import { ref } from 'vue'

const show = ref(false)
const message = ref('')
const color = ref('success')

export const useAppSnackbar = () => {
    const openSnackbar = (text: string, type: 'success' | 'error' = 'success') => {
        message.value = text
        color.value = type
        show.value = true
    }

    return { show, message, color, openSnackbar }
}
