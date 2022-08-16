<template>
  <block-session title='OnBoard' description='Projects that allow registration to participate.'>
    <div
      class='flex flex-wrap -mx-3'
    >

      <div
        v-for='index in 8'
        :key='index'
        class='w-1/4 px-3 pb-7'
      >
        <div class='rounded-lg overflow-hidden bg-white shadow-md'>
          <div class='w-full aspect-w-3 aspect-h-2 overflow-hidden'>
            <img class='transition hover:scale-105' :src='project.avatar' alt='' />
          </div>
          <div class='px-3 py-4'>

            <div class='flex items-center'>
              <a-avatar :src='project.user.avatar' class='flex-shrink-0 border border-white shadow-md' />
              <h4 class='mx-3 font-semibold w-full mb-0'>{{ project.name }}</h4>

              <button class='-mr-2'>
                <i-mdi-dots-vertical />
              </button>
            </div>

            <div class='flex justify-around mt-2 text-gray-500'>

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

            <div class='flex flex-wrap mt-4 -mx-1.5 -mb-2'>
              <div
                v-for='(role, index2) in roles'
                :key='index2'
                class='w-2/12 px-1.5 pb-2 text-center'
              >
                <div class='w-full aspect-1 rounded-full border border-dashed flex items-center justify-center text-gray-400'>
                  <i-material-symbols-add  />
                </div>
                <h4 class='text-[10px] mt-0.5'>{{ role }}</h4>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </block-session>
</template>

<script lang='ts' setup>

const project = ref({
  name: 'Kẻ Theo Đuổi Ánh Sánh',
  avatar: '/images/project1.png',
  user: {
    name: 'Yuan',
    avatar: '/images/avatar.jpeg',
  }
})

const roles = ref(['Leader', 'MO', 'Des'].concat(Array(9).fill('Dev')))

</script>
