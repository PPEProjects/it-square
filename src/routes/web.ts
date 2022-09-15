import {RouteRecordRaw} from "vue-router";

export const webRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@pages/index.vue')
    },
    {
        path: '/projects/:id',
        component: () => import('@pages/projects/index.vue')
    },
    {
        path: '/discovery',
        component: () => import('@pages/discovery/index.vue')
    },
    {
        path: '/test',
        component: () => import('@pages/test/index.vue')
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
    }
]
