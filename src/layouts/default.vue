<template>
  <div
    class="text-gray-600 min-h-screen"
  >
    <site-header />
    <div
      :id="String($route.name) || ''"
      class='max-w-bootstrap w-full mx-auto px-4 min-h-[52vh]'
    >
      <router-view v-slot="{ Component }">
        <transition key="transition-layout" name="page-layout" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <site-footer />
  </div>
</template>

<script lang="ts" setup></script>

<style>
.page-layout-enter-active,
.page-layout-leave-active {
  transition: all 0.5s;
}
.page-layout-enter,
.page-layout-leave-active {
  opacity: 0;
}
.page-layout-enter {
  transform: translateY(-25px);
}
.page-layout-leave-active {
  transform: translateY(+25px);
}
</style>
