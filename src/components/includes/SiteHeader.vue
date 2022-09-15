<template>
  <div id="site-header" :class="[isStudio ? 'cutsom-shadow' : 'border-b']">
    <div class="mx-auto flex h-full max-w-bootstrap items-center px-4">

      <div class="header-logo mr-3 flex-shrink-0">
        <router-link to="/" title="" class="logo">
          <img
            class="mr-4 h-full w-full object-cover"
            src="/images/logo.svg"
            alt=""
          />
        </router-link>
      </div>

      <div
        class="menu-list flex h-full flex-shrink-0 items-center text-gray-500 mr-auto"
      >
        <tech-menu />

        <category-menu />

        <div class="menu-item">
          <router-link to="/studio" class="flex items-center text-gray-500 hover:text-gray-500">
            <i-mdi-pencil-circle class="text-[23px]" />
            <h5 class="mb-0 ml-2 text-[15px] font-semibold text-current">
              Studio
            </h5>
          </router-link>
        </div>
      </div>

      <template v-if="!isStudio">
        <div class="flex h-full w-full justify-end py-3.5 pr-3">
          <form
              class="h-full w-[280px]"
              action="/search"
              @click="app.openSpotlight = true"
          >
            <div
                class="flex h-full w-full cursor-pointer items-center rounded-full border pl-4 transition hover:border-primary-500 hover:bg-primary-50 hover:text-primary-500 focus:outline-0"
            >
              <i-tabler-search class="flex-shrink-0 text-current" />
              <span class="ml-2 text-current">Tìm kiếm...</span>
            </div>
          </form>
        </div>

        <div class="mx-6 flex flex-shrink-0 items-center text-gray-500">
          <div class="text-[15px] font-semibold">Find Job</div>

          <div class="ml-6 text-[15px] font-semibold">Blog</div>

          <button class="ml-6" @click="$router.push('/private')">
            <i-ic-sharp-settings class="text-[20px]" />
          </button>
        </div>

        <div class="header-user flex-shrink-0">
          <a-badge v-if="userStore.auth" dot>
            <a-avatar size="large" src="/images/avatar.jpeg"></a-avatar>
          </a-badge>
          <button
              v-else
              class="rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-4 py-2 text-white"
              @click="$router.push('/auth/signin')"
          >
            Đăng Nhập
          </button>
        </div>

      </template>

      <div id="header-actions" class="empty:hidden"></div>

    </div>
  </div>

  <div class="h-[70px]"></div>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const app = useAppStore()

const route = useRoute()

const isStudio = computed(() => /^studio/.test(String(route.name)))
</script>

<style lang="scss">
#site-header {
  @apply fixed top-0 right-0 left-0 z-40 h-[70px] bg-white;
  .header-logo .logo img {
    @apply block w-[50px];
  }
  .header-user {
    @apply flex flex-shrink-0 items-center;
  }
  .menu-list > .menu-item {
    @apply relative ml-7 first:ml-0;
  }
  .menu-list > .menu-item > button {
    @apply hover:text-primary-500;
  }

  .menu-item._has_sub .sub-menu {
    @apply invisible translate-x-[-30px] opacity-0 transition-all ease-in-out;
  }

  .menu-item._has_sub:hover .sub-menu {
    @apply visible translate-x-[-10px] opacity-100;
  }

  .sub-menu-content {
    @apply relative;
    height: calc(100% - 15px);
    top: 15px;
  }
  .sub-menu-content {
    @apply before:absolute;
  }
  .sub-menu-content:before {
    bottom: 100%;
    left: 14px;
    border-bottom: 7px solid #18181b;
    border-left: 6px dashed transparent;
    border-right: 6px dashed transparent;
    height: 0;
    width: 0;
  }

  .parents > li > a {
    @apply relative block text-[16px] font-medium text-gray-300 transition;
    padding: 12px 16px;
  }
  .parents > li.active > a {
    @apply bg-primary-500 text-white;
  }

  .langs-group {
    @apply absolute top-0 left-0 z-0 flex w-full scale-90 flex-wrap px-2 py-3 opacity-0 transition;
  }
  .langs-group.active {
    @apply z-10 scale-100 opacity-100;
  }

  .langs-group > li {
    @apply py-1 pr-8;
  }
  .langs-group > li > a {
    @apply block overflow-hidden rounded-md px-3 py-1 text-gray-300 transition hover:bg-primary-600;
  }
}
</style>
