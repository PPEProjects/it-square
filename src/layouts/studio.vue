<template>
  <div id="studio-layout">
    <div class="flex w-full h-full relative">
      <div
          class="w-[280px] bg-white h-full cutsom-shadow flex-shrink-0 z-20"
      >

        <router-link
            to="/"
            class="home-link text-current font-semibold text-[32px] mb-0 mt-3 pl-10 block"
        >
          IT Studio
        </router-link>

        <ul class="nav-primary mt-[20px]">

          <studio-menu-item
              :active="/^studio$/.test($route.name)"
              icon="#i-dashboard"
              label="Tổng Quan"
              to="/studio"
          >
            <template #icon>
              <i-fa-solid-drafting-compass />
            </template>
          </studio-menu-item>
          <studio-menu-item
              :active="/^studio-(projects|new-project)/.test($route.name)"
              label="Dự Án"
              to="/studio/projects"
          >
            <template #icon>
              <i-ph-person-simple-run-bold />
            </template>
          </studio-menu-item>

          <studio-menu-item
              v-if="false"
              :active="/^(payment)/.test($route.name)"
              icon="#i-income"
              label="Việc Làm"
          >
            <template #default>
              <ul
                  class="bg-white absolute w-[280px] right-0 left-full top-0 sub-nav py-3 -ml-3 -mt-3 rounded"
              >
                <studio-menu-item
                    :active="/^(payment)\/activity/.test($route.name)"
                    icon="#i-income"
                    label="Việc Làm"
                    to="/payment/activity"
                />

                <studio-menu-item
                    :active="/^(payment)\/history/.test($route.name)"
                    icon="#i-trash-bin"
                    label="Lịch Sử"
                    to="/payment/history"
                />

              </ul>
            </template>
          </studio-menu-item>

          <studio-menu-item
              :active="/^(studio-blogs)/.test($route.name)"
              label="Bài Viết"
              to="/users"
          >
            <template #icon>
              <i-icon-park-solid-writing-fluently />
            </template>
          </studio-menu-item>
        </ul>
      </div>
      <div id="studio-body" class="relative z-10">

        <div
            class="h-[70px] w-full bg-white relative top-0 left-0 right-0 z-10 px-[32px] flex items-center flex-shrink-0"
        >
          <a
              id="back-button"
              class="text-base hover:text-theme-text text-theme-text flex items-center head-item text-[24px]"
              @click="$router.back()"
          >
            <i-material-symbols-arrow-back  />
          </a>

          <!-- Global Title -->
          <div v-if="$route.meta.title" class="ml-3 text-lg mr-auto head-item">
            {{
              /^\D*\.\D*$/.test($route.meta.title)
                  ? $route.meta.title
                  : $route.meta.title
            }}
          </div>
          <div
              v-show="!$route.meta.title"
              id="studio-title"
              class="ml-3 text-lg mr-auto empty:hidden head-item"
          ></div>

          <div id="studio-actions" class="flex items-center empty:hidden ml-auto"></div>

        </div>

        <div class="w-full h-full px-[30px] pt-[30px]">

          <div class="px-[30px] pt-[30px] w-full h-full bg-white">
            <div id="scroller" class="scrollbar-hide overflow-y-auto">
              <router-view />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>

#scroller {
  height: calc(100vh - 70px - 30px - 30px);
}

#studio-layout {
  @apply w-full h-screen bg-primary-100 flex-shrink-0;
}

#studio-body {
  @apply w-full h-screen flex flex-col;
}

.home-link {
  font-family: 'Dancing Script', cursive;
}

#studio-layout {
  font-family: "Avenir Next", Roboto, "Segoe UI", "Open Sans", "Helvetica Neue", "PingFang SC", "Songti SC", "Heiti SC", "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: "tnum", "tnum";
}
</style>
