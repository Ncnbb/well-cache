import { WellCacheProps } from './propsType';
import { isObject, isString, isEmptyString, isNoTransmission, isEmptyObject, isFunction } from './util';
import { ls_save, ls_get, ls_has, ls_remove } from './ls';
import { ss_save, ss_get, ss_has, ss_remove } from './ss';
import { IDB_save, IDB_get, IDB_has, IDB_remove } from './IDB';

class WellCache {
    private prefix: string
    private mode: string

    constructor(opt: WellCacheProps = {}) {
        this.prefix = opt.prefix || 'wc';
        this.mode = opt.mode || this.initModa();
        // this.IDB = null;
    }

    private initModa(): 'ls' | 'IDB' {
        // 根据当前环境判断使用什么模式进行存储
        if (window.indexedDB && window.indexedDB.open) {
            return 'IDB';
        }
        return 'ls';
    }

    private onerror(err: Error): void {
        console.error(err.stack);
    }

    public save(key: string, data: string | object, callback?: Function): void {
        if (isNoTransmission(key) || !isString(key)) {
            this.onerror(new Error('key must be string, this current key is null'));
            return;
        } else if (isEmptyString(key)) {
            this.onerror(new Error('key must be string, this current key is empty string'));
            return;
        }

        if (isNoTransmission(data)) {
            this.onerror(new Error('data must be string or object, this current data is null'));
            return;
        } else if ((isString(data) && isEmptyString(data)) || (isObject(data) && isEmptyObject(data))) {
            this.onerror(new Error('data must be string or object, this current data is empty'));
            return;
        }

        const saveKey = `${this.prefix}-${key}`;
        let result = null;
        switch (this.mode) {
            case 'IDB': result = IDB_save.call(this, saveKey, data, callback); break;
            case 'ls': result = ls_save.call(this, saveKey, data); break;
            case 'ss': result = ss_save.call(this, saveKey, data); break;
        }

        if ( this.mode != 'IDB' ) {
            callback && isFunction(callback) && callback({
                name: saveKey,
                isOk: result
            });
        }
    }

    public get(key: string, conditions?: object, callback?: Function): void {
        if (!isString(key)) {
            this.onerror(new Error('key must be string, this current key is null'));
            return;
        } else if (isEmptyString(key)) {
            this.onerror(new Error('key must be string, this current key is empty string'));
            return;
        }

        if (isFunction(conditions)) {
            callback = (<Function>conditions);
        }

        const saveKey = `${this.prefix}-${key}`;
        let result = null;
        switch (this.mode) {
            case 'IDB': result = IDB_get.call(this, saveKey, conditions, callback); break;
            case 'ls': result = ls_get.call(this, saveKey, conditions); break;
            case 'ss': result = ss_get.call(this, saveKey, conditions); break;
        }

        if ( this.mode != 'IDB' ) {
            callback && isFunction(callback) && callback(result);
        }

    }

    public has(key: string, conditions?: object, callback?: Function): void {
        if (!isString(key)) {
            this.onerror(new Error('key must be string, this current key is null'));
            return;
        } else if (isEmptyString(key)) {
            this.onerror(new Error('key must be string, this current key is empty string'));
            return;
        }

        if (isFunction(conditions)) {
            callback = (<Function>conditions);
        }

        const saveKey = `${this.prefix}-${key}`;
        let result = null;
        switch (this.mode) {
            case 'IDB': result = IDB_has.call(this, saveKey, conditions, callback); break;
            case 'ls': result = ls_has.call(this, saveKey, conditions); break;
            case 'ss': result = ss_has.call(this, saveKey, conditions); break;
        }

        if ( this.mode != 'IDB' ) {
            callback && isFunction(callback) && callback(result);
        }
    }

    public remove(key: string, callback?: Function) {
        if (!isString(key)) {
            this.onerror(new Error('key must be string, this current key is null'));
            return;
        } else if (isEmptyString(key)) {
            this.onerror(new Error('key must be string, this current key is empty string'));
            return;
        }

        const saveKey = `${this.prefix}-${key}`;
        let result = null;
        switch (this.mode) {
            case 'IDB': result = IDB_remove.call(this, saveKey, callback); break;
            case 'ls': result = ls_remove.call(this, saveKey); break;
            case 'ss': result = ss_remove.call(this, saveKey); break;
        }

        if ( this.mode != 'IDB' ) {
            callback && isFunction(callback) && callback({
                isOk: result
            });
        }
    }

    // async
    public async saveSync(key: string, data: string | object): Promise<any> {
        return new Promise((resolve) => {
            this.save(key, data, (result) => {
                resolve(result);
            });
        });
    }
    public async getSync(key: string, conditions?: object): Promise<any> {
        return new Promise((resolve) => {
            this.get(key, conditions, (result) => {
                resolve(result);
            });
        });
    }
    public async hasSync(key: string, conditions?: object): Promise<any> {
        return new Promise((resolve) => {
            this.has(key, conditions, (result) => {
                resolve(result);
            });
        });
    }
    public async removeSync(key: string): Promise<any> {
        return new Promise((resolve) => {
            this.remove(key, (result) => {
                resolve(result);
            });
        });
    }
}


export default WellCache;