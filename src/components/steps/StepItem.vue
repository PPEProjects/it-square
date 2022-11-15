<template>
  <div
    class="cutsom-shadow step-item relative flex cursor-pointer items-start rounded-lg bg-white py-3 px-5"
  >
    <div
      class="border-lg mr-2 flex h-[30px] w-[30px] flex-shrink-0 transform cursor-pointer items-center justify-center rounded-full border text-[18px] transition"
      :class="{
        'scale-90 bg-gray-100': StepStatus.WAITING === step.status,
        'border-primary-500 bg-primary-500 text-white':
          StepStatus.DONE === step.status
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
          'scale-0 opacity-0': step.status === StepStatus.WAITING
        }"
      />
    </div>

    <div class="ml-1.5">
      <h3 class="mb-0 text-[18px]">{{ step.name }}</h3>
      <p class="mb-0 text-[12px] text-gray-500 line-clamp-2">
        {{ step.content }}
      </p>
    </div>

    <a-popconfirm
      title="Are you sure delete this task?"
      ok-text="Yes"
      cancel-text="No"
      @confirm="
        deleteHandle({
          input: {
            id: step.id
          }
        })
      "
    >
      <button
        class="delete-btn absolute right-5 top-3 flex h-[22px] w-[22px] items-center justify-center rounded-md bg-rose-500 text-white shadow-lg shadow-rose-200"
        :disabled="deleting"
      >
        <i-material-symbols-close />
      </button>
    </a-popconfirm>
  </div>
</template>

<script lang="ts" setup>
import {
  GetSteps,
  GetSteps_steps
} from '#apollo/queries/__generated__/GetSteps'
import { CHECK_STEP, REMOVE_STEP } from '#apollo/mutations/step.mutate'
import {
  CheckStep,
  CheckStepVariables
} from '#apollo/mutations/__generated__/CheckStep'
import { StepStatus } from '#apollo/__generated__/types'
import { GET_STEPS } from '#apollo/queries/step.query'
import {
  RemoveRole,
  RemoveRoleVariables
} from '#apollo/mutations/__generated__/RemoveRole'

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

// delete step
const { mutate: deleteHandle, loading: deleting, onDone: afterDelete } = useMutation<
  RemoveRole,
  RemoveRoleVariables
>(REMOVE_STEP)
afterDelete(() => {
  apollo.cache.evict({
    id: apollo.cache.identify({
      __typename: 'Step',
      id: props.step.id
    })
  })
})
</script>

<style scoped>
.step-item:hover .delete-btn {
  opacity: 1;
  transform: scale(1);
}
.step-item .delete-btn {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: scale(0.7);
}

.step-item .delete-btn:hover {
  transform: scale(1.1);
}
</style>
