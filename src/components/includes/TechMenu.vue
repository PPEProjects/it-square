<template>

  <div class='menu-item _has_sub'>
    <button class='flex items-center'>
      <i-ri-compass-3-fill class='text-[23px]' />
      <h5 class='mb-0 text-current font-semibold ml-2 text-[15px]'>
        Technology
      </h5>
    </button>

    <div class='absolute sub-menu w-[580px] h-[312px] top-full z-20'>
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
