import type { Prisma } from "@prisma/client"

interface UserStoreInterface {
  id: number
  name: string | null
  email: string
}
export const userStore = defineStore('user', {
  state: (): { userData: UserStoreInterface | null } => ({ userData: null }),
  getters: {
    user: (state) => state.userData,
  },
  actions: {
    setUser(data: UserStoreInterface) {
      console.log('STOREDATA', data)
      this.userData = data
    },
  },
})
