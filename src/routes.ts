import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

let routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@pages/index.vue')
  },
  {
    path: '/projects/:id',
    component: () => import('@pages/projects/index.vue')
  },
  {
    path: '/form',
    component: () => import('@pages/form/add-project.vue'),
    meta: { private: true }
  },
  {
    path: '/auth',
    redirect: '/auth/signin',
    meta: {
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
  },
  // test private
  {
    path: '/private',
    component: () => import('@pages/private/index.vue'),
    meta: {
      private: true,
    }
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
