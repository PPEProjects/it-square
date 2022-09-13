<template>
  <div
    id="spotlight"
    class="fixed top-0 left-0 w-full h-full z-[100000] flex justify-center transition"
    :class="[ appStore.openSpotlight ? '' : 'invisible opacity-0' ]"
    @keyup.esc="editSpotlight()"
  >
    <div
        ref="target"
        class="max-w-[580px] w-full mx-3 pb-3 bg-white h-fit mt-[30vh] rounded-md shadow-lg overflow-hidden transition delay-100 duration-300 ease-in-out"
        :class="{
            'invisible scale-95 opacity-0': !appStore.openSpotlight
        }"
    >
      <form>
        <div class="flex items-center px-4 pb-3.5 pt-4 bg-gray-100">
          <i-lucide-search class="text-[19px] flex-shrink-0" />
          <input
              ref="inputRef"
              v-model="keyword"
              class="w-full ml-3 focus:outline-0 bg-transparent text-[17px]"
              type="text"
              placeholder="Nhập từ khoá..."
          />
          <span
              class="bg-gray-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md cursor-pointer"
              @click="editSpotlight"
          >ESC</span>
        </div>
      </form>

      <div class="px-4 py-4">
        <h4 class="text-[16px] capitalize text-gray-700 font-semibold mb-0">Dự án nổi bật</h4>
        <ul class="mt-3 mb-0">
          <li
              v-for="(project, index) in projects"
              :key="index"
              class="mb-4 last:mb-0"
          >
            <div class="flex overflow-hidden items-center">

              <a
                  href="javascript:void(0)"
                  class="block w-[30px] aspect-1 overflow-hidden flex-shrink-0"
              >
                <img class="w-full h-full object-contain" :src="project.logo" alt=""/>
              </a>

              <h2 class="text-[15px] font-semibold text-gray-700 mb-0 ml-4">{{ project.name }}</h2>

              <span class="h-[15px] w-px bg-gray-200 block mx-3"></span>

              <div class="flex items-center text-xs text-gray-500">
                <span>
                  <i-iconoir-chat-bubble/>
                </span>
                <span class="ml-1 relative mt-0.5">
                  {{ project.comment }} bình luận
                </span>
              </div>

              <span class="h-[15px] w-px bg-gray-200 block mx-3"></span>

              <div class="flex items-center text-xs text-gray-500">
                <span>
                  <i-octicon-issue-draft-16/>
                </span>
                <span class="ml-1 relative mt-0.5">
                  {{ project.issues }} issues
                </span>
              </div>

            </div>
          </li>
        </ul>
      </div>

      <p class="text-xs mb-0 px-4 text-gray-500">
        Tìm kiếm dự án, công việc, và hơn thế nữa...
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const appStore = useAppStore()

const keyword = ref('')
const target = ref<HTMLDivElement>()

const inputRef = ref<HTMLInputElement>()
watch(() => appStore.openSpotlight, (val, oldValue) => {
  if (val && !oldValue) {
    nextTick(() => {
      setTimeout(() => {
        inputRef.value?.focus()
      }, 300)
    })
  }
})

const editSpotlight = () => {
  appStore.openSpotlight = false
}

onClickOutside(target, editSpotlight)


interface DoneProject {
  id: string
  time: string
  name: string
  comment: number
  link: string
  issues: number
  logo: string
}

const projects = ref<DoneProject[]>([
  {
    id: '1',
    time: '30 ngày',
    name: 'Auto Green Home',
    comment: 30,
    link: 'https://shopee.vn/',
    issues: 50,
    logo: '/images/done/dribbble.png'
  },
  {
    id: '2',
    time: '40 ngày',
    name: 'Auto Crawl Data',
    comment: 20,
    link: 'https://kdnautoleech.com/',
    issues: 120,
    logo: '/images/done/kdn.png'
  }
])

const timer = ref(0)
const block = ref<boolean>(false)

const { shift } = useMagicKeys()

watch(shift, (val) => {
  if (!val) {
    return
  }
  if(block.value) {
    return
  }

  if (Date.now() - timer.value < 500) {
    block.value = true

    appStore.openSpotlight = !appStore.openSpotlight

    block.value = true

    setTimeout(() => {
      block.value = false
    }, 300)

  }

  timer.value = Date.now()
})


</script>

<style lang="scss">
#spotlight {
  background-color: rgb(15 23 42 / 16%)
}

.line-border {
  @apply border-b border-gray-700;
}
</style>
