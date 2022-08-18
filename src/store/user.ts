import { defineStore } from 'pinia'
import { useItSquare } from '@composable/useItSquare'
import { GetMe } from '#apollo/it/queries/__generated__/GetMe'
import { GET_ME } from '#apollo/it/queries/auth.queries'

interface IUserStore {
  user: any
  _token: string
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): IUserStore => ({
    user: null,
    _token: ''
  }),

  getters: {
    auth: (state) => state.user !== null
  },

  actions: {
    setUser(payload: any) {
      this.user = payload
    },

    setToken(token: string) {
      this._token = token
    },

    async getMe() {
      const client = useItSquare()
      try {
        const data = await client.query<GetMe>({
          query: GET_ME
        })
        // @ts-ignore
        this.user = data?.data?.me
      } catch (e) {
        // Logout
        console.log(e)
      }
    },

    logout() {
      this._token = ''
      this.user = null
    }
  }
})
