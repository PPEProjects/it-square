<template>
  <div>Hello World</div>
  <button @click='inc'>Click me</button>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

const counter = ref(0)
const inc = () => {
  counter.value++
}
</script>
