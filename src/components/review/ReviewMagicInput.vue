<template>
  <div id="inputReview" class="relative">

    <div class="h-[150px] w-full resize-none rounded-lg bg-gray-50 p-4 text-gray-700 focus:outline-0 text-[14px] overflow-y-auto">
      <div ref="editorRef" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import EditorJS from '@editorjs/editorjs'

const editorRef = ref<HTMLDivElement>()
const input = ref('Lorem ipsum @yuan sit amet, consectetur adipisicing elit')

const editor = ref<EditorJS>()

onMounted(() => {
  editor.value = new EditorJS({
    hideToolbar: true,
    autofocus: true,
    holder: editorRef.value,
    data: {
      "time" : 1662971711717,
      "blocks" : [
        {
          "id" : "skIdKBuHSD",
          "type" : "paragraph",
          "data" : {
            "text" : "@yuan We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy."
          }
        }
      ],
      "version" : "2.24.3"
    }
  })
})

</script>

<style scoped lang="scss">
#inputReview {
  :deep(.codex-editor__redactor) {
    padding: 0 !important;
  };
  :deep(.ce-toolbar) {
    display: none !important;
  };
  :deep(.codex-editor--narrow .codex-editor__redactor) {
    margin: 0 !important;
  }
}
</style>

