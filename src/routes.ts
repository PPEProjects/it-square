import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

let routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@pages/index.vue'),
    meta: { public: true }
  },
  {
    path: '/auth',
    redirect: '/auth/signin',
    meta: {
      public: false,
      layout: 'auth'
    },
    children: [
      {
        path: '/auth/signin',
        component: () => import('@pages/auth/signin/index.vue'),
        meta: {
          title: 'Đăng nhập'
        }
      },
      {
        path: '/auth/signup',
        component: () => import('@pages/auth/signup/index.vue'),
        meta: {
          title: 'Đăng ký'
        }
      },
      {
        path: '/auth/forgot',
        component: () => import('@pages/auth/forgot/index.vue'),
        meta: {
          title: 'Quên mật khẩu?'
        }
      },
      {
        path: '/auth/new-password',
        component: () => import('@pages/auth/new-password/index.vue'),
        meta: {
          title: 'Đặt lại mật khẩu?'
        }
      }
    ]
  }
]

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
  component: () => import('./pages/error/index.vue'),
  meta: {
    title: 'Not Found'
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
