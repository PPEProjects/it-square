<template>
  <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="true"
      :action="import.meta.env.VITE_STORAGE_SERVER_URL"
      @change="handleChange"
  >
    <p class="ant-upload-drag-icon flex justify-center text-[30px]">
      <i-ic-sharp-cloud-upload />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">Support for a single or bulk upload.</p>
  </a-upload-dragger>
</template>
<script lang="ts" setup>
// import { InboxOutlined } from '@ant-design/icons-vue';
// import { message } from 'ant-design-vue';
// import { defineComponent, ref } from 'vue';
import type { UploadChangeParam } from 'ant-design-vue';

// export default defineComponent({
//   components: {
//     InboxOutlined,
//   },
//   setup() {
    const handleChange = (info: UploadChangeParam) => {
      console.log('info', {info})
      // const status = info.file.status;
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    };
//     return {
//       handleChange,
//       fileList: ref([]),
//       handleDrop: (e: DragEvent) => {
//         console.log(e);
//       },
//     };
//   },
// });
</script>

