import { isObject } from './util';

export function ls_save(key: string, data: string | object): boolean {
    try {
        const saveData: string = isObject(data) ? (<string>JSON.stringify(data)) : (<string>data) ;
        window.localStorage.setItem(key, saveData);
        return true;
    } catch (err) {
        this.onerror(err);
        return false;
    }
}
export function ls_get(key: string, conditions?: object): any { 
    let ls_data: string | null = null;
    try {
        ls_data = window.localStorage.getItem(key);
        ls_data = ls_data ? JSON.parse(ls_data) : null;
        // has conditions
        if ( ls_data && isObject(conditions)) {
            
            // data must be object
            if ( isObject(ls_data) ) {
                for ( let key in conditions ) {
                    if ( ls_data && conditions[key] != ls_data[key] ) {
                        ls_data = null;
                        break;
                    }
                }
            }
        }

        return {
            isOk: true,
            data: ls_data || null
        };
    } catch (err) {
        this.onerror(err);
        return {
            isOk: false,
            data: ls_data || null
        };
    }
}
export function ls_has(key: string, conditions?: object): boolean { 
    let ls_data: string | null = null;
    let haveData: boolean = true;
    try {
        ls_data = window.localStorage.getItem(key);
        ls_data = ls_data ? JSON.parse(ls_data) : null;

        if ( !ls_data ) return false;

        // has conditions
        if ( ls_data && isObject(conditions)) {
            
            // data must be object
            if ( isObject(ls_data) ) {
                for ( let key in conditions ) {
                    if ( ls_data && conditions[key] != ls_data[key] ) {
                        ls_data = null;
                        haveData = false;
                        break;
                    }
                }
            }
        }

        return haveData;
    } catch (err) {
        this.onerror(err);
        return false;;
    }
}

export function ls_remove(key: string): boolean{ 
    try {
        window.localStorage.removeItem(key);
        return true;
    } catch (err) {
        this.onerror(err);
        return false;
    }
}