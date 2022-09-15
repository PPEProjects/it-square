import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/studio',
        component: () => import('@pages/studio/index.vue'),
        meta: {
            title: 'Tổng Quan'
        }
    },
    {
        path: '/studio/projects',
        component: () => import('@pages/studio/projects/index.vue'),
        meta: {
            title: 'Dự Án'
        }
    },
    {
        path: '/studio/new-project',
        component: () => import('@pages/studio/new/index.vue')
    }
]

routes.forEach((record) => {
    record.meta = Object.assign({}, record.meta, {
        layout: 'studio'
    })
})

export const studioRoutes: RouteRecordRaw[] = routes
