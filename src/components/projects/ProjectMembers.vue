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

      <li>
        <div class="flex items-center">
          <span class="text-primary-500 text-[14px] font-semibold mr-4">Còn trống 2 vị trí.</span>

          <button class="flex items-center mr-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-2 rounded-full shadow-lg shadow-primary-200">
            <span class="text-xs font-semibold mr-1">Tham Gia</span>
            <i-material-symbols-add-circle-rounded/>
          </button>

        </div>
      </li>

    </ul>

  </div>
</template>

<script lang="ts" setup>
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
