<template>
  <div
    class="text-gray-600 min-h-screen"
  >
    <site-header />
    <div
      :id="String($route.name) || ''"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
