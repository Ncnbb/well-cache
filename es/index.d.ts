import { WellCacheProps } from './propsType';
declare class WellCache {
    private prefix;
    private mode;
    constructor(opt?: WellCacheProps);
    private initModa;
    private onerror;
    save(key: string, data: string | object, callback?: Function): void;
    get(key: string, conditions?: object, callback?: Function): void;
    has(key: string, conditions?: object, callback?: Function): void;
    remove(key: string, callback?: Function): void;
    saveSync(key: string, data: string | object): Promise<any>;
    getSync(key: string, conditions?: object): Promise<any>;
    hasSync(key: string, conditions?: object): Promise<any>;
    removeSync(key: string): Promise<any>;
}
export default WellCache;
