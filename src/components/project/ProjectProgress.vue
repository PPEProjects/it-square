<template>
  <div>
    <div v-if="steps.length"></div>

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

    <a-modal title="Tuỳ Biến Tiến Độ" :visible="true" @ok="submitForm">
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
      <a-button type="primary" class="ml-4">
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
  GetStepsVariables
} from '#apollo/queries/__generated__/GetSteps'
import { GET_STEPS } from '#apollo/queries/step.query'
import { Steps_steps } from '#apollo/queries/__generated__/Steps'
import { CreateStepInput, StepStatus } from '#apollo/__generated__/types'
import { FormInstance } from 'ant-design-vue'
import {
  CreateStep,
  CreateStepVariables
} from '#apollo/mutations/__generated__/CreateStep'
import {CREATE_STEP} from "#apollo/mutations/step.mutate";

const router = useRouter()
const { result } = useQuery<GetSteps, GetStepsVariables>(GET_STEPS, {
  filter: {
    project: router.currentRoute.value.params.id as string
  }
})
const steps = computed<Steps_steps[]>(() => result.value?.steps || [])

// Modal
const isVisiable = ref(false)

// Form thêm / edit step
const form = ref<CreateStepInput>({
  content: '',
  name: '',
  project: '',
  status: StepStatus.WAITING
})

const { mutate: createStep, loading: creatingStep } = useMutation<
  CreateStep,
  CreateStepVariables
>(CREATE_STEP)

const formRef = ref<FormInstance>()
const submitForm = async () => {
  try {
    await formRef.value?.validate()
    await createStep({
      input: {
        name: form.value.name,
        content: form.value.content,
        status: form.value.status,
        project: router.currentRoute.value.params.id as string
      }
    })
  } catch (e) {
    console.log(e)
    //
  }
}
</script>

<style scoped></style>
