import { isUndefined, isNull, isObject, isFunction } from 'util';

function openDB(storeName: string): Promise<{IDB: IDBOpenDBRequest, DB: IDBDatabase | null}> {
    return new Promise((resolve) => {
        const IDB: IDBOpenDBRequest = indexedDB.open(this.prefix);
        let DB: IDBDatabase | null = null;
    
        IDB.onerror = (e: any) => {
            if ( e && e.currentTarget && e.currentTarget.error && e.currentTarget.error.message ) {
                this.onerror(new Error(e.currentTarget.error.message));
            } else {
                this.onerror(new Error('open indexDB error'));
            }
            resolve({
                IDB,
                DB: null
            });
        };
    
        IDB.onsuccess = function (e: any) {
            DB = e.target.result;
            resolve({
                IDB,
                DB
            });
        };
    
        IDB.onupgradeneeded = function (e: any) {
            DB = e.target.result;
            if (DB && !DB.objectStoreNames.contains(storeName)) {
                //如果表格不存在，创建一个新的表格（keyPath，主键 ； autoIncrement,是否自增），会返回一个对象（objectStore）
                DB.createObjectStore(storeName, {
                    keyPath: "type",
                    autoIncrement: true
                });
            }
        };
    }); 
} 

export async function IDB_save(key: string, data: string | object, callback?: Function): Promise<any> {
    const fn = function(result) {
        callback && isFunction(callback) && callback({
            name: key,
            isOk: result
        });
    }

    const storeName = `${this.prefix}-db`;
    if ( isUndefined(this.IDB) || isNull(this.IDB) || this.IDB.readyState != 'done' ) {
        const result = await openDB.call(this, storeName);
        if ( result ) {
            const { IDB, DB } = result;
            this.IDB = IDB;
            this.DB = DB;
        }
    }

    try {
        const transaction = this.DB.transaction( storeName, 'readwrite' );
        const store = transaction.objectStore( storeName );

        const request = store.get( key );

        request.onsuccess = function () {
            if ( request.result ) {
                const request = store.put( {
                    data,
                    type: key
                } );
                request.onsuccess = function () {
                    fn(true);
                };
    
                request.onerror = function () {
                    fn(true);
                }
            } else {
                const request = store.add( {
                    data,
                    type: key
                } );
                request.onsuccess = function () {
                    fn(true);
                };
    
                request.onerror = function () {
                    fn(true);
                }
            }
        };
        request.onerror = function() {
            this.onerror(new Error('save data to indexDB error'));
            fn(true);
        }
    } catch ( err ) {
        this.onerror(err);
        fn(true);
    }
}

export async function IDB_get(key: string, conditions?: object, callback?: Function): Promise<any> {
    const fn = function(result) {
        callback && isFunction(callback) && callback(result);
    }

    const storeName = `${this.prefix}-db`;
    if ( isUndefined(this.IDB) || isNull(this.IDB) || this.IDB.readyState != 'done' ) {
        const result = await openDB.call(this, storeName);
        if ( result ) {
            const { IDB, DB } = result;
            this.IDB = IDB;
            this.DB = DB;
        }
    }

    try {
        const transaction = this.DB.transaction( storeName, 'readwrite' );
        const store = transaction.objectStore( storeName );
        const request = store.get( key );
        let data: object | null = null;
        request.onsuccess = function () {

            if ( request.result ) {

                data = request.result.data;

                if ( data && isObject(conditions)) {
                    if ( isObject(data) ) {
                        for ( let key in conditions ) {
                            if ( data && conditions[key] != (<object>data[key]) ) {
                                data = null;
                                break;
                            }
                        }
                    }
                }
                fn({
                    isOk: true,
                    data: data
                })
            } else {
                fn({
                    isOk: false,
                    data: null
                })
            }
        };
        request.onerror = function() {
            this.onerror(new Error('save data to indexDB error'));
            fn({
                isOk: false,
                data: null
            })
        }
    } catch ( err ) {
        this.onerror(err);
        fn({
            isOk: false,
            data: null
        })
    }
}

export async function IDB_has(key: string, conditions?: object, callback?: Function): Promise<any> {

    const fn = function(result) {
        callback && isFunction(callback) && callback(result);
    }

    const storeName = `${this.prefix}-db`;
    if ( isUndefined(this.IDB) || isNull(this.IDB) || this.IDB.readyState != 'done' ) {
        const result = await openDB.call(this, storeName);
        if ( result ) {
            const { IDB, DB } = result;
            this.IDB = IDB;
            this.DB = DB;
        } else {
            return;
        }
    }

    try {
        const transaction = this.DB.transaction( storeName, 'readwrite' );
        const store = transaction.objectStore( storeName );
        const request = store.get( key );
        let haveData: boolean = true;
        let data: object | null = null;
        request.onsuccess = function () {
            if ( request.result ) {
                data = request.result.data;
                if ( data && isObject(conditions)) {
                    if ( isObject(data) ) {
                        for ( let key in conditions ) {
                            if ( data && conditions[key] != (<object>data[key]) ) {
                                data = null;
                                haveData = false;
                                break;
                            }
                        }
                    }
                }
                fn(haveData);
            } else {
                fn(false);
            }
        };
        request.onerror = function() {
            this.onerror(new Error('save data to indexDB error'));
            fn(false);
        }
    } catch ( err ) {
        this.onerror(err);
        fn(false);
    }
}

export async function IDB_remove(key: string, callback?: Function) {
    const fn = function(result) {
        callback && isFunction(callback) && callback({
            isOk: result
        });
    }

    const storeName = `${this.prefix}-db`;
    if ( isUndefined(this.IDB) || isNull(this.IDB) || this.IDB.readyState != 'done' ) {
        const result = await openDB.call(this, storeName);
        if ( result ) {
            const { IDB, DB } = result;
            this.IDB = IDB;
            this.DB = DB;
        } else {
            return;
        }
    }

    try {
        const transaction = this.DB.transaction( storeName, 'readwrite' );
        const store = transaction.objectStore( storeName );
        store.delete( key );
        fn(true);
    } catch ( err ) {
        this.onerror(err);
        fn(false);
    }
}