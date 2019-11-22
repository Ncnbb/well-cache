import { WellCacheProps } from './propsType';
declare class WellCache {
    private prefix;
    private mode;
    constructor(opt?: WellCacheProps);
    private initModa;
    private onerror;
    save(key: string, data: string | object, callback?: Function): Promise<any>;
    get(key: string, conditions?: object, callback?: Function): Promise<any>;
    has(key: string, conditions?: object, callback?: Function): void;
    remove(key: string, callback?: Function): Promise<void>;
}
export default WellCache;
