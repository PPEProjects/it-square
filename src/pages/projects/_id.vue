<template>
  <div>
    <teleport-view to="#tabs">
      <a-menu
        v-model:selectedKeys="selectedKeys1"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="item in tabs" :key="item.key">
          {{ item.tab }}
        </a-menu-item>
      </a-menu>
    </teleport-view>

    <teleport-view to="#actions">
      <a-button type="danger">
        <div class="flex items-center">
          <i-material-symbols-delete-rounded />
          <span class="ml-1">Xoá</span>
        </div>
      </a-button>

      <a-button
        type="primary"
        class="ml-4"
        :loading="loadingUpdate"
        @click="updateInfo"
      >
        <template #icon>
          <i-ic-baseline-check />
        </template>
        <span class="ml-1">Cập Nhật</span>
      </a-button>
    </teleport-view>

    <project-info v-if="$route.query.tab === 'info'" ref="infoRef" />
  </div>
</template>

<script lang="ts" setup>
// validate project
import { VERIFY_PROJECT } from '#apollo/queries/project.query'
import {
  VerifyProject,
  VerifyProjectVariables
} from '#apollo/queries/__generated__/VerifyProject'
import { CreateProjectInput } from '#apollo/__generated__/types'
import { UPDATE_PROJECT_INFO } from '#apollo/mutations/project.mutate'
import {
  UpdateProjectInfo,
  UpdateProjectInfoVariables
} from '#apollo/mutations/__generated__/UpdateProjectInfo'

const router = useRouter()
const { result, loading } = useQuery<VerifyProject, VerifyProjectVariables>(
  VERIFY_PROJECT,
  {
    filter: {
      id: router.currentRoute.value.params.id as string
    }
  }
)
// todo: tuyf chinhr logo

const tabs = ref([
  {
    key: 'info',
    tab: 'Thông Tin'
  },
  {
    key: 'permission',
    tab: 'Phân Quyền'
  },
  {
    key: 'progress',
    tab: 'Tiến Độ'
  }
])

const selectedKeys1 = ref<string[]>([''])
const setTab = () => {
  const tab = router.currentRoute.value.query.tab
  if (tab) {
    if (tabs.value.find((item) => item.key === tab)) {
      selectedKeys1.value = [tab as string]
    } else {
      selectedKeys1.value = ['info']
    }
  } else {
    selectedKeys1.value = ['info']
  }
}
setTab()

watch(
  selectedKeys1,
  () => {
    router.replace({
      query: {
        tab: selectedKeys1.value[0]
      }
    })
  },
  { immediate: true }
)

// update info
const infoRef = ref()
const loadingUpdate = ref(false)
const { mutate: updateInfoMutaion } = useMutation<
  UpdateProjectInfo,
  UpdateProjectInfoVariables
>(UPDATE_PROJECT_INFO)
const updateInfo = async () => {
  loadingUpdate.value = true
  try {
    const input: CreateProjectInput = await infoRef.value?.update()
    await updateInfoMutaion({
      input: {
        ...input,
        id: router.currentRoute.value.params.id as string
      }
    })
  } catch (e) {
    console.log(e)
    //
  }
  loadingUpdate.value = false
}
</script>

<style scoped></style>
