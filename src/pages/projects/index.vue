<template>
  <div class="py-5">

    <div>
      <ul class="text-gray-500 opacity-90">
        <li class="flex items-center">
          <span class="flex items-center">
            <i-ion-md-home />
          </span>
          <span class="mx-1.5">/</span>
          <span>Green Home</span>
        </li>
      </ul>
    </div>

    <div class="flex mt-3 -mx-4">
      <div class="w-4/5 px-4">
        <projects-banners />
        <project-detail class="mt-6" />

        <project-progress class="mt-7" />

<!--        <project-budget class="mt-6" />-->

        <project-comments class="mt-8" />

      </div>
      <div class="w-1/3 min-h-screen px-4">
        <project-members />
        <project-other class="mt-6" />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup></script>

<style scoped>

</style>
