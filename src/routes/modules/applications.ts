import {RouteRecordRaw} from "vue-router";

export const applicationsRoutes: RouteRecordRaw[] = [
    {
        path: '/applications',
        component: () => import('@pages/applications/index.vue')
    }
]
