<template>
  <div
    class="menu-item _has_sub categories"
    @mouseenter="showCategories"
    @mouseleave="hideCategories"
  >
    <button class="flex items-center">
      <i-bx-bxs-category-alt class="text-[23px]" />
      <h5 class="mb-0 ml-2 text-[15px] font-semibold text-current">Category</h5>
    </button>

    <div class="sub-menu absolute top-full z-20 h-[312px] w-[150px]">
      <div class="sub-menu-content">
        <ul ref="categoriesRef">
          <li v-for="category in appStore.categories" :key="category.id">
            <router-link to="/" class="flex items-center">
              <span class="w-4 h-4">
                <img alt="" :src="$cdn(category.avatar)" />
              </span>
              <span>{{ category.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GET_CATEGORIES } from '#apollo/queries/categories'
import { GetCategories } from '#apollo/queries/__generated__/GetCategories'

const appStore = useAppStore()

const categoriesRef = ref<HTMLUListElement>()
const anime = useAnime()

const showCategories = () => {
  nextTick(() =>
    anime({
      targets: categoriesRef.value?.querySelectorAll('li'),
      translateY: [-30, 0],
      opacity: [0, 1],
      delay: (el, i) => 100 + 30 * i
    })
  )
}

const hideCategories = () => {
  categoriesRef.value?.querySelectorAll('li').forEach((li) => {
    li.style.opacity = '0'
    li.style.transform = 'translateY(-30px)'
  })
}

const { result } = useQuery<GetCategories>(GET_CATEGORIES)

watch(result, (res) => {
  if (res?.categories) {
    appStore.categories = res.categories
  }
})
</script>

<style scoped lang="scss">
.menu-item.categories {
  ul {
    background: #18181b;
    @apply mb-0 overflow-hidden rounded-lg py-2;
    li {
      a {
        @apply flex items-center py-2 px-2 text-white transition hover:bg-primary-500;
        span {
          @apply ml-2;
        }
      }
    }
  }
}
</style>
