import { defineStore } from 'pinia'

interface IAppStore {
  openSpotlight: boolean
}

export const useAppStore = defineStore({
  id: 'app',

  state: (): IAppStore => ({
    openSpotlight: false
  })
})
