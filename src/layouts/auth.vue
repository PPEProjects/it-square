<template>
  <div id='auth-layout'>
    <div class='auth-block form-wrapper'>

      <div class='form-content flex flex-col items-center justify-center'>
        <div class='logo-block'>
          <router-link to='/' title='' class='logo-link'>
            <img
              class='w-full h-full object-cover'
              src='/svg/logo.svg'
              alt=''
            >
          </router-link>
          <h2>{{ $route.meta.title }}</h2>
        </div>

        <div class='w-full'>
          <router-view />
        </div>

      </div>

    </div>
    <div class='auth-block relative overflow-hidden'>
      <img
        v-motion
        class='absolute w-full h-full object-cover top-0 left-0 transition transform hover:scale-105 z-10'
        src='/images/auth-bg.png'
        alt=''
        :initial="{
          opacity: 0,
          scale: 1.1,
        }"
        :enter="{
          opacity: 1,
          scale: 1,
        }"
      />
      <div
        class='description'
      >
      <p
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
        }"
      >PROJECT DESCRIPTION</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
export default defineComponent({
  name: 'AuthLayout',
})
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
  @apply absolute max-w-md mx-5 absolute top-1/2 left-1/2 transition -translate-x-1/2 -translate-y-1/2 z-20 text-white text-[50px] font-semibold text-center
}

.description {
  font-family: auth-description, serif;
}

.form-wrapper {
  @apply relative
}

.form-content {
  @apply relative max-w-[400px] mx-auto px-4 h-full
}

.logo-block {
  @apply flex items-center justify-center mb-[40px]
}

.logo-block h2 {
  @apply text-xl font-semibold ml-[28px]
}

.logo-link {
  @apply w-[74px] h-auto block
}
</style>
