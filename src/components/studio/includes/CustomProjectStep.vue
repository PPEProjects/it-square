<template>
  <h4 class="mb-0 text-[18px] font-semibold text-gray-600">
    Tiến độ dự án
    <span v-if="steps?.length" class="text-[14px]">({{ steps.length }})</span>
  </h4>

  <a-spin :spinning="loading">
    <template v-if="!steps?.length">
      <div style="width: 250px; height: 200px" class="mx-auto">
        <vue-lottie-player
          width="250px"
          height="200px"
          loop
          path="https://assets4.lottiefiles.com/packages/lf20_k8heoy5g.json"
        />
      </div>

      <div>
        <div class="flex items-center justify-center">
          <a-button type="primary"> Thêm Tiến Độ </a-button>

          <a-button type="danger" class="ml-3" @click="visible = true">
            <i-ph-magic-wand-bold />
          </a-button>
        </div>
        <p class="mt-2 text-center text-[12px] text-gray-400">
          Việc thiết lập đầy đủ các bước sẽ hỗ trợ bạn rất nhiều cho việc quản
          lý dự án.
          <br />
          Nếu bạn thấy khó khăn có thể sử dụng các mẫu của chúng tôi.
        </p>
      </div>
    </template>
    <template v-else>
      <div class="mt-2">
        <p class="mb-3 text-[12px] text-gray-400">
          - Nhấp để chọn tiến trình đã hoàn thành. Tiến trình đang chạy mặc định
          là bước tiếp theo.
          <br />
          - Bạn có thể kéo thả để thay đổi thứ tự các bước. Điều này có thể sẽ
          đặt lại tiến độ dự án.
        </p>

        <draggable
          v-model="steps"
          item-key="id"
          group="people"
          @end="afterDrag"
        >
          <template #item="{ element, index }">
            <div class="step-item">
              <div class="flex cursor-pointer items-start py-2">
                <div
                  class="relative top-1 mr-2.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-[20px] transition"
                  :class="{
                    'border-primary-500 bg-primary-500 text-white':
                      buildStatus(index) === 'done',
                    'text-primary-500': element.status === StepStatus.DOING
                  }"
                  @click="checkStep({ input: { id: element.id } })"
                >
                  <i-material-symbols-check-small
                    v-if="buildStatus(index) === 'done'"
                  />
                  <i-line-md-loading-loop
                    v-else-if="buildStatus(index) === 'doing' "
                    class="scale-75 transform"
                  />
                </div>
                <div>
                  <div
                    class="name text-[16px] font-semibold text-gray-700 transition"
                  >
                    {{ element.name }}
                  </div>
                  <div class="description text-[13px] text-gray-500 transition">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Atque corporis, cupiditate dolorem doloremque eum excepturi
                    facilis laboriosam nesciunt.
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>

        <div class="mt-3">
          <a-button type="primary"> Thêm Tiến Độ </a-button>
        </div>
      </div>
    </template>
  </a-spin>

  <a-modal v-model:visible="visible" title="Tiến Độ Đề Xuất" @ok="handleOk">
    <div>
      <div>
        <div class="inline-flex items-center text-primary-500">
          <i-ic-sharp-draw />
          <div class="ml-1 font-semibold">Design:</div>
        </div>
        <div class="relative -top-1 ml-2 inline text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem
          cupiditate exercitationem illo.
        </div>
      </div>

      <div>
        <div class="inline-flex items-center text-rose-500">
          <i-simple-icons-xcode />
          <div class="ml-1 font-semibold">Develop:</div>
        </div>
        <div class="relative -top-1 ml-2 inline text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem
          cupiditate exercitationem illo.
        </div>
      </div>

      <div>
        <div class="inline-flex items-center text-orange-500">
          <i-majesticons-test-tube-filled />
          <div class="ml-1 font-semibold">Test:</div>
        </div>
        <div class="relative -top-1 ml-2 inline text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem
          cupiditate exercitationem illo.
        </div>
      </div>

      <div>
        <div class="inline-flex items-center text-green-500">
          <i-material-symbols-public />
          <div class="ml-1 font-semibold">Phát Hành:</div>
        </div>
        <div class="relative -top-1 ml-2 inline text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem
          cupiditate exercitationem illo.
        </div>
      </div>
    </div>
    <p class="mb-0 mt-4 text-[12px] text-gray-400">
      Tiến độ đề xuất sẽ không phù hợp với tất cả các loại dự án. Bạn hoàn toàn
      c thể thay đổi tạo tiến độ.
    </p>
  </a-modal>
</template>

<script lang="ts" setup>
import { GetProjectAdvance_project_steps } from '#apollo/queries/__generated__/GetProjectAdvance'
import { CHECK_STEP, CREATE_STEPS } from '#apollo/mutations/projects'
import {
  CreateSteps,
  CreateStepsVariables
} from '#apollo/mutations/__generated__/CreateSteps'
import { StepStatus } from '#apollo/__generated__/itTypes'
import {
  CheckStep,
  CheckStepVariables
} from '#apollo/mutations/__generated__/CheckStep'

const props = defineProps<{
  project: string
  value?: GetProjectAdvance_project_steps[]
}>()

const steps = ref<GetProjectAdvance_project_steps[]>([])
watch(
  () => props.value,
  (_steps) => {
    steps.value = [...(_steps || [])]
  }
)

const visible = ref<boolean>(false)

type CustomStatus = 'done' | 'doing' | 'waiting'
const buildStatus = (index: number): CustomStatus => {
  let anchor = -1
  for (let i = 0; i < steps.value.length; i++) {
    if (steps.value[i].status === StepStatus.DONE) {
      anchor = i
    }
  }
  if (anchor >= index) {
    return 'done'
  }
  if (anchor === index - 1) {
    return 'doing'
  }
  return 'waiting'
}

const { mutate, loading, onDone } = useMutation<
  CreateSteps,
  CreateStepsVariables
>(CREATE_STEPS)

const getoApp = useGeto()
onDone((data) => {
  if (data.data?.createSteps) {
    getoApp.cache.modify({
      id: `Project:${props.project}`,
      fields: {
        steps() {
          return data.data!.createSteps
        }
      }
    })
  }
})

const handleOk = () => {
  visible.value = false
  mutate({
    input: {
      project: props.project,
      steps: [
        {
          name: 'Design',
          status: StepStatus.WAITING
        },
        {
          name: 'Develop',
          status: StepStatus.WAITING
        },
        {
          name: 'Test',
          status: StepStatus.WAITING
        },
        {
          name: 'Leach',
          status: StepStatus.WAITING
        }
      ]
    }
  })
}

const { mutate: checkStep, onDone: afterCheckStep } = useMutation<
  CheckStep,
  CheckStepVariables
>(CHECK_STEP)

afterCheckStep((data) => {
  if (data.data?.checkStep) {
    const index = steps.value.findIndex(
      (step) => step.id === data.data!.checkStep.id
    )
    steps.value.forEach((step, i) => {
      if (i <= index) {
        getoApp.cache.modify({
          id: getoApp.cache.identify(step),
          fields: {
            status() {
              return StepStatus.DONE
            }
          }
        })
      } else {
        getoApp.cache.modify({
          id: getoApp.cache.identify(step),
          fields: {
            status() {
              return StepStatus.WAITING
            }
          }
        })
      }
    })
  }
})

const afterDrag = () =>
  nextTick(() => {
    /// Sau khi kéo thả
    steps.value.forEach((step) => {
      getoApp.cache.modify({
        id: getoApp.cache.identify(step),
        fields: {
          status() {
            return StepStatus.WAITING
          }
        }
      })
    })
  })
</script>

<style scoped lang="scss">
.step-item {
  &:hover {
    .name {
      @apply text-primary-600;
    }
    .description {
      @apply text-primary-500;
    }
  }
}
</style>
