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

    <project-info v-if="$route.query.tab === 'info'" ref="infoRef" />
    <project-permission v-else-if="$route.query.tab === 'permission'" />
    <project-progress v-else-if="$route.query.tab === 'progress'" />
  </div>
</template>

<script lang="ts" setup>
// validate project
import { VERIFY_PROJECT } from '#apollo/queries/project.query'
import {
  VerifyProject,
  VerifyProjectVariables
} from '#apollo/queries/__generated__/VerifyProject'

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
</script>

<style scoped></style>
