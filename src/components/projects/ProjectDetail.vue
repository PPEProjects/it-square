<template>
  <div>
    <div class="flex items-center text-green-500">
      <i-material-symbols-verified />
      <span class="text-[13px] font-medium ml-1">100% Vốn nước ngoài</span>
    </div>

    <h4 class="text-[26px] font-semibold capitalize mt-1 mb-0">
      Development Strategy and Core Value of VPBank
    </h4>

    <div class="mt-3">

      <ul class="flex">

        <li
            class="mr-4"
        >
          <a class="text-rose-500">#Mobile App</a>
        </li>

        <li
            v-for="(item, index) in frameworks"
            :key="index"
            class="mr-4"
        >
          <a>#{{ item }}</a>
        </li>
      </ul>

    </div>

    <article class="prose mt-3 text-gray-500">
      <p>
        For years parents have espoused the health benefits of eating garlic bread with cheese to their
        children, with the food earning such an iconic status in our culture that kids will often dress
        up as warm, cheesy loaf for Halloween.
      </p>
      <p>
        But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
        springing up around the country.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur autem consectetur, debitis deleniti dolores ducimus eum fugiat illo, iste maiores maxime officiis quae quod ratione recusandae similique tempora totam.
      </p>
    </article>
    <div class="flex mt-5">
      <div class="text-gray-500 bg-gray-100 rounded-lg flex items-center">
        <button class="flex items-center px-3 py-1.5">
          <i-mdi-document class="text-[16px]" />
          <span class="text-[12px] ml-1">30 Tệp Đính Kèm</span>
        </button>
        <span class="h-full w-px bg-gray-200 mx-1"></span>
        <button class="flex items-center px-3 py-1.5">
          <i-ic-baseline-remove-red-eye class="text-[16px]" />
          <span class="text-[12px] ml-1">34350 Lượt Xem</span>
        </button>
      </div>
    </div>

    <div class="mt-6 flex items-center">
      <button class="flex items-center bg-gradient-to-r from-primary-500 to-primary-700 text-white px-4 py-2 rounded-full shadow-lg shadow-primary-200">
        <i-material-symbols-add />
        <span class="font-semibold ml-1">Tham Gia Ngay</span>
      </button>

      <a class="text-[14px] ml-5 font-semibold">Lưu Lại</a>

    </div>

  </div>
</template>

<script lang="ts" setup>
const frameworks = ref<string[]>(['Vue', 'React', 'Angular', 'Svelte', 'Nuxt', 'Next', 'PHP', 'Laravel'])
</script>

<style scoped>

</style>
