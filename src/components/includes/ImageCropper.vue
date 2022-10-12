<template>
  <vue-cropper
    :key="src"
    ref="cropperRef"
    class="crop-image-tool"
    output-type="jpg"
    :src="src"
    v-bind="options"
  />

  <div class="mx-auto mt-5 flex w-[250px] items-center justify-around">
    <button
      class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500"
      @click="cropperRef.rotate(-90)"
    >
      <i-ic-baseline-rotate-left class="text-current" />
    </button>

    <button
      class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500"
      @click="cropperRef.relativeZoom(-0.2)"
    >
      <i-ri-zoom-out-line class="text-current" />
    </button>

    <button
      class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500"
      @click="cropperRef.relativeZoom(0.2)"
    >
      <i-ri-zoom-in-line class="text-current" />
    </button>

    <button
      class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500"
      @click="cropperRef.rotate(90)"
    >
      <i-ic-baseline-rotate-right class="text-current" />

    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VueCropperMethods } from 'vue-cropperjs'
import { message } from 'ant-design-vue'

// Crop options mặc định của image
const _configDefault = {
  autoCropArea: 1,
  cropBoxResizable: false,
  toggleDragModeOnDblclick: false,
  dragMode: 'move',
  viewMode: 1,
  cropBoxMovable: false
}

export default defineComponent({
  name: 'ImageCropper',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    cropSrc: {
      type: String,
      default: ''
    },
    endpoint: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const src = ref<string>(props.cropSrc)
    const configData = reactive(props.config)

    return {
      src,
      configData
    }
  },
  computed: {
    cropperRef(): VueCropperMethods {
      return this.$refs.cropperRef as VueCropperMethods
    },

    // Merge config mặc định và config của image
    options() {
      return Object.assign({}, this.configData, _configDefault)
    }
  },

  methods: {
    buildCropper(file: File) {
      // avoid memory leaks
      if (this.src) {
        URL.revokeObjectURL(this.src)
      }
      this.src = URL.createObjectURL(file)
    },

    /**
     * Cắt hình ảnh
     * @param callback
     * @link https://github.com/fengyuanchen/cropperjs
     */
    cropImage(callback: (image: Blob | any) => Promise<void>) {
      this.cropperRef.getCroppedCanvas().toBlob((data) => {
        callback(data)
      })
    },

    /**
     * Upload hình ành lên bunny
     * Sử dụng server proxy để upload hình ảnh lên bunny
     * @param image
     */
    async uploadCrop(image: Blob) {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('endpoint', this.endpoint)
      try {
        const res = await this.$axios.post('/geto/upload/single', formData)
        message.success('Upload hình ảnh thành công')
        return res?.file
      } catch (e) {
        message.error('')
      }
    },

    changeConfig(config: { [key: string]: any }) {
      Object.assign(this.configData, config)
    }
  }
})
</script>
