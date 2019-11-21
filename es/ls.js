import { isObject } from './util';
export function ls_save(key, data) {
  try {
    var saveData = isObject(data) ? JSON.stringify(data) : data;
    window.localStorage.setItem(key, saveData);
    return true;
  } catch (err) {
    this.onerror(err);
    return false;
  }
}
export function ls_get(key, conditions) {
  var ls_data = null;

  try {
    ls_data = window.localStorage.getItem(key);
    ls_data = ls_data ? JSON.parse(ls_data) : null; // has conditions

    if (ls_data && isObject(conditions)) {
      // data must be object
      if (isObject(ls_data)) {
        for (var key_1 in conditions) {
          if (ls_data && conditions[key_1] != ls_data[key_1]) {
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
export function ls_has(key, conditions) {
  var ls_data = null;
  var haveData = true;

  try {
    ls_data = window.localStorage.getItem(key);
    ls_data = ls_data ? JSON.parse(ls_data) : null;
    if (!ls_data) return false; // has conditions

    if (ls_data && isObject(conditions)) {
      // data must be object
      if (isObject(ls_data)) {
        for (var key_2 in conditions) {
          if (ls_data && conditions[key_2] != ls_data[key_2]) {
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
    return false;
    ;
  }
}
export function ls_remove(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    this.onerror(err);
    return false;
  }
}