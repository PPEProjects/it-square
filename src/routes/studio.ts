import {RouteRecordRaw} from "vue-router"

const adminRoutes: RouteRecordRaw[] = [
    {
        path: '/studio/admin/categories',
        component: () => import('@pages/admin/categories/index.vue')
    },
    {
        path: '/studio/admin/technologies',
        component: () => import('@pages/admin/technologies/index.vue')
    }
]

const routes: RouteRecordRaw[] = [
    {
        path: '/studio',
        component: () => import('@pages/studio/index.vue'),
        meta: {
            title: 'Tổng Quan'
        },
        children: [
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
            },
            ...adminRoutes
        ]
    }
]

// routes.forEach((record) => {
//     record.meta = Object.assign({}, record.meta, {
//         layout: 'studio'
//     })
// })

export const studioRoutes: RouteRecordRaw[] = routes
