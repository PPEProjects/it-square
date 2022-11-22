<template>
  <a-table
    :columns="columns"
    :data-source="proposals"
    :pagination="{
      showLessItems: true,
      defaultPageSize: 7
    }"
    :loading="loading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'user'">
        <div v-if="record.user" class="flex items-center">
          <a-avatar :src="$cdn(record.user.avatar)" />
          <h4 class="mb-0 ml-2">{{ record.user.name }}</h4>
        </div>
        <div v-else>--</div>
      </template>

      <template v-if="column.key === 'resume'">
        <a v-if="record.resume" :href="$cdn(record.resume)" target="_blank">
          <a-tag color="#87d068"> Download </a-tag>
        </a>
      </template>

      <template v-if="column.key === 'createdAt'">
        {{ $dayjs(record.createdAt).format('DD/MM/YYYY hh:mm') }}
      </template>

      <template v-if="column.key === 'status'">
        <a-tag v-if="record.status === ProposalStatus.WAITING" color="#f50">
          Waiting
        </a-tag>
        <a-tag v-if="record.status === ProposalStatus.REJECTED" color="#2db7f5">
          Rejected
        </a-tag>
        <a-tag v-if="record.status === ProposalStatus.APPROVED" color="#108ee9">
          Approved
        </a-tag>
      </template>

      <template v-if="column.key === 'action'">
        <div>
          <a-button
            type="danger"
            size="small"
            @click="
              openCheckForm({
                id: record.id,
                note: record.note,
                status: ProposalStatus.REJECTED
              })
            "
          >
            <div class="flex items-center">
              <i-material-symbols-close-rounded />
            </div>
          </a-button>

          <a-button
            type="primary"
            size="small"
            class="ml-2"
            @click="
              openCheckForm({
                id: record.id,
                note: record.note,
                status: ProposalStatus.APPROVED
              })
            "
          >
            <div class="flex items-center">
              <i-ic-outline-check />
            </div>
          </a-button>
        </div>
      </template>
    </template>
  </a-table>

  <a-modal v-model:visible="showModal" title="Thay Đổi" @ok="checkApplication">
    <ul class="flex flex-wrap">
      <li
        v-for="(item, index) in checkOptions"
        :key="index"
        class="mr-5 transform transition"
        :class="{
          'scale-95': formCheck.status !== item.value
        }"
      >
        <div
          class="flex cursor-pointer items-center rounded-lg border-[2px] px-3 py-1.5 transition"
          :class="{
            'border-primary-500 bg-primary-100 text-white':
              formCheck.status === item.value
          }"
          @click="formCheck.status = item.value"
        >
          <span
            class="flex h-4 w-4 items-center justify-center rounded-full border"
          >
            <span
              class="h-2 w-2 transform rounded-full bg-primary-500 transition"
              :class="{
                'scale-0': formCheck.status !== item.value
              }"
            ></span>
          </span>

          <span
            class="ml-2 transition"
            :class="[
              formCheck.status === item.value
                ? 'font-semibold text-primary-600'
                : 'font-normal text-gray-600'
            ]"
          >
            {{ item.label }}
          </span>
        </div>
      </li>
    </ul>

    <div>
      <h4>Note:</h4>
      <a-textarea
        v-model:value="formCheck.note"
        placeholder="Autosize height with minimum and maximum number of lines"
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import {
  GetProposals,
  GetProposals_proposals,
  GetProposalsVariables
} from '#apollo/queries/__generated__/GetProposals'
import { GET_PROPOSALS } from '#apollo/queries/proposal.query'
import { ProposalStatus } from '#apollo/__generated__/types'
import { useCheckProposal } from '@composable/useProposal'
const route = useRoute()

const columns = [
  {
    title: 'Cendidate',
    dataIndex: 'user',
    key: 'user',
    width: 230
  },
  {
    title: 'Position',
    dataIndex: ['role', 'name'],
    key: 'role.name',
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center'
  },
  {
    title: 'Resume',
    dataIndex: 'resume',
    key: 'resume',
    align: 'center'
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
    align: 'center'
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    width: 180
  },
  {
    title: 'Action',
    key: 'action',
    align: 'right',
    width: 120
  }
]

const { result, loading: getting } = useQuery<
  GetProposals,
  GetProposalsVariables
>(GET_PROPOSALS, {
  filter: {
    project: route.params.id as string
  }
})
const proposals = computed(() => result.value?.proposals || [])

const showModal = ref(false)
const {
  form: formCheck,
  loading: loadingCheck,
  handle: handleCheck,
  options: checkOptions
} = useCheckProposal()

const openCheckForm = (
  doc: Pick<GetProposals_proposals, 'id' | 'status' | 'note'>
) => {
  formCheck.value = {
    id: doc.id,
    status: doc.status,
    note: doc.note
  }
  showModal.value = true
}

const checkApplication = async () => {
  showModal.value = false
  await handleCheck()
}

const loading = computed(() => getting.value || loadingCheck.value)
</script>

<style scoped></style>
