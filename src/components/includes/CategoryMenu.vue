<template>
  <div
      class='menu-item _has_sub categories'
      @mouseenter="showCategories"
      @mouseleave="hideCategories"
  >
    <button class='flex items-center'>
      <i-bx-bxs-category-alt class='text-[23px]' />
      <h5 class='mb-0 text-current font-semibold ml-2 text-[15px]'>Category</h5>
    </button>

    <div class='absolute sub-menu w-[150px] h-[312px] top-full z-20'>
      <div
          class='sub-menu-content'
      >
        <ul ref="categoriesRef">
          <li
              v-for="category in categories"
              :key="category.id"
          >
            <router-link to="/">
              <component :is="category.icon" />
              <span>{{ category.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

// @ts-ignore
import MdiWeb from '~icons/mdi/web'
// @ts-ignore
import UilMobileVibrate from '~icons/uil/mobile-vibrate'
// @ts-ignore
import PhFigmaLogo from '~icons/ph/figma-logo'
// @ts-ignore
import NimbusMarketing from '~icons/nimbus/marketing'
// @ts-ignore
import ClarityBlocksGroupSolid from '~icons/clarity/blocks-group-solid'
// @ts-ignore
import ClarityInternetOfThingsSolid from '~icons/clarity/internet-of-things-solid'
// @ts-ignore
import MdiAppleIcloud from '~icons/mdi/apple-icloud'
// @ts-ignore
import UilServers from '~icons/uil/servers'
// @ts-ignore
import PhDatabaseFill from '~icons/ph/database-fill'

// 'Mobile', 'Web', 'Design', 'Marketing', 'Blockchain', 'IoT', 'Cloud', 'DevOps', 'Cybersecurity', 'Data Science'
import {CategoryDocument} from "@entities/category";
import {useAnime} from "@composable/useAnime";

const categories = shallowRef<CategoryDocument[]>([
  {
    id: '1',
    name: 'Mobile',
    slug: 'mobile',
    icon: UilMobileVibrate
  },
  {
    id: '2',
    name: 'Web',
    slug: 'web',
    icon: MdiWeb
  },
  {
    id: '3',
    name: 'Design',
    slug: 'design',
    icon: PhFigmaLogo
  },
  {
    id: '4',
    name: 'Marketing',
    slug: 'marketing',
    icon: NimbusMarketing
  },
  {
    id: '5',
    name: 'Blockchain',
    slug: 'marketing',
    icon: ClarityBlocksGroupSolid
  },
  {
    id: '6',
    name: 'IoT',
    slug: 'iot',
    icon: ClarityInternetOfThingsSolid
  },
  {
    id: '7',
    name: 'Cloud',
    slug: 'cloud',
    icon: MdiAppleIcloud
  },
  {
    id: '8',
    name: 'DevOps',
    slug: 'devops',
    icon: UilServers
  },
  {
    id: '10',
    name: 'Data Science',
    slug: 'data-science',
    icon: PhDatabaseFill
  }
])

const categoriesRef = ref<HTMLUListElement>()
const anime = useAnime()

const showCategories = () => {
  nextTick(() => anime({
    targets: categoriesRef.value?.querySelectorAll('li'),
    translateY: [-30, 0],
    opacity: [0, 1],
    //duration: 300,
    // easing: 'easeOutQuad',
    delay: (el, i) => 100 + 30 * i
  }))
}

const hideCategories = () => {
  categoriesRef.value?.querySelectorAll('li').forEach((li) => {
    li.style.opacity = '0'
    li.style.transform = 'translateY(-30px)'
  })
}

</script>

<style scoped lang="scss">
.menu-item.categories {
  ul {
    background: #18181b;
    @apply mb-0 rounded-lg py-2 overflow-hidden;
    li {
      a {
        @apply flex items-center py-2 px-3 text-white transition hover:bg-primary-500;
        span {
          @apply ml-2;
        }
      }
    }
  }
}
</style>
