import {RouteRecordRaw} from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@pages/index.vue'),
        meta: {
            layout: 'blank'
        }
    }
]
