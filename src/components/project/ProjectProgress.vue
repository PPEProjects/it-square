<template>
  <div>
    <div v-if="steps.length" class="flex">
      <div class="max-w-[600px] flex-shrink-0">
        <draggable
          v-model="steps"
          item-key="id"
          group="people"
          @end="
            sortSteps({
              input: {
                steps: steps.map((step) => step.id)
              }
            })
          "
        >
          <template #item="{ element }">
            <step-item
              :step="element"
              class="mb-5 last:mb-0"
              @edit="openEditStep(element)"
            />
          </template>
        </draggable>
      </div>

      <div class="ml-12 w-full text-xs text-gray-500">
        <h4 class="text-[18px]">Note:</h4>
        <p class="mb-0">- Tien do the hien cac buoc cua du an</p>
        <p class="mb-0 mt-1">- Ban co the keo tha de thay doi tien do du an</p>
      </div>
    </div>

    <div v-else class="py-10 pt-10 text-center">
      <div style="width: 300px; height: 250px" class="mx-auto">
        <vue-lottie-player
          width="300px"
          height="250px"
          loop
          path="https://assets5.lottiefiles.com/packages/lf20_dsxct2el.json"
        />
        <div class="text-[11px] text-gray-400">
          Dự án hiện không có bất kì bước nào...
        </div>
      </div>
    </div>

    <a-modal
      v-model:visible="isVisiable"
      title="Tuỳ Biến Tiến Độ"
      @ok="submitForm"
    >
      <a-form ref="formRef" layout="vertical" :model="form">
        <a-form-item
          label="Tên Tiến Độ"
          name="name"
          :rules="[
            {
              required: true,
              message: 'Name is required',
              trigger: 'blur'
            }
          ]"
        >
          <a-input v-model:value="form.name" placeholder="Tên tiến độ" />
        </a-form-item>

        <a-form-item label="Trạng Thái" name="status">
          <a-select
            v-model:value="form.status"
            placeholder="Trạng thái bước làm"
          >
            <a-select-option :value="StepStatus.WAITING">
              Sẽ Làm
            </a-select-option>
            <a-select-option :value="StepStatus.DONE"> Đã Làm </a-select-option>
          </a-select>

          <template #extra>
            <p class="mb-0 mt-2 text-[11px]">
              Bước đang lamf là bước ngay sau bước hoàn thành.
            </p>
          </template>
        </a-form-item>

        <a-form-item label="Mô Tả" name="content">
          <a-textarea
            v-model:value="form.content"
            placeholder="Autosize height with minimum and maximum number of lines"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <teleport-view to="#actions">
      <a-button type="primary" class="ml-4" @click="isVisiable = true">
        <template #icon>
          <i-ic-baseline-check />
        </template>
        <span class="ml-1">Them Moi</span>
      </a-button>
    </teleport-view>
  </div>
</template>

<script lang="ts" setup>
import {
  GetSteps,
  GetSteps_steps,
  GetStepsVariables
} from '#apollo/queries/__generated__/GetSteps'
import { GET_STEPS } from '#apollo/queries/step.query'
import {
  CreateStepInput,
  StepStatus,
  UpdateStepInput
} from '#apollo/__generated__/types'
import { FormInstance } from 'ant-design-vue'
import {
  CreateStep,
  CreateStepVariables
} from '#apollo/mutations/__generated__/CreateStep'
import {CREATE_STEP, SORT_STEPS, UPDATE_STEP} from '#apollo/mutations/step.mutate'
import {
  SortSteps,
  SortStepsVariables
} from '#apollo/mutations/__generated__/SortSteps'
import {UpdateStep, UpdateStepVariables} from "#apollo/mutations/__generated__/UpdateStep";

const router = useRouter()
const apollo = useApollo()

const steps = ref<GetSteps_steps[]>([])

const { result } = useQuery<GetSteps, GetStepsVariables>(GET_STEPS, {
  filter: {
    project: router.currentRoute.value.params.id as string
  }
})
watch(
  result,
  (val) => {
    if (val?.steps) {
      steps.value = JSON.parse(JSON.stringify(val.steps))
    }
  },
  { immediate: true }
)

// Modal
const isVisiable = ref(false)

// Form thêm / edit step
const formRef = ref<FormInstance>()

const form = ref<Partial<CreateStepInput&UpdateStepInput>>({})

const {
  mutate: createStep,
  loading: creatingStep,
  onDone: afterCreated
} = useMutation<CreateStep, CreateStepVariables>(CREATE_STEP)

afterCreated((val) => {
  if (val.data?.createStep) {
    apollo.writeQuery({
      query: GET_STEPS,
      variables: {
        filter: {
          project: router.currentRoute.value.params.id as string
        }
      },
      data: {
        steps: [...steps.value, val.data.createStep]
      }
    })
  }
})

// Edit step
const openEditStep = (step: GetSteps_steps) => {
  form.value = Object.assign({}, step)
  isVisiable.value = true
}

const { mutate: updateStepHandle, loading: updating } = useMutation<UpdateStep, UpdateStepVariables>(UPDATE_STEP)

const submitForm = async () => {
  isVisiable.value = false
  try {
    await formRef.value?.validate()
    if (form.value.id) {
      // Update step
      await updateStepHandle({
        input: {
          id: form.value.id,
          name: form.value.name,
          status: form.value.status,
          content: form.value.content
        }
      })
    } else {
      // Create step
      await createStep({
        input: {
          name: form.value.name!,
          content: form.value.content,
          status: form.value.status,
          project: router.currentRoute.value.params.id as string
        }
      })
    }
  } catch (e) {
    console.log(e)
    //
  }
}

// Sort
const { mutate: sortSteps, onDone: afterSort } = useMutation<
  SortSteps,
  SortStepsVariables
>(SORT_STEPS)

afterSort((res) => {
  if (res.data?.sortSteps) {
    apollo.writeQuery<GetSteps, GetStepsVariables>({
      query: GET_STEPS,
      variables: {
        filter: {
          project: router.currentRoute.value.params.id as string
        }
      },
      data: {
        steps: steps.value.sort((a, b) => {
          return a.order - b.order
        })
      }
    })
  }
})
</script>

<style scoped></style>
