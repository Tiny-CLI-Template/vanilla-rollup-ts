declare type VueComponent = Record<string, any>

interface ComponentMapItem {
  title: string
  name: string
  component: VueComponent
}
export interface ComponentMeta {
  name: string
  isCache?: true
  params?: any
}
export interface IComponentMaps {
  [key: string]: ComponentMapItem
}

export declare type ComponentMap = IComponentMaps | null
export declare type RouterRecords = Array<string>
export declare type VueComponentRef = Record<string, any> | null

interface DialogMiniRouterMethods {
  has: (name: string) => boolean
  next: (options: ComponentMeta) => void
  back: () => void
  find: (name: string) => ComponentMapItem | undefined
  registerReplacePoint: (renderComponentRef: VueComponentRef) => void
  setComponentMap: (val: ComponentMap) => void
  getRouterRecords: () => RouterRecords
}
export function useMiniRouter(): DialogMiniRouterMethods
