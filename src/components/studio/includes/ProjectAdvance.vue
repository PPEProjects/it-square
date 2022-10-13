<template>
  <div></div>
</template>

<script lang="ts" setup>
import { CreateProject_createProject } from '#apollo/mutations/__generated__/CreateProject'

const props = defineProps<{
  project: Omit<CreateProject_createProject, '__typename'>
}>()
</script>
