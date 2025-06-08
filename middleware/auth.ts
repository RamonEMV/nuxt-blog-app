import type { Prisma, User } from "@prisma/client"
import { userStore } from "~/stores/userStore"

// ---cut---
export default defineNuxtRouteMiddleware(async (to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const piniaInstance = usePinia()
  if (import.meta.client) {
    const valRes = await useFetch<{ id: string }>('/api/auth/validate')
    if (valRes.data.value?.id) {
      const userData = await useFetch<User>('/api/users/' + valRes.data.value.id)
      const store = userStore(piniaInstance)
      store.setUser({
        id: userData.data.value?.id || 0,
        email: userData.data.value?.email || '',
        name: userData.data.value?.name || '',
      })
      return valRes.data.value?.id
    }
    else if (valRes.error) {
      return navigateTo('/login')
    }
  }

  if (import.meta.server) {
    const cookie = useCookie<{ id: number }>('auth')
    if (cookie.value) {
      const userData = await useFetch<User>('/api/users/' + cookie.value.id)
      const store = userStore(piniaInstance)
      store.setUser({
        id: userData.data.value?.id || 0,
        email: userData.data.value?.email || '',
        name: userData.data.value?.name || '',
      })

    }
    if (!cookie.value) {
      return navigateTo('/login')
    }
    return
  }
})

