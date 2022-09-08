<template>
  <base-modal event="requiredGrantModal" title="Yêu Cầu Tham Gia">
    <div v-auto-animate>
      <div v-if="currentStep === 'input'">
        <a-form
            :model="form"
            layout="vertical"
            autocomplete="off"
            @finish="onFinish"
            @finish-failed="onFinishFailed"
        >
          <div class="mb-3 text-gray-500">
            <i-jam-triangle-danger-f
                class="relative -top-0.5 !inline text-orange-500"
            />
            Chúng tôi sẽ sử dụng thông tin của bạn trên hệ thống để gửi cho nhà
            tuyển dụng
          </div>

          <a-form-item label="Vị Trí Công Việc">
            <ul class="flex flex-wrap">
              <li
                  v-for="item in jobPositions"
                  :key="item.id"
                  class="mr-5 transform transition"
                  :class="{
                'scale-95': item.id !== form.position
              }"
                  @click.prevent="form.position = item.id"
              >
                <label
                    class="flex cursor-pointer items-center rounded-lg border-[2px] px-3 py-1.5 transition"
                    :class="{
                  'border-primary-500 bg-primary-100 text-white':
                    item.id === form.position
                }"
                >
                  <input
                      v-model="form.position"
                      class="hidden"
                      type="checkbox"
                      :value="item.id"
                  />

                  <span
                      class="flex h-4 w-4 items-center justify-center rounded-full border"
                  >
                  <span
                      class="h-2 w-2 transform rounded-full bg-primary-500 transition"
                      :class="{
                      'scale-0': item.id !== form.position
                    }"
                  ></span>
                </span>

                  <span
                      class="ml-2 transition"
                      :class="[
                    item.id === form.position
                      ? 'font-semibold text-primary-600'
                      : 'font-normal text-gray-600'
                  ]"
                  >{{ item.name }}</span
                  >
                </label>
              </li>
            </ul>
          </a-form-item>

          <a-form-item label="Giới Thiệu" name="about">
            <a-textarea
                v-model:value="form.about"
                placeholder="Lời ngỏ xin việc"
                :auto-size="{ minRows: 3, maxRows: 6 }"
            />
          </a-form-item>

          <a-form-item
              label="CV"
              name="cv"
              :rules="[{ required: true, message: 'CV xin việc là bắt buộc' }]"
          >
            <div v-auto-animate>
              <div v-if="!form.cv" class="flex items-center">
                <button
                    class="flex items-center rounded-full bg-[#d0deff] to-primary-500 px-3 py-2 text-primary-500"
                >
                  <i-ic-twotone-cloud-upload />
                  <span class="ml-2 text-xs font-semibold"> Tải Lên </span>
                </button>

                <a-dropdown placement="topLeft" trigger="click">
                  <a class="ml-3 text-[12px] font-semibold">Thư viện CV</a>

                  <template #overlay>
                    <a-menu>
                      <a-menu-item
                          v-for="item in cvLibrary"
                          :key="item.id"
                          @click="form.cv = item.url"
                      >
                        <div
                            class="flex items-center text-[14px] transition hover:text-primary-500"
                        >
                        <span class="ml-2 text-[14px]">
                          {{ item.name }}
                        </span>
                        </div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
              <div v-else class="flex items-center text-gray-500">
                <i-pepicons-cv />
                <span class="mx-2">designer.pdf</span>
                <i-ion-ios-close-circle-outline
                    class="cursor-pointer text-rose-500"
                    @click="form.cv = ''"
                />
              </div>
            </div>

            <template #extra>
              <p class="mb-0 text-[13px] text-gray-400">
                Hãy hoàn thiện CV thật tốt để gây ấn tượng với nhà tuyển dụng bạn
                nhé...
              </p>
            </template>
          </a-form-item>

          <div class="flex justify-between">
            <a class="text-[13px] text-green-500 underline">Mẹo xin việc</a>

            <button
                type="submit"
                class="flex items-center rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-3 py-2 text-white"
            >
              <i-ph-person-simple-run-bold />
              <span class="ml-2 text-xs font-semibold"> Ứng Tuyển </span>
            </button>
          </div>
        </a-form>
      </div>
      <div
          v-else-if="currentStep === 'success'"
          class="flex flex-col items-center justify-center"
      >
        <div
            class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        >
          <i-ion-md-checkmark-circle-outline class="text-3xl text-green-500" />
        </div>
        <div class="mt-4 text-center">
          <h3 class="text-lg font-semibold text-gray-700">
            Yêu cầu tham gia thành công
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            Chúng tôi sẽ thông báo cho bạn khi có phản hồi
          </p>
        </div>
      </div>
    </div>
  </base-modal>
</template>

<script lang="ts" setup>
const currentStep = ref('input')

const jobPositions = [
  {
    id: 1,
    name: 'Nhân viên'
  },
  {
    id: 2,
    name: 'Quản lý'
  },
  {
    id: 3,
    name: 'Giám đốc'
  }
]

const form = reactive({
  position: 1,
  about: '',
  cv: ''
})

const cvLibrary = [
  {
    id: 1,
    name: 'Designer CV',
    url: 'https://www.google.com'
  },
  {
    id: 2,
    name: 'Developer CV',
    url: 'https://www.google.com'
  }
]

const onFinish = (values: any) => {
  currentStep.value = 'success'
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
