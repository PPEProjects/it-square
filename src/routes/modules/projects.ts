import {RouteRecordRaw} from "vue-router";

export const projectsRoutes: RouteRecordRaw[] = [
    {
        path: '/projects',
        component: () => import('@pages/projects/index.vue')
    }
]
