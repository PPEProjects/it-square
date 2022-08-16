<template>
  <div class='absolute sub-menu w-[580px] h-[312px] top-full'>
    <div
      class='sub-menu-content'
      @mouseleave='activeParent = parents[0]'
    >
      <div class='relative flex w-full h-full rounded-lg overflow-hidden'>
        <div class='h-full bg-zinc-900 w-[120px] py-1 flex-shrink-0'>
          <ul class='parents'>
            <li
              v-for='parent in parents'
              :key='parent'
              :class='{
            active: activeParent === parent,
          }'
              @mouseenter='activeParent = parent'
            >
              <a>
                {{ parent }}
              </a>
            </li>
          </ul>
        </div>
        <div class='dynamic-menu-content w-full h-full bg-zinc-800 relative overflow-hidden'>

          <ul
            v-for='([name, group], index) in Object.entries(languages)'
            :key='index'
            :data-name='name'
            class='langs-group'
            :class='{
             active: activeParent.toLowerCase() === name.toLowerCase(),
          }'
          >
            <li
              v-for='lang in group'
              :key='lang'
              class='w-1/3'
            >
              <a>{{ lang }}</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
const parents = ref<string[]>(['Backend', 'Frontend', 'Mobile'])
const activeParent = ref<string>('Backend')

const languages = ref<Record<string, string[]>>({
  backend: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'C#', 'C++', 'Go', 'Ruby', 'Rust', 'Objective-C', 'MongoDB', 'Java'],
  frontend: ['React', 'Vue', 'Angular', 'Svelte', 'Jquery', 'Vanali'],
  mobile: ['Android', 'iOS', 'Flutter', 'React Native', 'Swift', 'Kotlin'],
})
</script>

<style scoped>
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
</style>
