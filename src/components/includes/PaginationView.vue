<template>
  <ul>
    <li>
      <a :class="[currentPage === 1 ? 'disabled' : '']" @click="prev">
        <i-ic-baseline-keyboard-arrow-left />
      </a>
    </li>

    <li v-for="item in pageCount" :key="item" class="page-number">
      <a
        :class="{
          active: item === currentPage
        }"
        @click="currentPage = item"
        >{{ item }}</a
      >
    </li>

    <li>
      <a :class="[currentPage === pageCount ? 'disabled' : '']" @click="next">
        <i-ic-baseline-keyboard-arrow-right />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const { currentPage, pageCount, prev, next } = useOffsetPagination({
  total: 70,
  page: 1,
  pageSize: 10
})
</script>

<style scoped lang="scss">
$base-spacing: 0.4rem;

ul {
  @apply flex items-center;
  margin-left: -$base-spacing;
  margin-right: -$base-spacing;
  margin-bottom: 0;

  li {
    @apply flex items-center;
    margin: 0 $base-spacing;

    a {
      @apply flex h-8 w-8 items-center justify-center rounded-full text-gray-400;
      &:hover {
        @apply bg-primary-500 text-white;
      }

      &.active {
        @apply bg-primary-500 text-white;
      }

      &.disabled {
        @apply pointer-events-none text-gray-200;
      }
    }
    &.page-number {
      @apply relative;
    }
  }
}
</style>
