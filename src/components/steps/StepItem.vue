<template>
  <div class="cutsom-shadow flex items-start rounded-lg bg-white py-3 px-5">
    <div
      class="border-lg mr-2 flex h-[30px] w-[30px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full border text-[18px] transition transform"
      :class="{
        'bg-gray-100 scale-90': StepStatus.WAITING === step.status,
        'bg-primary-500 text-white border-primary-500': StepStatus.DONE === step.status
      }"
      @click="
        checkStep({
          input: {
            id: step.id,
            status: StepStatus.DONE
          }
        })
      "
    >
      <i-material-symbols-check-small
          class="transform transition"
          :class="{
            'opacity-0 scale-0': step.status === StepStatus.WAITING,
          }"
      />
    </div>

    <div class="ml-1.5">
      <h3 class="mb-0 text-[18px]">{{ step.name }}</h3>
      <p class="mb-0 text-[12px] text-gray-500 line-clamp-2">
        {{ step.content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  GetSteps,
  GetSteps_steps
} from '#apollo/queries/__generated__/GetSteps'
import { CHECK_STEP } from '#apollo/mutations/step.mutate'
import {
  CheckStep,
  CheckStepVariables
} from '#apollo/mutations/__generated__/CheckStep'
import { StepStatus } from '#apollo/__generated__/types'
import { GET_STEPS } from '#apollo/queries/step.query'

const props = defineProps<{
  step: GetSteps_steps
}>()

const { mutate: checkStep, onDone } = useMutation<
  CheckStep,
  CheckStepVariables
>(CHECK_STEP)

const router = useRouter()
const apollo = useApollo()
onDone((val) => {
  if (val.data?.updateStep) {
    const cache = apollo.readQuery<GetSteps>({
      query: GET_STEPS,
      variables: {
        filter: {
          project: router.currentRoute.value.params.id as string
        }
      }
    })
    // check lai
    if (cache?.steps) {
      cache.steps.forEach((_step) => {
        apollo.cache.modify({
          id: apollo.cache.identify({
            __typename: 'Step',
            id: _step.id
          }),
          fields: {
            status() {
              return props.step.order >= _step.order
                ? StepStatus.DONE
                : StepStatus.WAITING
            }
          }
        })
      })
    }
  }
})
</script>

<style scoped></style>
