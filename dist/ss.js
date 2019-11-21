import { isObject } from './util';
export function ss_save(key, data) {
    try {
        var saveData = isObject(data) ? JSON.stringify(data) : data;
        window.sessionStorage.setItem(key, saveData);
        return true;
    }
    catch (err) {
        this.onerror(err);
        return false;
    }
}
export function ss_get(key, conditions) {
    var ss_data = null;
    try {
        ss_data = window.sessionStorage.getItem(key);
        ss_data = ss_data ? JSON.parse(ss_data) : null;
        // has conditions
        if (ss_data && isObject(conditions)) {
            // data must be object
            if (isObject(ss_data)) {
                for (var key_1 in conditions) {
                    if (ss_data && conditions[key_1] != ss_data[key_1]) {
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
    }
    catch (err) {
        this.onerror(err);
        return {
            isOk: false,
            data: ss_data || null
        };
    }
}
export function ss_has(key, conditions) {
    var ss_data = null;
    var haveData = true;
    try {
        ss_data = window.sessionStorage.getItem(key);
        ss_data = ss_data ? JSON.parse(ss_data) : null;
        if (!ss_data)
            return false;
        // has conditions
        if (ss_data && isObject(conditions)) {
            // data must be object
            if (isObject(ss_data)) {
                for (var key_2 in conditions) {
                    if (ss_data && conditions[key_2] != ss_data[key_2]) {
                        ss_data = null;
                        haveData = false;
                        break;
                    }
                }
            }
        }
        return haveData;
    }
    catch (err) {
        this.onerror(err);
        return false;
        ;
    }
}
export function ss_remove(key) {
    try {
        window.sessionStorage.removeItem(key);
        return true;
    }
    catch (err) {
        this.onerror(err);
        return false;
    }
}
