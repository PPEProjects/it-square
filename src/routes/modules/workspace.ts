import {RouteRecordRaw} from "vue-router";

export const workspaceRoutes: RouteRecordRaw[] = [
    {
        path: '/workspace/new',
        component: () => import('@pages/workspace/index.vue')
    }
]
