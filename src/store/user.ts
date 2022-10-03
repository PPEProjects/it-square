import { defineStore } from 'pinia'

interface IUserStore {
  user: any
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): IUserStore => ({
    user: null
  }),

  getters: {
    auth: (state) => state.user !== null,
    token: (state) => state.user?.accessToken
  },

  actions: {
    setUser(payload: any) {
      this.user = payload
    },

    logout() {
      this.user = null
    }
  }
})
