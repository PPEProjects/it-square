<template>
  <div id='site-header'>

    <div class='px-4 flex items-center max-w-bootstrap mx-auto h-full'>
      <div class='header-logo flex-shrink-0 mr-3'>
        <router-link to='/' title='' class='logo'>
          <img
            class='w-full h-full object-cover mr-4'
            src='/images/logo.svg'
            alt=''
          >
        </router-link>
      </div>


      <div class='menu-list h-full flex items-center flex-shrink-0 text-gray-500'>
        <tech-menu />

        <category-menu />

        <div class='menu-item'>
          <button class='flex items-center'>
            <i-mdi-pencil-circle class='text-[23px]' />
            <h5 class='mb-0 text-current font-semibold ml-2 text-[15px]'>Studio</h5>
          </button>
        </div>

      </div>

      <div class='w-full flex justify-end h-full py-3.5 pr-3'>
        <form class='w-[280px] h-full' action='/search' @click="app.openSpotlight = true">
          <input
            type='text'
            placeholder='Search...'
            readonly
            class='w-full rounded-full border h-full focus:outline-0 cursor-pointer pl-4 transition hover:bg-primary-50 hover:border-primary-500 hover:placeholder-primary-500'
          />
        </form>
      </div>

      <div class='flex-shrink-0 flex items-center text-gray-500 mx-6'>

        <div class='text-[15px] font-semibold'>Find Job</div>

        <div class='text-[15px] font-semibold ml-6'>Blog</div>

        <button class='ml-6' @click='$router.push("/private")'>
          <i-ic-sharp-settings class='text-[20px]' />
        </button>
      </div>

      <div class='header-user flex-shrink-0'>
        <a-badge v-if='userStore.auth' dot>
          <a-avatar size="large" src="/images/avatar.jpeg"></a-avatar>
        </a-badge>
        <button
          v-else
          class='text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-full px-4 py-2'
          @click='$router.push("/auth/signin")'
        >Đăng Nhập</button>
      </div>
    </div>

  </div>

  <div class='h-[70px]'></div>
</template>

<script lang='ts' setup>
const userStore = useUserStore()
const app = useAppStore()

</script>

<style lang="scss">
#site-header {
  @apply h-[70px] border-b fixed top-0 right-0 left-0 z-40 bg-white;
  .header-logo .logo img {
    @apply block w-[50px]
  }
  .header-user {
    @apply flex items-center flex-shrink-0
  }
  .menu-list > .menu-item {
    @apply ml-7 first:ml-0 relative
  }
  .menu-list > .menu-item > button {
    @apply hover:text-primary-500
  }

  .menu-item._has_sub .sub-menu {
    @apply transition-all ease-in-out translate-x-[-30px] opacity-0 invisible;
  }

  .menu-item._has_sub:hover .sub-menu {
    @apply translate-x-[-10px] opacity-100 visible;
  }

  .sub-menu-content {
    @apply relative;
    height: calc(100% - 15px);
    top: 15px;
  }
  .sub-menu-content {
    @apply before:absolute;
  }
  .sub-menu-content:before {
    bottom: 100%;
    left: 14px;
    border-bottom: 7px solid #18181b;
    border-left: 6px dashed transparent;
    border-right: 6px dashed transparent;
    height: 0;
    width: 0;
  }

  .parents > li > a {
    @apply relative block text-[16px] transition text-gray-300 font-medium;
    padding: 12px 16px;
  }
  .parents > li.active > a {
    @apply bg-primary-500 text-white
  }

  .langs-group {
    @apply absolute top-0 left-0 w-full transition opacity-0 scale-90 flex flex-wrap px-2 py-3 z-0
  }
  .langs-group.active {
    @apply opacity-100 scale-100 z-10
  }

  .langs-group > li {
    @apply py-1 pr-8;
  }
  .langs-group > li > a {
    @apply transition rounded-md overflow-hidden px-3 py-1 block text-gray-300 hover:bg-primary-600
  }
}
</style>
