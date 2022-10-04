<template>
  <a-layout>
    <a-layout>
      <a-layout-sider width="230" style="background: #fff">
        <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <template #title>
              <span class="flex items-center">
                <i-material-symbols-space-dashboard-rounded />
                <span class="ml-2">Dự Án</span>
              </span>
            </template>
            <a-menu-item key="1" @click="$router.push('/studio/new-project')">
              Thêm Mới
            </a-menu-item>
            <a-menu-item key="2">
              Danh Sách
            </a-menu-item>
            <a-menu-item key="3">
              Thùng Rác
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <template #title>
              <span class="flex items-center">
                <i-material-symbols-admin-panel-settings />
                <span class="ml-2">
                  Quản Trị Viên
                </span>
              </span>
            </template>
            <a-menu-item key="11">
              Thành Viên
            </a-menu-item>
            <a-menu-item key="12">
              Technology
            </a-menu-item>
            <a-menu-item key="13" @click="$router.push('/studio/admin/categories')">
              Category
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span class="flex items-center">
                <i-ri-user-4-fill />
                <span class="ml-2">
                  Thành Viên
                </span>
              </span>
            </template>
            <a-menu-item key="5">
              Đơn Xin Việc
            </a-menu-item>
            <a-menu-item key="6">
              Nhóm Của Tôi
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span class="flex items-center">
                <i-ic-round-drive-file-rename-outline />
                <span class="ml-2">
                  Tài Liệu
                </span>
              </span>
            </template>
            <a-menu-item key="9">
              Resume
            </a-menu-item>
            <a-menu-item key="10">
              Media
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout class="px-[24px] pb-[24px]">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
            id="studio-content"
            class="overflow-y-auto scrollbar-hide"
            :style="{ background: '#fff', padding: '24px', margin: 0 }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>

const selectedKeys2 = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
#studio-content {
  height: calc(100vh - 70px - 22px - 16px - 16px - 24px);
}
</style>
