/* You version is:pkg-version Build Date:2021-7-5 16:36:56*/
/* 用于保存弹窗ref */
let routerView = null;
/* 渲染点中将会渲染的组件 */
let componentMap = null;
/* 下一个需要渲染的组件name */
let to = "";
/* 上一个需要back的组件name */
let from = "";
/* 是否为渲染点第一个挂载的组件，用于routerRecords 的记录判断 */
let isEntry = true;
/* 逆向传参回调 */
let callback = null;
/* 组件渲染记录 history */
const routerRecords = [];
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
    function next(options) {
        /* name用于记录访问历史（唯一映射），isCache 标识是否内部keep-alive，params混入组件props */
        const { name, isCache = true, params, callbackOfReturnThisPage = null } = options;
        /* 校验路由表表 */
        if (componentMap && !componentMap[name]) {
            console.warn("miniRouter", `路由映射表中并不存在 name 为${name}的组件，请检查组件 name 是否与路由表中一致`);
            return;
        }
        /* ts推断非空校验 */
        if (!routerView || !componentMap) {
            return;
        }
        to = name;
        from = routerView.getCurrentComponentName();
        isEntry && routerRecords.push(from);
        isEntry = false;
        callback = callbackOfReturnThisPage;
        /* 记录组件访问记录 */
        routerRecords.push(to);
        /* 渲染目标组件 */
        routerView.update({
            component: componentMap[name].component,
            isCache,
            params,
            name
        });
    }
    /* 返回并渲染上一个组件 */
    const back = (params) => {
        /* 校验 */
        if (routerRecords.length === 0) {
            console.warn("miniRouter", "路由历史记录为空，不能执行返回操作");
            return;
        }
        /* ts推断非空校验 */
        if (!routerView || !componentMap) {
            return;
        }
        /* 从何处来 */
        from = routerRecords.pop();
        /* 到何处去 */
        to = routerRecords.slice(-1)[0];
        /* 调用挂载替换点的更新方法 */
        routerView.update({
            component: componentMap[to].component,
            name: to
        });
        if (callback) {
            callback(params);
            callback = null;
        }
    };
    /* 注册指定渲染点，保存的是一个弹窗wrapper组件的ref */
    const registerReplacePoint = (renderComponentRef) => {
        routerView = renderComponentRef;
    };
    /* 一定要每次手动在业务组件内set一次，否则componentMap = null */
    const setComponentMap = (val) => {
        /* 重置路由 */
        miniRouteWillDestroy();
        componentMap = val;
    };
    /* 找到一个对应名称的路由（组件） */
    const find = (name) => {
        if (!componentMap) {
            return;
        }
        return componentMap[name];
    };
    const has = (name) => {
        return Object.prototype.hasOwnProperty.call(componentMap, name);
    };
    const getRouterRecords = () => {
        return routerRecords;
    };
    const miniRouteWillDestroy = () => {
        routerView = null;
        componentMap = null;
        to = "";
        from = "";
        routerRecords.length = 0;
        isEntry = true;
        callback = null;
    };
    return {
        has,
        next,
        back,
        find,
        registerReplacePoint,
        setComponentMap,
        getRouterRecords
    };
}
var index = useMiniRouter();

export default index;
