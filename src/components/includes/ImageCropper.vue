<template>
  <vue-cropper
    :key="src"
    ref="cropperRef"
    class="crop-image-tool"
    :style="cropStyle"
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
    },
    cropHeight: {
      type: Number,
      default: 300
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
    },
    cropStyle() {
      return {
        height: `${this.cropHeight}px`
      }
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
     * @link https://github.com/fengyuanchen/cropperjs
     */
    cropImage() {
      return new Promise((resolve, reject) => {
        this.cropperRef.getCroppedCanvas().toBlob((blob) => {
          if (!blob) {
            message.error('Có lỗi xảy ra khi cắt hình ảnh')
            reject()
          }
          resolve(blob)
        }, 'image/jpeg')
      })
    },

    changeConfig(config: { [key: string]: any }) {
      Object.assign(this.configData, config)
    }
  }
})
</script>
