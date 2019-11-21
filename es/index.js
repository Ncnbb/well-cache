import { isObject, isString, isEmptyString, isNoTransmission, isEmptyObject, isFunction } from './util';
import { ls_save, ls_get, ls_has, ls_remove } from './ls';
import { ss_save, ss_get, ss_has, ss_remove } from './ss';
var WellCache = /** @class */ (function () {
    function WellCache(opt) {
        if (opt === void 0) { opt = {}; }
        this.prefix = opt.prefix || 'wc';
        this.mode = opt.mode || this.initModa();
    }
    WellCache.prototype.initModa = function () {
        // 根据当前环境判断使用什么模式进行存储
        if (window.indexedDB && window.indexedDB.open) {
            return 'indexDB';
        }
        return 'ls';
    };
    WellCache.prototype.onerror = function (err) {
        console.log(err.name);
        console.log(err.message);
        console.log(err.stack);
    };
    WellCache.prototype.save = function (key, data, callback) {
        if (isNoTransmission(key) || !isString(key)) {
            this.onerror(new Error('key must be string, this current key is null'));
            return;
        }
        else if (isEmptyString(key)) {
            this.onerror(new Error('key must be string, this current key is empty string'));
            return;
        }
        if (isNoTransmission(data)) {
            this.onerror(new Error('data must be string or object, this current data is null'));
            return;
        }
        else if ((isString(data) && isEmptyString(data)) || (isObject(data) && isEmptyObject(data))) {
            this.onerror(new Error('data must be string or object, this current data is empty'));
            return;
        }
        var saveKey = this.prefix + "-" + key;
        var result = null;
        switch (this.mode) {
            case 'ls':
                result = ls_save.call(this, saveKey, data);
                break;
            case 'ss':
                result = ss_save.call(this, saveKey, data);
                break;
        }
        callback && isFunction(callback) && callback({
            name: saveKey,
            isOk: result
        });
    };
    WellCache.prototype.get = function (key, conditions, callback) {
        if (!isString(key)) {
            this.onerror(new Error('key must be string, this current key is null'));
            return;
        }
        else if (isEmptyString(key)) {
            this.onerror(new Error('key must be string, this current key is empty string'));
            return;
        }
        if (isFunction(conditions)) {
            callback = conditions;
        }
        var saveKey = this.prefix + "-" + key;
        var result = null;
        switch (this.mode) {
            case 'ls':
                result = ls_get.call(this, saveKey, conditions);
                break;
            case 'ss':
                result = ss_get.call(this, saveKey, conditions);
                break;
        }
        callback && isFunction(callback) && callback(result);
    };
    WellCache.prototype.has = function (key, conditions, callback) {
        if (!isString(key)) {
            this.onerror(new Error('key must be string, this current key is null'));
            return;
        }
        else if (isEmptyString(key)) {
            this.onerror(new Error('key must be string, this current key is empty string'));
            return;
        }
        if (isFunction(conditions)) {
            callback = conditions;
        }
        var saveKey = this.prefix + "-" + key;
        var result = null;
        switch (this.mode) {
            case 'ls':
                result = ls_has.call(this, saveKey, conditions);
                break;
            case 'ss':
                result = ss_has.call(this, saveKey, conditions);
                break;
        }
        callback && isFunction(callback) && callback(result);
    };
    WellCache.prototype.remove = function (key, callback) {
        if (!isString(key)) {
            this.onerror(new Error('key must be string, this current key is null'));
            return;
        }
        else if (isEmptyString(key)) {
            this.onerror(new Error('key must be string, this current key is empty string'));
            return;
        }
        var saveKey = this.prefix + "-" + key;
        var result = null;
        switch (this.mode) {
            case 'ls':
                result = ls_remove.call(this, saveKey);
                break;
            case 'ss':
                result = ss_remove.call(this, saveKey);
                break;
        }
        callback && isFunction(callback) && callback({
            isOk: result
        });
    };
    return WellCache;
}());
export default WellCache;
