<template>
  <block-session title='OnBoard' description='Projects that allow registration to participate.'>
    <div
      class='flex flex-wrap -mx-3 -mb-7'
    >

      <div
        v-for='index in 8'
        :key='index'
        class='w-1/4 px-3 pb-7'
      >
        <project-item />
      </div>

    </div>
  </block-session>
</template>

<script lang='ts' setup></script>
