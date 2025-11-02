import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export type Application = {
    id: string
    applicant_name: string
    applicant_email: string
    permit_type: string
    submitted_at?: string
    application_status: 'Pending' | 'Approved' | 'Rejected'
    createdAt: string
}

const STORAGE_KEY = 'permit_applications'

const load = (): Application[] => {
    try {
        if (typeof window === 'undefined') return []
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        return JSON.parse(raw) as Application[]
    } catch (e) {
        return []
    }
}

const save = (items: Application[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useApplications = () => {
    const items = ref<Application[]>([])

    const config = useRuntimeConfig()
    const apiBase = String(config.public?.apiBaseUrl || '').replace(/\/$/, '')

    // try to load from API first, fallback to localStorage
    const refresh = async () => {
        if (typeof window === 'undefined') return

        // attempt native fetch from API endpoint {apiBase}/permits
        if (apiBase) {
            try {
                const res = await fetch(`${apiBase}/permits`)
                if (res.ok) {
                    const data = await res.json()
                    if (Array.isArray(data)) {
                        items.value = data as Application[]
                        try { save(items.value) } catch { }
                        return
                    }
                    // some APIs return { data: [...] }
                    if (Array.isArray(data?.data)) {
                        items.value = data.data as Application[]
                        try { save(items.value) } catch { }
                        return
                    }
                }
            } catch (e) {
                // ignore and fallback to local
            }
        }

        // fallback to localStorage
        items.value = load()
    }

    const add = async (app: Omit<Application, 'id' | 'createdAt'>) => {
        const id = Date.now().toString()
        const newApp: Application = {
            id,
            createdAt: new Date().toISOString(),
            ...app,
        }
        if (apiBase) {
            try {
                const res = await fetch(`${apiBase}/permits`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newApp),
                })
                if (res.ok) {
                    const created = await res.json()
                    const list = load()
                    list.unshift(created as Application)
                    save(list)
                    items.value = list
                    return created as Application
                }
            } catch (e) {
            }
        }

        const list = load()
        list.unshift(newApp)
        save(list)
        items.value = list
        return newApp
    }

    const updateStatus = async (id: string, status: Application['application_status']) => {
        // Try PATCH to API: PATCH {apiBase}/permits/{id}/status with body { status }
        if (apiBase) {
            try {
                const res = await fetch(`${apiBase}/permits/${id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status }),
                })
                if (res.ok) {
                    // refresh local copy from API
                    try { await refresh() } catch (e) { /* ignore */ }
                    return true
                }
            } catch (e) {
                // network error - fall back to local update
            }
        }

        // fallback to local update
        const list = load()
        const idx = list.findIndex(i => i.id === id)
        if (idx === -1) return false
        if (!list[idx]) return false
        list[idx].application_status = status
        save(list)
        items.value = list
        return true
    }

    const remove = (id: string) => {
        const list = load()
        const filtered = list.filter(i => i.id !== id)
        save(filtered)
        items.value = filtered
        return true
    }

    // initial load
    if (typeof window !== 'undefined') refresh()

    return {
        items,
        refresh,
        add,
        updateStatus,
        remove,
    }
}
