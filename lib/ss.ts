import { isObject } from './util';

export function ss_save(key: string, data: string | object): boolean {
    try {
        const saveData: string = isObject(data) ? (<string>JSON.stringify(data)) : (<string>data) ;
        window.sessionStorage.setItem(key, saveData);
        return true;
    } catch (err) {
        this.onerror(err);
        return false;
    }
}
export function ss_get(key: string, conditions?: object): any { 
    let ss_data: string | null = null;
    try {
        ss_data = window.sessionStorage.getItem(key);
        ss_data = ss_data ? JSON.parse(ss_data) : null;
        // has conditions
        if ( ss_data && isObject(conditions)) {
            
            // data must be object
            if ( isObject(ss_data) ) {
                for ( let key in conditions ) {
                    if ( ss_data && conditions[key] != ss_data[key] ) {
                        ss_data = null;
                        break;
                    }
                }
            }
        }

        return {
            isOk: true,
            data: ss_data || null
        };
    } catch (err) {
        this.onerror(err);
        return {
            isOk: false,
            data: ss_data || null
        };
    }
}
export function ss_has(key: string, conditions?: object): boolean { 
    let ss_data: string | null = null;
    let haveData: boolean = true;
    try {
        ss_data = window.sessionStorage.getItem(key);
        ss_data = ss_data ? JSON.parse(ss_data) : null;

        if ( !ss_data ) return false;

        // has conditions
        if ( ss_data && isObject(conditions)) {
            
            // data must be object
            if ( isObject(ss_data) ) {
                for ( let key in conditions ) {
                    if ( ss_data && conditions[key] != ss_data[key] ) {
                        ss_data = null;
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

export function ss_remove(key: string): boolean{ 
    try {
        window.sessionStorage.removeItem(key);
        return true;
    } catch (err) {
        this.onerror(err);
        return false;
    }
}