import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

declare global {
    interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
      name: string
      meta: RouteMeta
      component?: Component | string
      children?: AppRouteRecordRaw[]
      props?: Recordable
      fullPath?: string
      keepAlive?: boolean
    }
  }