"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _util = require("./util");

var _ls = require("./ls");

var _ss = require("./ss");

var _IDB = require("./IDB");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = _promise["default"]))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof _symbol["default"] === "function" && (g[_iterator["default"]] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var WellCache =
/** @class */
function () {
  function WellCache(opt) {
    if (opt === void 0) {
      opt = {};
    }

    this.prefix = opt.prefix || 'wc';
    this.mode = opt.mode || this.initModa(); // this.IDB = null;
  }

  WellCache.prototype.initModa = function () {
    // 根据当前环境判断使用什么模式进行存储
    if (window.indexedDB && window.indexedDB.open) {
      return 'IDB';
    }

    return 'ls';
  };

  WellCache.prototype.onerror = function (err) {
    console.error(err.stack);
  };

  WellCache.prototype.save = function (key, data, callback) {
    if ((0, _util.isNoTransmission)(key) || !(0, _util.isString)(key)) {
      this.onerror(new Error('key must be string, this current key is null'));
      return;
    } else if ((0, _util.isEmptyString)(key)) {
      this.onerror(new Error('key must be string, this current key is empty string'));
      return;
    }

    if ((0, _util.isNoTransmission)(data)) {
      this.onerror(new Error('data must be string or object, this current data is null'));
      return;
    } else if ((0, _util.isString)(data) && (0, _util.isEmptyString)(data) || (0, _util.isObject)(data) && (0, _util.isEmptyObject)(data)) {
      this.onerror(new Error('data must be string or object, this current data is empty'));
      return;
    }

    var saveKey = this.prefix + "-" + key;
    var result = null;

    switch (this.mode) {
      case 'IDB':
        result = _IDB.IDB_save.call(this, saveKey, data, callback);
        break;

      case 'ls':
        result = _ls.ls_save.call(this, saveKey, data);
        break;

      case 'ss':
        result = _ss.ss_save.call(this, saveKey, data);
        break;
    }

    if (this.mode != 'IDB') {
      callback && (0, _util.isFunction)(callback) && callback({
        name: saveKey,
        isOk: result
      });
    }
  };

  WellCache.prototype.get = function (key, conditions, callback) {
    if (!(0, _util.isString)(key)) {
      this.onerror(new Error('key must be string, this current key is null'));
      return;
    } else if ((0, _util.isEmptyString)(key)) {
      this.onerror(new Error('key must be string, this current key is empty string'));
      return;
    }

    if ((0, _util.isFunction)(conditions)) {
      callback = conditions;
    }

    var saveKey = this.prefix + "-" + key;
    var result = null;

    switch (this.mode) {
      case 'IDB':
        result = _IDB.IDB_get.call(this, saveKey, conditions, callback);
        break;

      case 'ls':
        result = _ls.ls_get.call(this, saveKey, conditions);
        break;

      case 'ss':
        result = _ss.ss_get.call(this, saveKey, conditions);
        break;
    }

    if (this.mode != 'IDB') {
      callback && (0, _util.isFunction)(callback) && callback(result);
    }
  };

  WellCache.prototype.has = function (key, conditions, callback) {
    if (!(0, _util.isString)(key)) {
      this.onerror(new Error('key must be string, this current key is null'));
      return;
    } else if ((0, _util.isEmptyString)(key)) {
      this.onerror(new Error('key must be string, this current key is empty string'));
      return;
    }

    if ((0, _util.isFunction)(conditions)) {
      callback = conditions;
    }

    var saveKey = this.prefix + "-" + key;
    var result = null;

    switch (this.mode) {
      case 'IDB':
        result = _IDB.IDB_has.call(this, saveKey, conditions, callback);
        break;

      case 'ls':
        result = _ls.ls_has.call(this, saveKey, conditions);
        break;

      case 'ss':
        result = _ss.ss_has.call(this, saveKey, conditions);
        break;
    }

    if (this.mode != 'IDB') {
      callback && (0, _util.isFunction)(callback) && callback(result);
    }
  };

  WellCache.prototype.remove = function (key, callback) {
    if (!(0, _util.isString)(key)) {
      this.onerror(new Error('key must be string, this current key is null'));
      return;
    } else if ((0, _util.isEmptyString)(key)) {
      this.onerror(new Error('key must be string, this current key is empty string'));
      return;
    }

    var saveKey = this.prefix + "-" + key;
    var result = null;

    switch (this.mode) {
      case 'IDB':
        result = _IDB.IDB_remove.call(this, saveKey, callback);
        break;

      case 'ls':
        result = _ls.ls_remove.call(this, saveKey);
        break;

      case 'ss':
        result = _ss.ss_remove.call(this, saveKey);
        break;
    }

    if (this.mode != 'IDB') {
      callback && (0, _util.isFunction)(callback) && callback({
        isOk: result
      });
    }
  }; // async


  WellCache.prototype.saveSync = function (key, data) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        return [2
        /*return*/
        , new _promise["default"](function (resolve) {
          _this.save(key, data, function (result) {
            resolve(result);
          });
        })];
      });
    });
  };

  WellCache.prototype.getSync = function (key, conditions) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        return [2
        /*return*/
        , new _promise["default"](function (resolve) {
          _this.get(key, conditions, function (result) {
            resolve(result);
          });
        })];
      });
    });
  };

  WellCache.prototype.hasSync = function (key, conditions) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        return [2
        /*return*/
        , new _promise["default"](function (resolve) {
          _this.has(key, conditions, function (result) {
            resolve(result);
          });
        })];
      });
    });
  };

  WellCache.prototype.removeSync = function (key) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        return [2
        /*return*/
        , new _promise["default"](function (resolve) {
          _this.remove(key, function (result) {
            resolve(result);
          });
        })];
      });
    });
  };

  return WellCache;
}();

var _default = WellCache;
exports["default"] = _default;