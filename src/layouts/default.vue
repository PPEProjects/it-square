<template>
  <div
    class="text-gray-600 min-h-screen"
  >
    <site-header />
    <div
      :id="String($route.name) || ''"
      class='max-w-bootstrap w-full mx-auto px-4 min-h-[52vh]'
    >
      <router-view />
    </div>
    <site-footer />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
