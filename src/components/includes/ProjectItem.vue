<template>
  <div class='rounded-lg overflow-hidden bg-white shadow-md project-item'>
    <div class='w-full aspect-w-3 aspect-h-2 overflow-hidden relative project-avatar'>
      <div class='absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent via-transparent to-slate-900 z-20'>
        <div class='relative w-full h-full'>
          <div class='flex justify-around text-white absolute bottom-3 left-0 right-0'>

            <button class='flex items-center'>
              <i-ant-design-like-filled />
              <span class='mb-0 text-xs relative top-0.5 ml-1'>20</span>
            </button>

            <button class='flex items-center'>
              <i-ion-chatbubble-ellipses />
              <span class='mb-0 text-xs relative top-0.5 ml-1'>20</span>
            </button>

            <button class='flex items-center'>
              <i-ion-heart />
              <span class='mb-0 text-xs relative top-0.5 ml-1'>20</span>
            </button>

            <button class='flex items-center'>
              <i-material-symbols-share />
            </button>

          </div>
          <button class='absolute top-3 right-2 text-white opacity-0 transition more-button'>
            <i-mdi-dots-vertical />
          </button>

          <button class='absolute top-3 left-2 text-white opacity-0 transition scale-0 like-button text-xl'>
            <i-material-symbols-bookmark-add-rounded />
          </button>

        </div>
      </div>
      <img class='transition hover:scale-105 absolute w-full h-full z-10 top-0 left-0' :src='project.avatar' alt='' />
    </div>
    <div class='px-3 py-4'>

      <div class='flex items-center'>
        <a-avatar :src='project.user.avatar' class='flex-shrink-0 border border-white shadow-md' />
        <h4 class='mx-3 font-semibold w-full mb-0'>{{ project.name }}</h4>
      </div>

      <div class='flex flex-wrap mt-4 -mx-1.5 -mb-1.5'>
        <button
          v-for='(role, index2) in showRoles'
          :key='index2'
          class='w-2/12 px-1.5 pb-1.5 text-center transition hover:scale-105'
        >
          <div class='w-full aspect-1 rounded-full border border-dashed flex items-center justify-center text-gray-400'>
            <i-material-symbols-add  />
          </div>
          <h4 class='text-[10px] mt-0.5'>{{ role }}</h4>
        </button>

        <button
          v-if='roles.length > 6'
          class='w-2/12 px-1.5 pb-1.5 text-center transition hover:scale-105'
        >
          <div class='w-full aspect-1 rounded-full border border-dashed flex items-center justify-center text-white bg-primary-600'>
            <span>+<span class='text-[12px]'>{{ roles.length - 5 }}</span></span>
          </div>
          <h4 class='text-[10px] mt-0.5 opacity-0'>x</h4>
        </button>

      </div>

      <div class='mt-1.5 flex items-center justify-between'>
        <button class='text-white bg-green-500 text-xs px-2 py-0.5 rounded-lg'>6/12 Members</button>

        <span class='text-xs text-gray-500'>Opening</span>

      </div>

    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'

const project = ref({
  name: 'Kẻ Theo Đuổi Ánh Sánh',
  avatar: '/images/project1.png',
  user: {
    name: 'Yuan',
    avatar: '/images/avatar.jpeg',
  }
})

const roles = ref<string[]>(['Leader', 'MO', 'Des'].concat(Array(9).fill('Dev')))

const showRoles = computed(() => {
  if(roles.value.length > 6) {
    return roles.value.slice(0, 5)
  }
  return roles.value
})
</script>

<style scoped lang='scss'>
.project-item {
  &:hover {
    .more-button {
      opacity: 1;
    }
    .like-button {
      @apply scale-100 opacity-100;
    }
  }
}
</style>
