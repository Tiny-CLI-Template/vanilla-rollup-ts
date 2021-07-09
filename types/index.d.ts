declare type VueComponent = Record<string, any>;
interface ComponentMapItem {
    title: string;
    name: string;
    component: VueComponent;
}
interface ComponentMeta {
    name: string;
    isCache?: true;
    params?: any;
    callbackOfReturnThisPage?: CallBack;
}
interface IComponentMaps {
    [key: string]: ComponentMapItem;
}
declare type ComponentMap = IComponentMaps | null;
declare type RouterRecords = Array<string>;
declare type VueComponentRef = Record<string, any> | null;
declare type CallBack = null | ((params?: any) => void);
export declare function useMiniRouter(): {
    has: (name: string) => boolean;
    next: (options: ComponentMeta) => void;
    back: (params?: any) => void;
    find: (name: string) => ComponentMapItem | undefined;
    registerReplacePoint: (renderComponentRef: VueComponentRef) => void;
    setComponentMap: (val: ComponentMap) => void;
    getRouterRecords: () => RouterRecords;
};
export {};
