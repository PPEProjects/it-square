<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700 mb-0">
      Thành Viên
      <span class="text-[14px] text-gray-500">({{ members.length }})</span>
    </h3>

    <ul class="mt-3">
      <li
        v-for="member in members"
        :key="member.id"
        class="flex items-center mb-4 last:mb-0"
        @click="$emitter.emit('requiredGrantModal')"
      >
        <div>
          <div class="w-14 h-14 rounded-full overflow-hidden cutsom-shadow border-[3px] border-white">
            <img class="w-full h-full object-cover" :src="member.avatar" alt="" />
          </div>
        </div>

        <div class="ml-3">
          <h4 class="font-semibold text-gray-700 mb-0.5 text-[15px]">{{ member.name }}</h4>
          <span
              class="text-[13px] text-gray-500 mb-0 capitalize mt-1 role"
              :class="[member.role]"
          >{{ member.role }}</span>
        </div>

      </li>

<!--      <li>-->
<!--        <div class="flex items-center">-->
<!--          <span class="text-primary-500 text-[14px] font-semibold mr-4">Còn trống 2 vị trí.</span>-->

<!--          <button-->
<!--              class="flex items-center mr-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-2 rounded-full shadow-lg shadow-primary-200"-->
<!--              @click="$emitter.emit('requiredGrantModal')"-->
<!--          >-->
<!--            <span class="text-xs font-semibold mr-1">Tham Gia</span>-->
<!--            <i-material-symbols-add-circle-rounded/>-->
<!--          </button>-->

<!--        </div>-->
<!--      </li>-->

    </ul>

    <div class='flex flex-wrap mt-4 -mx-1.5 -mb-1.5'>
      <button
          v-for='(role, index2) in showRoles'
          :key='index2'
          class='w-2/12 px-1.5 pb-1.5 text-center transition hover:scale-105'
          @click.prevent.stop="$emitter.emit('requiredGrantModal')"
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
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

interface Member {
  id: string
  name: string
  avatar: string
  role: string
}

const members = ref<Member[]>([
  {
    id: '1',
    name: 'Đinh Thị Đông Phương',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Anh Tiến',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'leader',
  },
  {
    id: '3',
    name: 'Văn Chiến',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'tester',
  },
  {
    id: '4',
    name: 'Nam',
    avatar: 'https://i.pravatar.cc/150?img=4',
    role: 'developer',
  },
  {
    id: '5',
    name: 'Yuan',
    avatar: '/images/avatar.jpeg',
    role: 'developer',
  }
])

const roles = ref<string[]>(['Leader', 'MO', 'Des'].concat(Array(9).fill('Dev')))

const showRoles = computed(() => {
  if(roles.value.length > 6) {
    return roles.value.slice(0, 5)
  }
  return roles.value
})


</script>

<style scoped>
.role.admin, .role.leader {
  @apply bg-gray-100 w-auto px-2 py-0.5 rounded-full text-white text-[12px] selection:bg-transparent;
}
.role.admin {
  @apply bg-primary-500;
}
.role.leader {
  @apply bg-indigo-500;
}
</style>
