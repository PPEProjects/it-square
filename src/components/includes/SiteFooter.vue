<template>
  <footer class="py-10 bg-slate-900">
    <div class="max-w-bootstrap mx-auto text-gray-100">

      <div class="flex">
        <div class="w-[300px] flex-shrink-0 flex flex-col">
          <h1 class="text-current font-semibold text-[45px] mb-0">IT Square</h1>
          <sub class="text-gray-400 mt-0.5 opacity-50 font-light">Learning with practice</sub>

          <div class="logo-icon mt-auto">
            <button>
              <i-ri-instagram-fill />
            </button>
            <button>
              <i-ic-baseline-tiktok />
            </button>
            <button>
              <i-mdi-twitter />
            </button>
            <button>
              <i-uil-facebook-f />
            </button>
            <button class="transform scale-150 ml-1">
              <i-simple-icons-zalo />
            </button>
          </div>

          <h4 class="text-gray-400 text-xs font-light mt-4">
            © 2022 IT Square
          </h4>

        </div>

        <div class="w-full flex">

          <div
              v-for="(menu, index) in menus"
              :key="index"
              class="w-1/3"
          >
            <h2 class="text-white opacity-90">{{ menu.name }}</h2>

            <ul class="mt-6">
              <li
                  v-for="(child, index2) in menu.child"
                  :key="index2"
              >
                <h3 class="text-gray-400 font-light">{{ child }}</h3>
              </li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  </footer>
</template>

<script lang="ts" setup>
const menus = ref<{
  name: string,
  child: string[]
}[]>([
  {
    name: 'TEAMS',
    child: [
        'About Us',
        'Design',
        'Github'
    ]
  },
  {
    name: 'CONTACTS',
    child: [
        'Big Boss',
        'Teach Leader',
        'Designer',
        'Online Services',
        'Seller'
    ]
  },
  {
    name: 'RESOURCES',
    child: [
        'Dowload Apps',
        'Help Center',
        'Terms of Service',
        'Privacy Policy'
    ]
  },
  {
    name: 'REFERRALS',
    child: [
        'Japans',
        'Green Home'
    ]
  }
])
</script>

<style scoped lang="scss">
h1 {
  font-family: 'Dancing Script', cursive;
}

.logo-icon {
  > button {
    @apply text-[17px] text-gray-400 mr-2
  }
}
</style>
