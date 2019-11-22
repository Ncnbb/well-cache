var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { isObject, isString, isEmptyString, isNoTransmission, isEmptyObject, isFunction } from './util';
import { ls_save, ls_get, ls_has, ls_remove } from './ls';
import { ss_save, ss_get, ss_has, ss_remove } from './ss';
import { IDB_save, IDB_get, IDB_has, IDB_remove } from './IDB';
var WellCache = /** @class */ (function () {
    function WellCache(opt) {
        if (opt === void 0) { opt = {}; }
        this.prefix = opt.prefix || 'wc';
        this.mode = opt.mode || this.initModa();
        // this.IDB = null;
    }
    WellCache.prototype.initModa = function () {
        // 根据当前环境判断使用什么模式进行存储
        if (window.indexedDB && window.indexedDB.open) {
            return 'IDB';
        }
        return 'ls';
    };
    WellCache.prototype.onerror = function (err) {
        console.log(err.name);
        console.log(err.message);
        console.log(err.stack);
    };
    WellCache.prototype.save = function (key, data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var saveKey, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (isNoTransmission(key) || !isString(key)) {
                            this.onerror(new Error('key must be string, this current key is null'));
                            return [2 /*return*/];
                        }
                        else if (isEmptyString(key)) {
                            this.onerror(new Error('key must be string, this current key is empty string'));
                            return [2 /*return*/];
                        }
                        if (isNoTransmission(data)) {
                            this.onerror(new Error('data must be string or object, this current data is null'));
                            return [2 /*return*/];
                        }
                        else if ((isString(data) && isEmptyString(data)) || (isObject(data) && isEmptyObject(data))) {
                            this.onerror(new Error('data must be string or object, this current data is empty'));
                            return [2 /*return*/];
                        }
                        saveKey = this.prefix + "-" + key;
                        result = null;
                        _a = this.mode;
                        switch (_a) {
                            case 'IDB': return [3 /*break*/, 1];
                            case 'ls': return [3 /*break*/, 3];
                            case 'ss': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, IDB_save.call(this, saveKey, data)];
                    case 2:
                        result = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        result = ls_save.call(this, saveKey, data);
                        return [3 /*break*/, 5];
                    case 4:
                        result = ss_save.call(this, saveKey, data);
                        return [3 /*break*/, 5];
                    case 5:
                        callback && isFunction(callback) && callback({
                            name: saveKey,
                            isOk: result
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    WellCache.prototype.get = function (key, conditions, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var saveKey, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isString(key)) {
                            this.onerror(new Error('key must be string, this current key is null'));
                            return [2 /*return*/];
                        }
                        else if (isEmptyString(key)) {
                            this.onerror(new Error('key must be string, this current key is empty string'));
                            return [2 /*return*/];
                        }
                        if (isFunction(conditions)) {
                            callback = conditions;
                        }
                        saveKey = this.prefix + "-" + key;
                        result = null;
                        _a = this.mode;
                        switch (_a) {
                            case 'IDB': return [3 /*break*/, 1];
                            case 'ls': return [3 /*break*/, 3];
                            case 'ss': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, IDB_get.call(this, saveKey, conditions)];
                    case 2:
                        result = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        result = ls_get.call(this, saveKey, conditions);
                        return [3 /*break*/, 5];
                    case 4:
                        result = ss_get.call(this, saveKey, conditions);
                        return [3 /*break*/, 5];
                    case 5:
                        callback && isFunction(callback) && callback(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    WellCache.prototype.has = function (key, conditions, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var saveKey, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isString(key)) {
                            this.onerror(new Error('key must be string, this current key is null'));
                            return [2 /*return*/];
                        }
                        else if (isEmptyString(key)) {
                            this.onerror(new Error('key must be string, this current key is empty string'));
                            return [2 /*return*/];
                        }
                        if (isFunction(conditions)) {
                            callback = conditions;
                        }
                        saveKey = this.prefix + "-" + key;
                        result = null;
                        _a = this.mode;
                        switch (_a) {
                            case 'IDB': return [3 /*break*/, 1];
                            case 'ls': return [3 /*break*/, 3];
                            case 'ss': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, IDB_has.call(this, saveKey, conditions)];
                    case 2:
                        result = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        result = ls_has.call(this, saveKey, conditions);
                        return [3 /*break*/, 5];
                    case 4:
                        result = ss_has.call(this, saveKey, conditions);
                        return [3 /*break*/, 5];
                    case 5:
                        callback && isFunction(callback) && callback(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    WellCache.prototype.remove = function (key, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var saveKey, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isString(key)) {
                            this.onerror(new Error('key must be string, this current key is null'));
                            return [2 /*return*/];
                        }
                        else if (isEmptyString(key)) {
                            this.onerror(new Error('key must be string, this current key is empty string'));
                            return [2 /*return*/];
                        }
                        saveKey = this.prefix + "-" + key;
                        result = null;
                        _a = this.mode;
                        switch (_a) {
                            case 'IDB': return [3 /*break*/, 1];
                            case 'ls': return [3 /*break*/, 3];
                            case 'ss': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, IDB_remove.call(this, saveKey)];
                    case 2:
                        result = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        result = ls_remove.call(this, saveKey);
                        return [3 /*break*/, 5];
                    case 4:
                        result = ss_remove.call(this, saveKey);
                        return [3 /*break*/, 5];
                    case 5:
                        callback && isFunction(callback) && callback({
                            isOk: result
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return WellCache;
}());
export default WellCache;
