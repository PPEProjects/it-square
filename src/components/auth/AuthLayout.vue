<template>
  <div id='auth-layout'>
    <div class='auth-block form-wrapper'>

      <div class='form-content'>
        <div class='logo-block'>
          <router-link to='/' title='' class='logo-link'>
            <img class='w-full h-full object-cover' src='/svg/logo.svg' alt=''>
          </router-link>
          <h2>{{ title }}</h2>
        </div>
      </div>

      <div class='action'>
        <slot name='footer'></slot>
      </div>

    </div>
    <div class='auth-block relative overflow-hidden'>
      <img class='absolute w-full h-full object-cover top-0 left-0 transition transform hover:scale-105 z-10' :src='image' alt='' />
      <p
        class='description'
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang='ts' setup>
defineProps<{
  image: string
  title: string
  description: string
}>()
</script>

<style scoped>
@font-face {
  font-family: auth-description;
  src: url(/fonts/post-no-bills/postnobillscolombo-bold.ttf) format('ttf'),
    url(/fonts/post-no-bills/postnobillscolombo-light.ttf) format('ttf'),
    url(/fonts/post-no-bills/postnobillscolombo-medium.ttf) format('ttf'),
    url(/fonts/post-no-bills/postnobillscolombo-regular.ttf) format('ttf'),
    url(/fonts/post-no-bills/postnobillscolombo-semibold.ttf) format('ttf'),
    url(/fonts/post-no-bills/postnobillscolombo-extrabold.ttf) format('ttf');
}

#auth-layout {
  @apply w-full min-h-screen flex flex-wrap
}
.auth-block {
  @apply w-1/2 flex-shrink-0
}
.description {
  @apply absolute max-w-md mx-5 absolute top-1/2 left-1/2 transition -translate-x-1/2 -translate-y-1/2 z-20 text-white text-[50px] font-semibold
}

.description {
  font-family: auth-description, serif;
}

.form-wrapper {
  @apply relative
}

.action {
  @apply absolute bottom-[32px] left-0 right-0 text-center
}

.form-content {
  @apply relative top-[144px] max-w-md mx-auto px-4
}

.logo-block {
  @apply flex items-center justify-center
}

.logo-block h2 {
  @apply text-xl font-semibold ml-[28px]
}

.logo-link {
  @apply w-[84px] h-[64px] block
}
</style>
