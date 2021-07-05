/* *
 * 局部路由工具配合 dialog-view 使用
 * 以下概念组件和路由可以替换
 * 路由 - 组件
 * 弹窗 - 渲染点
 * */
declare type VueComponent = Record<string, any>
interface ComponentMapItem {
  title: string
  name: string
  component: VueComponent
}
interface ComponentMeta {
  name: string
  isCache?: true
  params?: any
  callbackOfReturnThisPage?: CallBack
}
interface IComponentMaps {
  [key: string]: ComponentMapItem
}

declare type ComponentMap = IComponentMaps | null
declare type RouterRecords = Array<string>
declare type VueComponentRef = Record<string, any> | null
declare type CallBack = null | ((params?: any) => void)
interface DialogMiniRouterMethods {
  has: (name: string) => boolean
  next: (options: ComponentMeta) => void
  back: (params?: any) => void
  find: (name: string) => ComponentMapItem | undefined
  registerReplacePoint: (renderComponentRef: VueComponentRef) => void
  setComponentMap: (val: ComponentMap) => void
  getRouterRecords: () => RouterRecords
}



/* 用于保存弹窗ref */
let routerView: VueComponentRef = null
/* 渲染点中将会渲染的组件 */
let componentMap: ComponentMap = null
/* 下一个需要渲染的组件name */
let to = ""
/* 上一个需要back的组件name */
let from = ""
/* 是否为渲染点第一个挂载的组件，用于routerRecords 的记录判断 */
let isEntry = true
/* 逆向传参回调 */
let callback: CallBack = null
/* 组件渲染记录 history */
const routerRecords: RouterRecords = []
/* 调试专用 */
// window.mr = new Proxy(
//   {},
//   {
//     get() {
//       return {
//         to,
//         from,
//         routerRecords
//       };
//     }
//   }
// );

function useMiniRouter() {
  /**
   * 渲染下一个组件
   * @param {Object} options
   */
  function next(options: ComponentMeta) {
    /* name用于记录访问历史（唯一映射），isCache 标识是否内部keep-alive，params混入组件props */
    const { name, isCache = true, params, callbackOfReturnThisPage = null } = options
    /* 校验路由表表 */
    if (componentMap && !componentMap[name]) {
      console.warn(
        "miniRouter",
        `路由映射表中并不存在 name 为${name}的组件，请检查组件 name 是否与路由表中一致`
      )
      return
    }
    /* ts推断非空校验 */
    if (!routerView || !componentMap) {
      return
    }
    to = name
    from = routerView!.getCurrentComponentName()
    isEntry && routerRecords.push(from)
    isEntry = false
    callback = callbackOfReturnThisPage
    /* 记录组件访问记录 */
    routerRecords.push(to)
    /* 渲染目标组件 */
    routerView.update({
      component: componentMap[name].component,
      isCache,
      params,
      name
    })
  }
  /* 返回并渲染上一个组件 */
  const back = (params?: any) => {
    /* 校验 */
    if (routerRecords.length === 0) {
      console.warn("miniRouter", "路由历史记录为空，不能执行返回操作")
      return
    }
    /* ts推断非空校验 */
    if (!routerView || !componentMap) {
      return
    }
    /* 从何处来 */
    from = routerRecords.pop() as string
    /* 到何处去 */
    to = routerRecords.slice(-1)[0]
    /* 调用挂载替换点的更新方法 */
    routerView.update({
      component: componentMap[to].component,
      name: to
    })
    if (callback) {
      callback(params)
      callback = null
    }
  }
  /* 注册指定渲染点，保存的是一个弹窗wrapper组件的ref */
  const registerReplacePoint = (renderComponentRef: VueComponentRef) => {
    routerView = renderComponentRef
  }
  /* 一定要每次手动在业务组件内set一次，否则componentMap = null */
  const setComponentMap = (val: ComponentMap) => {
    /* 重置路由 */
    miniRouteWillDestroy()
    componentMap = val
  }
  /* 找到一个对应名称的路由（组件） */
  const find = (name: string) => {
    if (!componentMap) {
      return
    }
    return componentMap[name]
  }
  const has = (name: string) => {
    return Object.prototype.hasOwnProperty.call(componentMap, name)
  }
  const getRouterRecords = () => {
    return routerRecords
  }
  const miniRouteWillDestroy = () => {
    routerView = null
    componentMap = null
    to = ""
    from = ""
    routerRecords.length = 0
    isEntry = true
    callback = null
  }
  return {
    has,
    next,
    back,
    find,
    registerReplacePoint,
    setComponentMap,
    getRouterRecords
  }
}

export default useMiniRouter()
