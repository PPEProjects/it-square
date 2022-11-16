<template>
  <a-layout class="default-layout h-screen">
    <a-layout-header class="header -mx-[23px] flex items-center">
      <div class="logo flex flex-shrink-0 items-center">
        <img src="/images/logo.png" alt="" class="w-[32px]" />
        <h1
          class="mb-0 ml-2.5 text-[20px] font-bold text-white"
          style="font-family: Dancing Script, cursive"
        >
          IT Square
        </h1>
      </div>

      <div id="tabs" class="w-full"></div>

      <div id="actions" class="ml-auto flex flex-shrink-0 items-center"></div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="220" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1" @click="$router.push('/projects')">
            <template #title>
              <span class="flex items-center">
                <i-material-symbols-space-dashboard-rounded />
                <span class="ml-1.5">Projects</span>
              </span>
            </template>
            <a-menu-item key="1"> Danh Sách </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="sub2" @click="$router.push('/applications')">
            <span class="flex items-center">
              <i-fluent-document-footer-24-filled />
              <span class="ml-1.5">Applications</span>
            </span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
          class="overflow-y-auto scrollbar-hide"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    LaptopOutlined,
    NotificationOutlined
  },
  setup() {
    return {
      selectedKeys1: ref<string[]>(['2']),
      selectedKeys2: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(['sub1'])
    }
  }
})
</script>
<style>
.default-layout .logo {
  width: 193px;
  height: 31px;
}
.site-layout-background {
  background: #fff;
}
</style>
