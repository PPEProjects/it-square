<template>
  <block-session title="Done Project">

    <ul>
      <li
          v-for="(project, index) in projects"
          :key="index"
          class="mb-5 last:mb-0"
      >
        <div class="cutsom-shadow rounded-lg flex overflow-hidden items-center">

          <div class="pl-6 py-5">
            <a
                href="javascript:void(0)"
                class="block w-[35px] aspect-1 overflow-hidden flex-shrink-0"
            >
              <img class="w-full h-full object-contain" :src="project.logo" alt=""/>
            </a>
          </div>

          <div class="px-6 py-5 flex flex-col">
            <h2 class="text-[15px] font-semibold text-gray-700 mb-0">{{ project.name }}</h2>

            <div class="mt-1 flex items-center">
              <a :href="project.link" target="_blank" class="flex items-center">
                <span>
                  <i-ph-link-simple-fill/>
                </span>
                <span class="ml-1">{{ project.link }}</span>
              </a>

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

          </div>

          <div class="ml-2 px-6 py-5 flex flex-col">
            <h2 class="text-[13px] font-semibold text-gray-700 mb-0">Bắt Đầu</h2>

            <div class="mt-1 flex items-center text-gray-500 text-xs">
              <div class="flex items-center">
                <span>
                  <i-mdi-clock-outline />
                </span>
                <span class="ml-1">12/08/2022</span>
              </div>
            </div>

          </div>

          <div class="ml-2 px-6 py-5 flex flex-col">
            <h2 class="text-[13px] font-semibold text-gray-700 mb-0">Kết Thúc</h2>

            <div class="mt-1 flex items-center text-gray-500 text-xs">
              <div class="flex items-center">
                <span>
                  <i-ant-design-flag-outlined />
                </span>
                <span class="ml-1">05/08/2022</span>
              </div>
            </div>

          </div>


          <div
              class="relative h-[35px] ml-auto mr-6"
              :style='{
                width: `${4 * 20}px`,
              }'
          >
            <button
                v-for="index4 in 3"
                :key="index4"
                class="absolute top-0 left-0 h-full w-[35px] overflow-hidden rounded-full border-2 border-white"
                :style="{
                  transform: 'translateX(' + (index4 - 1) * 20 + 'px)',
                  zIndex: index4
                }"
            >
              <img
                  class="h-full w-full transform object-cover transition hover:scale-105"
                  src="/images/avatar.jpeg"
                  alt=""
              />
            </button>
          </div>

          <button class="flex items-center mr-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-2 rounded-full shadow-lg shadow-primary-200">
            <span class="text-xs font-semibold mr-1">Đánh Giá</span>
            <i-material-symbols-arrow-circle-right />
          </button>

        </div>
      </li>
    </ul>

  </block-session>
</template>

<script lang="ts" setup>

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

</script>
