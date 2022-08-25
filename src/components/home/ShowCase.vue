<template>
  <block-session title='Hot Show Case' description='Some finished projects on our platform'>

    <div
      v-for='in3d in 3'
      :key='in3d'
      class='flex mb-3 last:mb-0'
    >
      <ul
        class='relative h-[300px] h-[180px] flex-shrink-0'
        :style='{
          width: `${140 + (pics.length - 1) * 25}px`,
        }'
      >
        <li
          v-for='(pic, index) in pics'
          :key='pic'
          class='absolute w-[140px] h-[180px] overflow-hidden rounded-lg shadow-lg'
          :style='{
          transform: "translateX(" + (index * 25) + "px) scale(" + (1 - index * 0.1) + ")",
          zIndex: pics.length - index
        }'
        >
          <img class='w-full h-full object-cover' :src='pic' alt='' />
        </li>
      </ul>
      <div class='ml-3 w-full'>
        <h4 class='text-lg font-semibold mb-0'>Kẻ Theo Đuổi Ánh Sáng</h4>
        <div class='mt-1 text-gray-500'>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
        </div>

        <div class='flex flex-wrap mt-3'>
          <div
            v-for='(lang, index) in logos'
            :key='index'
            class='mr-3'
          >
            <img width='28' :src='lang.logo' alt='' />
          </div>
        </div>

      </div>
    </div>

  </block-session>
</template>

<script lang='ts' setup>
const pics = ref<string[]>(Array.from(Array(3).keys()).map(i => `/images/showcase/${i}.png`))

const logos = ref<{
  logo: string,
  color: string,
  name: string,
}[]>(
  ['graphql', 'docker', 'tailwind', 'vue'].map(i => ({
    logo: `/svg/${i}.svg`,
    name: i,
    color: '#' + Math.floor(Math.random()*16777215).toString(16)
  }))
)

</script>

<style scoped>

</style>
