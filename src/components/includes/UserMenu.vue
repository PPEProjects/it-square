<template>
  <div
      class="menu-item _has_sub user relative"
      @mouseenter="showCategories"
      @mouseleave="hideCategories"
  >
    <a-badge dot>
      <a-avatar size="large" src="/images/avatar.jpeg"></a-avatar>
    </a-badge>

    <div class='absolute sub-menu w-[200px] h-[120px] top-full z-20 sub-content'>
      <div
          class='sub-menu-content'
      >
        <ul
            ref="categoriesRef"
            class="bg-[#18181b] rounded-lg text-gray-300 overflow-hidden py-2"
        >
          <li class="opacity-0">
            <a class="px-4 py-3 flex items-center transition hover:bg-primary-500 hover:text-white text-gray-200">
              <i-mdi-file-document />
              <span class="ml-3">
                Hồ Sơ Xin Việc
              </span>
            </a>
          </li>

          <li class="opacity-0">
            <a class="px-4 py-3 flex items-center transition hover:bg-primary-500 hover:text-white text-gray-200">
              <i-material-symbols-dashboard-rounded />
              <span class="ml-3">
                Quản Lý Dự Án
              </span>
            </a>
          </li>

          <li class="opacity-0">
            <a class="px-4 py-3 flex items-center transition hover:bg-primary-500 hover:text-white text-gray-200">
              <i-fluent-people-team-16-filled />
              <span class="ml-3">Quản Lý Nhóm</span>
            </a>
          </li>

          <li class="opacity-0">
            <a
                class="px-4 py-3 flex items-center transition hover:bg-primary-500 hover:text-white text-gray-200"
                @click="logOut"
            >
              <i-majesticons-logout-half-circle />
              <span class="ml-3">Đăng Xuất</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { signOut } from 'firebase/auth'
import {useFirebaseContext} from "@composable/useFirebase";

const userStore = useUserStore()
const firebaseCtx = useFirebaseContext()

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

const logOut = async () => {
  await signOut(getAuth(firebaseCtx))
}
</script>

<style scoped>
.menu-item.user .sub-content {
  top: unset;
  right: -10px;
}

#site-header .menu-item.user .sub-content .sub-menu-content:before {
  left: unset;
  right: 14px;
}
</style>
