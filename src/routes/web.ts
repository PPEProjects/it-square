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
    }
]
