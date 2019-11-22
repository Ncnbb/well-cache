import { isUndefined, isNull, isObject } from 'util';

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

export async function IDB_save(key: string, data: string | object): Promise<any> {
    return new Promise(async (resolve) => {

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
    
            request.onsuccess = function () {
                if ( request.result ) {
                    const request = store.put( {
                        data,
                        type: key
                    } );
                    request.onsuccess = function () {
                        resolve(true);
                    };
        
                    request.onerror = function () {
                        resolve(false);
                    }
                } else {
                    const request = store.add( {
                        data,
                        type: key
                    } );
                    request.onsuccess = function () {
                        resolve(true);
                    };
        
                    request.onerror = function () {
                        resolve(false);
                    }
                }
            };
            request.onerror = function() {
                this.onerror(new Error('save data to indexDB error'));
                resolve(false);
            }
        } catch ( err ) {
            this.onerror(err);
            resolve(false);
        }
    });
}

export async function IDB_get(key: string, conditions?: object): Promise<any> {
    return new Promise(async (resolve) => {

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
                    resolve({
                        isOk: true,
                        data: data
                    });
                } else {
                    resolve({
                        isOk: false,
                        data: null
                    });
                }
            };
            request.onerror = function() {
                this.onerror(new Error('save data to indexDB error'));
                resolve({
                    isOk: false,
                    data: null
                });
            }
        } catch ( err ) {
            this.onerror(err);
            resolve({
                isOk: false,
                data: null
            });
        }
    });
}

export async function IDB_has(key: string, conditions?: object): Promise<any> {
    return new Promise(async (resolve) => {

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
                    resolve(haveData);
                } else {
                    resolve(false);
                }
            };
            request.onerror = function() {
                this.onerror(new Error('save data to indexDB error'));
                resolve(false);
            }
        } catch ( err ) {
            this.onerror(err);
            resolve(false);
        }
    });
}

export function IDB_remove(key: string) {
    return new Promise(async (resolve) => {
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
            console.log(store)
            store.delete( key );
            resolve( true );
        } catch ( err ) {
            this.onerror(err);
            resolve( false );
        }
    })
}