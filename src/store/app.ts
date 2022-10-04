import { defineStore } from 'pinia'
import {GetCategories_categories} from "#apollo/queries/__generated__/GetCategories";

interface IAppStore {
  openSpotlight: boolean,
  categories: GetCategories_categories[]
}

export const useAppStore = defineStore({
  id: 'app',

  state: (): IAppStore => ({
    openSpotlight: false,
    categories: []
  })
})
