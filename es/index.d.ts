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
}
export default WellCache;
