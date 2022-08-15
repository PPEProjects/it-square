<template>
  <div
    :id="String($route.name) || ''"
    class="text-gray-600 min-h-screen"
  >
    <site-header />
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
