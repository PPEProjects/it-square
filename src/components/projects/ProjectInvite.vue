<template>
  <div>
    <h3 class="mb-0 flex items-center text-[26px] font-semibold">
      {{ project?.name || '--' }}
    </h3>

    <div class="mx-auto mt-5 w-[400px]">
      <textarea
        v-model="content"
        class="h-[200px] w-full rounded-lg bg-gray-100 p-4 focus:outline-0"
        placeholder="name@domain.com"
      ></textarea>

      <p class="mb-0 text-[12px] text-gray-400">
        Một cây làm chẳng nên non. 3 cây chụm lại thế là 3 cây. Mời bạn bè tham
        gia sẽ giúp bạn phát triển dự án nhanh hơn
      </p>

      <div class="mt-2 flex">
        <a class="text-[12px] text-gray-400 hover:underline">
          <span>Bỏ qua</span>
        </a>
        <a-button type="primary" class="ml-auto" @click="sendInvitions">
          <span>Mời bạn bè</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CreateProject_createProject } from '#apollo/mutations/__generated__/CreateProject'

const props = defineProps<{
  project: Omit<CreateProject_createProject, '__typename'>
}>()

const emit = defineEmits<{
  (e: 'next'): void
}>()

const content = ref('')

const sendInvitions = () => {
  const arr = content.value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(item))
  emit('next')
}
</script>

<style scoped></style>
