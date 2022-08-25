<template>
  <block-session title="Running Project">
    <grid-layout
      v-model:layout="layout"
      class='mx-[-10px]'
      :responsive-layouts="layout"
      :cols="cols"
      :col-num="24"
      :row-height="30"
      :vertical-compact="true"
      :use-css-transforms="true"
      :responsive="true"
      :is-draggable="false"
      :is-resizable="false"
    >
      <grid-item
        v-for="(item, index) in layout"
        :key="index"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <component :is='templates[item.component]'></component>
      </grid-item>
    </grid-layout>
  </block-session>
</template>

<script lang="ts" setup>

const templates = shallowRef<Record<string, ReturnType<typeof defineComponent>>>({})
const allowedTemplate = ['RunningVertical', 'RunningHorizontal']
const loadTemplate = () => {
  allowedTemplate.forEach(layout => {
    templates.value[layout] = defineAsyncComponent(() => import(`../template/running/${layout}.vue`))
  })
}

interface GridItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  component: typeof allowedTemplate[number]
}

const cols = { lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }

const layout = shallowRef<GridItem[]>([
  { x: 0, y: 0, w: 5, h: 10, i: '0', component: 'RunningVertical' },
  { x: 5, y: 0, w: 6, h: 5, i: '1', component: 'RunningHorizontal' },
  { x: 12, y: 0, w: 9, h: 5, i: '2', component: 'RunningHorizontal' },
  { x: 5, y: 5, w: 10, h: 5, i: '3', component: 'RunningHorizontal' },
  { x: 15, y: 5, w: 5, h: 10, i: '4', component: 'RunningVertical' },
  { x: 0, y: 10, w: 8, h: 5, i: '5', component: 'RunningHorizontal' },
  { x: 8, y: 10, w: 7, h: 5, i: '6', component: 'RunningHorizontal' },
])

loadTemplate()
</script>

<style scoped></style>
