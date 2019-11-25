export declare function IDB_save(key: string, data: string | object, callback?: Function): Promise<any>;
export declare function IDB_get(key: string, conditions?: object, callback?: Function): Promise<any>;
export declare function IDB_has(key: string, conditions?: object, callback?: Function): Promise<any>;
export declare function IDB_remove(key: string, callback?: Function): Promise<void>;
