import { defineStore } from 'pinia'
import {GetMe_me} from "#apollo/queries/__generated__/GetMe";

interface IUserStore {
  user?: GetMe_me
  token: string
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): IUserStore => ({
    user: undefined,
    token: ''
  }),

  getters: {
    auth: (state) => !!state.user
  },

  actions: {
    setUser(payload?: GetMe_me) {
      this.user = payload
    },
    logout() {
      window.location.href = '/'
    }
  }
})
