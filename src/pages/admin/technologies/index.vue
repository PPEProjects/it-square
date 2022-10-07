<template>
  <div>
    <div class="mb-4 flex items-center">
      <div class="flex items-center">
        <i-material-symbols-amp-stories-rounded class="mr-2 text-gray-500" />
        Platforms: {{ platforms.length }}
      </div>

      <div class="ml-5 flex items-center">
        <i-tabler-world-longitude class="mr-2 text-gray-500" />
        Technologies: {{ countTechnologies }}
      </div>

      <a-button
        type="primary"
        size="small"
        class="ml-auto"
        @click="openNewPlatfoem({})"
      >
        <span class="ml-1 text-[14px]">Add</span>
        <template #icon>
          <i-material-symbols-add class="inline-block text-[14px]" />
        </template>
      </a-button>
    </div>
    <div class="flex w-full">
      <div
        v-for="(platform, index) in platforms"
        :key="index"
        class="cutsom-shadow mr-5 w-auto p-4 last:mr-0"
      >
        <div class="border-b pb-3">
          <h3 class="mb-0 text-[15px] font-semibold text-gray-600">
            {{ platform.name }}
          </h3>

          <div class="mt-2 flex items-center">
            <a-button
              type="primary"
              size="small"
              class="mr-5"
              @click="openTechModal(platform)"
            >
              <span class="ml-1 text-[14px]">Add</span>
              <template #icon>
                <i-material-symbols-add class="inline-block text-[14px]" />
              </template>
            </a-button>

            <a-button
              type="primary"
              size="small"
              class="ml-auto"
              @click="openNewPlatfoem(platform)"
            >
              <template #icon>
                <i-material-symbols-edit-rounded
                  class="inline-block text-[14px]"
                />
              </template>
            </a-button>

            <a-button type="danger" size="small" class="ml-3">
              <template #icon>
                <i-ic-baseline-delete class="inline-block text-[14px]" />
              </template>
            </a-button>
          </div>
        </div>

        <draggable
          data-source="juju"
          :list="platforms[index].children"
          class="list-group mt-2"
          group="a"
          item-key="id"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element }">
            <div
              class="tech-item flex cursor-pointer items-center border-b border-gray-100 py-2 last:border-0 last:pb-0"
            >
              <div>{{ element.name }}</div>
              <template v-if="!drag">
                <i-ic-outline-remove-circle
                  class="ml-auto text-rose-500 transition"
                  @click="removeTechnology({ input: { id: element.id } })"
                />
                <i-mdi-lead-pencil
                  class="ml-2 text-primary-500 transition delay-100"
                  @click="openEditTechModal(platform, element)"
                />
              </template>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <a-modal
      v-model:visible="visible"
      :title="formPlatform.id ? 'Cập Nhật' : 'Thêm Mới'"
      @ok="submitPlatform"
    >
      <a-form
        ref="formPlatformRef"
        :model="formPlatform"
        layout="vertical"
        name="basic"
        autocomplete="off"
        :rules="rulesPlatform"
      >
        <a-form-item label="Tên" name="name">
          <a-input
            v-model:value="formPlatform.name"
            placeholder="Tên phân nền tảng"
          />
        </a-form-item>

        <a-form-item label="Mô Tả" name="content">
          <a-textarea
            v-model:value="formPlatform.content"
            placeholder="Mô tả thêm về phân nền tảng"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="visibleTechnology"
      :title="formTechnology.id ? 'Cập Nhật' : 'Thêm Mới'"
      @ok="submitTechnology"
    >
      <a-form
        ref="formTechnologyRef"
        :model="formTechnology"
        layout="vertical"
        name="basic"
        autocomplete="off"
        :rules="rulesTechnology"
      >
        <a-form-item label="Tên" name="name">
          <a-input v-model:value="formTechnology.name" placeholder="Tên" />
        </a-form-item>

        <a-form-item label="Nền tảng" name="platform">
          <a-select ref="select" v-model:value="formTechnology.platform">
            <a-select-option
              v-for="(platform, index) in platforms"
              :key="index"
              :value="platform.id"
            >
              {{ platform.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Mô Tả" name="content">
          <a-textarea
            v-model:value="formTechnology.content"
            placeholder="Mô tả thêm"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { GET_PLATFORMS } from '#apollo/queries/platforms'
import {
  GetPlatforms,
  GetPlatforms_platforms,
  GetPlatforms_platforms_children
} from '#apollo/queries/__generated__/GetPlatforms'
import { FormInstance } from 'ant-design-vue/lib/form'
import {
  CREATE_PLATFORM,
  CREATE_TECHNOLOGY, DELETE_TECHNOLOGY,
  UPDATE_PLATFORM,
  UPDATE_TECHNOLOGY
} from '#apollo/mutations/platforms'
import {
  CreatePlatform,
  CreatePlatformVariables
} from '#apollo/mutations/__generated__/CreatePlatform'
import {
  UpdatePlatform,
  UpdatePlatformVariables
} from '#apollo/mutations/__generated__/UpdatePlatform'
import { CreateTechnologyInput } from '#apollo/__generated__/itTypes'
import {
  CreateTechnology,
  CreateTechnologyVariables
} from '#apollo/mutations/__generated__/CreateTechnology'
import {
  UpdateTechnology,
  UpdateTechnologyVariables
} from '#apollo/mutations/__generated__/UpdateTechnology'
import {RemoveTechnology, RemoveTechnologyVariables} from "#apollo/mutations/__generated__/RemoveTechnology";

const drag = ref(false)

const platforms = ref<GetPlatforms_platforms[]>([])
const countTechnologies = computed(() =>
  platforms.value?.reduce(
    (acc, platform) => acc + platform.children!.length || 0,
    0
  )
)

const { result } = useQuery<GetPlatforms>(GET_PLATFORMS)

watch(
  result,
  (val) => {
    if (val?.platforms) {
      platforms.value = JSON.parse(JSON.stringify(val.platforms))
    }
  },
  { deep: true, immediate: true }
)

// Cập nhật cache
const getoInstance = useGeto()

// form platform
const formPlatformRef = ref<FormInstance>()
const visible = ref(false)
const formPlatform = ref<Partial<GetPlatforms_platforms>>({})
const rulesPlatform = ref({
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên phân loại'
    }
  ]
})

const { mutate: createPlatform } = useMutation<
  CreatePlatform,
  CreatePlatformVariables
>(CREATE_PLATFORM)
const { mutate: updatePlatform } = useMutation<
  UpdatePlatform,
  UpdatePlatformVariables
>(UPDATE_PLATFORM)

const openNewPlatfoem = (platform: GetPlatforms_platforms) => {
  formPlatform.value = Object.assign({}, platform)
  visible.value = true
}

const submitPlatform = async () => {
  try {
    await formPlatformRef.value?.validateFields()
    if (formPlatform.value.id) {
      updatePlatform({
        input: {
          id: formPlatform.value.id,
          name: formPlatform.value.name,
          content: formPlatform.value.content
        }
      })
    } else {
      const result = await createPlatform({
        input: {
          name: formPlatform.value.name as string,
          content: formPlatform.value.content || ''
        }
      })
      if (result?.data?.createPlatform) {
        getoInstance.writeQuery<GetPlatforms>({
          query: GET_PLATFORMS,
          data: {
            platforms: [...platforms.value, result.data.createPlatform]
          }
        })
        visible.value = false
      }
    }
    visible.value = false
  } catch (e) {
    //
  }
}

// form technology
const formTechnologyRef = ref<FormInstance>()
const visibleTechnology = ref(false)
const formTechnology = ref<
  Partial<
    CreateTechnologyInput & {
      id: string
    }
  >
>({})
const rulesTechnology = ref({
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên công nghệ'
    }
  ],
  platform: [
    {
      required: true,
      message: 'Vui lòng chọn phân nền tảng'
    }
  ]
})
const openTechModal = (
  platform: GetPlatforms_platforms
) => {
  formTechnology.value = {
    platform: platform.id
  }
  visibleTechnology.value = true
}

const openEditTechModal = (platform: GetPlatforms_platforms, tech: GetPlatforms_platforms_children) => {
  formTechnology.value = {
    ...tech,
    platform: platform.id,
  } as any
  visibleTechnology.value = true
}

const { mutate: createTechnology } = useMutation<
  CreateTechnology,
  CreateTechnologyVariables
>(CREATE_TECHNOLOGY)
const { mutate: updateTechnology } = useMutation<
  UpdateTechnology,
  UpdateTechnologyVariables
>(UPDATE_TECHNOLOGY)
const submitTechnology = async () => {
  try {
    await formTechnologyRef.value?.validateFields()
    if (String(formTechnology.value.id || '').length > 0) {
      updateTechnology({
        input: {
          id: formTechnology.value.id as string,
          name: formTechnology.value.name as string,
          content: formTechnology.value.content as string,
          platform: formTechnology.value.platform as string
        }
      })
    } else {
      const result = await createTechnology({
        input: {
          name: formTechnology.value.name as string,
          content: formTechnology.value.content || '',
          platform: formTechnology.value.platform as string
        }
      })
      if (result?.data?.createTechnology) {
        getoInstance.cache.modify({
          id: getoInstance.cache.identify({
            __typename: 'Platform',
            id: formTechnology.value.platform
          }),
          fields: {
            children(existingChildren = []) {
              return [...existingChildren, result.data!.createTechnology]
            }
          }
        })
      }
    }
  } catch (e) {
    //
  }
  visibleTechnology.value = false
}

const { mutate: removeTechnology, onDone } = useMutation<RemoveTechnology, RemoveTechnologyVariables>(DELETE_TECHNOLOGY)
onDone((result) => {
  if (result.data?.removeTechnology) {
    console.log(result.data.removeTechnology)
    getoInstance.cache.modify({
      id: getoInstance.cache.identify({
        __typename: 'Platform',
        id: result.data.removeTechnology.platform.id
      }),
      fields: {
        children(existingChildren = []) {
          return existingChildren.filter((child: GetPlatforms_platforms_children) => child.slug !== result.data?.removeTechnology.slug)
        }
      }
    })
  }
})

// sự kiện kéo thả
const counterChange = ref(0)
const debouncedChangePlatforms = useDebounceFn(() => {
  console.log('change platforms')
}, 300)

watch(platforms, () => {
  if(counterChange.value) {
    debouncedChangePlatforms()
  }
  counterChange.value++
}, { deep: true })
</script>
<style scoped lang="scss">
.tech-item {
  svg {
    @apply scale-0 transform opacity-0;
  }
  &:hover {
    svg {
      @apply scale-100 opacity-100;
    }
  }
}
</style>
