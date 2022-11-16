import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authRoutes } from './modules/auth'
import {projectsRoutes} from "./modules/projects";
import {workspaceRoutes} from "./modules/workspace";
import {applicationsRoutes} from "./modules/applications";

let routes: RouteRecordRaw[] = [...authRoutes, ...projectsRoutes, ...workspaceRoutes, ...applicationsRoutes]

// Tạo router name, deep loop
const extendRoutes = (_routes: RouteRecordRaw[]) => {
  _routes.forEach((record) => {
    // tạo router name, xoá '/' ở đầu và thay thế còn lại = '-'
    record.name = record.path
      .replace(/\//, '')
      .replaceAll('/', '-')
      .replaceAll(new RegExp(/\([^)]*\)/, 'g'), '')
      .replaceAll(new RegExp(/:/, 'g'), '')

    // deep loop
    if (record.children) {
      record.children = extendRoutes(record.children)
    }
  })
  return _routes
}

routes = extendRoutes(routes)

// 404 Handle
routes.push({
  path: '/:pathMatch(.*)*',
  component: () => import('@pages/error/index.vue'),
  meta: {
    title: 'Not Found'
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
