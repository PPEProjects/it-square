<template>
  <div id='site-header'>

    <div class='px-4 flex items-center max-w-bootstrap mx-auto h-full'>
      <div class='header-logo flex-shrink-0 mr-3'>
        <router-link to='/' title='' class='logo'>
          <img
            class='w-full h-full object-cover mr-4'
            src='/images/logo.png'
            alt=''
          >
        </router-link>
      </div>

      <div class='menu-list h-full flex items-center flex-shrink-0 text-gray-500'>
        <div class='menu-item _has_sub'>
          <button class='flex items-center'>
            <i-ri-compass-3-fill class='text-[23px]' />
            <h5 class='mb-0 text-current font-semibold ml-2 text-[15px]'>
              Technology
            </h5>
          </button>

          <!-- Menu -->
          <sub-menu />

        </div>

        <div class='menu-item'>
          <button class='flex items-center'>
            <i-bx-bxs-category-alt class='text-[23px]' />
            <h5 class='mb-0 text-current font-semibold ml-2 text-[15px]'>Category</h5>
          </button>
        </div>

        <div class='menu-item'>
          <button class='flex items-center'>
            <i-mdi-pencil-circle class='text-[23px]' />
            <h5 class='mb-0 text-current font-semibold ml-2 text-[15px]'>Studio</h5>
          </button>
        </div>

      </div>

      <div class='w-full flex justify-end h-full py-3.5 pr-3'>
        <form class='w-[280px] h-full' action='/search'>
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

        <button class='ml-6'>
          <i-ic-sharp-settings class='text-[20px]' />
        </button>
      </div>

      <div class='header-user flex-shrink-0'>
        <a-badge dot>
          <a-avatar size="large" src="/images/avatar.jpeg"></a-avatar>
        </a-badge>
      </div>
    </div>

  </div>

  <div class='h-[70px]'></div>
</template>

<script>
export default {
  name: 'SiteHeader'
}
</script>

<style scoped>
#site-header {
  @apply h-[70px] border-b fixed top-0 right-0 left-0
}
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
  @apply transition translate-x-[-40px] opacity-0 invisible;
}

.menu-item._has_sub:hover .sub-menu {
  @apply translate-x-[-10px] opacity-100 visible;
}
</style>
