// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'default' | 'blank' | string
    public?: boolean
  }
}
