"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.IDB_save = IDB_save;
exports.IDB_get = IDB_get;
exports.IDB_has = IDB_has;
exports.IDB_remove = IDB_remove;

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _util = require("./util");

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

function openDB(storeName) {
  var _this = this;

  return new _promise["default"](function (resolve) {
    var IDB = indexedDB.open(_this.prefix);
    var DB = null;

    IDB.onerror = function (e) {
      if (e && e.currentTarget && e.currentTarget.error && e.currentTarget.error.message) {
        _this.onerror(new Error(e.currentTarget.error.message));
      } else {
        _this.onerror(new Error('open indexDB error'));
      }

      resolve({
        IDB: IDB,
        DB: null
      });
    };

    IDB.onsuccess = function (e) {
      DB = e.target.result;
      resolve({
        IDB: IDB,
        DB: DB
      });
    };

    IDB.onupgradeneeded = function (e) {
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

function IDB_save(key, data, callback) {
  return __awaiter(this, void 0, void 0, function () {
    var fn, storeName, result, IDB, DB, transaction, store_1, request_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          fn = function fn(result) {
            callback && (0, _util.isFunction)(callback) && callback({
              name: key,
              isOk: result
            });
          };

          storeName = this.prefix + "-db";
          if (!((0, _util.isUndefined)(this.IDB) || (0, _util.isNull)(this.IDB) || this.IDB.readyState != 'done')) return [3
          /*break*/
          , 2];
          return [4
          /*yield*/
          , openDB.call(this, storeName)];

        case 1:
          result = _a.sent();

          if (result) {
            IDB = result.IDB, DB = result.DB;
            this.IDB = IDB;
            this.DB = DB;
          }

          _a.label = 2;

        case 2:
          try {
            transaction = this.DB.transaction(storeName, 'readwrite');
            store_1 = transaction.objectStore(storeName);
            request_1 = store_1.get(key);

            request_1.onsuccess = function () {
              if (request_1.result) {
                var request_2 = store_1.put({
                  data: data,
                  type: key
                });

                request_2.onsuccess = function () {
                  fn(true);
                };

                request_2.onerror = function () {
                  fn(true);
                };
              } else {
                var request_3 = store_1.add({
                  data: data,
                  type: key
                });

                request_3.onsuccess = function () {
                  fn(true);
                };

                request_3.onerror = function () {
                  fn(true);
                };
              }
            };

            request_1.onerror = function () {
              this.onerror(new Error('save data to indexDB error'));
              fn(true);
            };
          } catch (err) {
            this.onerror(err);
            fn(true);
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}

function IDB_get(key, conditions, callback) {
  return __awaiter(this, void 0, void 0, function () {
    var fn, storeName, result, IDB, DB, transaction, store, request_4, data_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          fn = function fn(result) {
            callback && (0, _util.isFunction)(callback) && callback(result);
          };

          storeName = this.prefix + "-db";
          if (!((0, _util.isUndefined)(this.IDB) || (0, _util.isNull)(this.IDB) || this.IDB.readyState != 'done')) return [3
          /*break*/
          , 2];
          return [4
          /*yield*/
          , openDB.call(this, storeName)];

        case 1:
          result = _a.sent();

          if (result) {
            IDB = result.IDB, DB = result.DB;
            this.IDB = IDB;
            this.DB = DB;
          }

          _a.label = 2;

        case 2:
          try {
            transaction = this.DB.transaction(storeName, 'readwrite');
            store = transaction.objectStore(storeName);
            request_4 = store.get(key);
            data_1 = null;

            request_4.onsuccess = function () {
              if (request_4.result) {
                data_1 = request_4.result.data;

                if (data_1 && (0, _util.isObject)(conditions)) {
                  if ((0, _util.isObject)(data_1)) {
                    for (var key_1 in conditions) {
                      if (data_1 && conditions[key_1] != data_1[key_1]) {
                        data_1 = null;
                        break;
                      }
                    }
                  }
                }

                fn({
                  isOk: true,
                  data: data_1
                });
              } else {
                fn({
                  isOk: false,
                  data: null
                });
              }
            };

            request_4.onerror = function () {
              this.onerror(new Error('save data to indexDB error'));
              fn({
                isOk: false,
                data: null
              });
            };
          } catch (err) {
            this.onerror(err);
            fn({
              isOk: false,
              data: null
            });
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}

function IDB_has(key, conditions, callback) {
  return __awaiter(this, void 0, void 0, function () {
    var fn, storeName, result, IDB, DB, transaction, store, request_5, haveData_1, data_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          fn = function fn(result) {
            callback && (0, _util.isFunction)(callback) && callback(result);
          };

          storeName = this.prefix + "-db";
          if (!((0, _util.isUndefined)(this.IDB) || (0, _util.isNull)(this.IDB) || this.IDB.readyState != 'done')) return [3
          /*break*/
          , 2];
          return [4
          /*yield*/
          , openDB.call(this, storeName)];

        case 1:
          result = _a.sent();

          if (result) {
            IDB = result.IDB, DB = result.DB;
            this.IDB = IDB;
            this.DB = DB;
          } else {
            return [2
            /*return*/
            ];
          }

          _a.label = 2;

        case 2:
          try {
            transaction = this.DB.transaction(storeName, 'readwrite');
            store = transaction.objectStore(storeName);
            request_5 = store.get(key);
            haveData_1 = true;
            data_2 = null;

            request_5.onsuccess = function () {
              if (request_5.result) {
                data_2 = request_5.result.data;

                if (data_2 && (0, _util.isObject)(conditions)) {
                  if ((0, _util.isObject)(data_2)) {
                    for (var key_2 in conditions) {
                      if (data_2 && conditions[key_2] != data_2[key_2]) {
                        data_2 = null;
                        haveData_1 = false;
                        break;
                      }
                    }
                  }
                }

                fn(haveData_1);
              } else {
                fn(false);
              }
            };

            request_5.onerror = function () {
              this.onerror(new Error('save data to indexDB error'));
              fn(false);
            };
          } catch (err) {
            this.onerror(err);
            fn(false);
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}

function IDB_remove(key, callback) {
  return __awaiter(this, void 0, void 0, function () {
    var fn, storeName, result, IDB, DB, transaction, store;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          fn = function fn(result) {
            callback && (0, _util.isFunction)(callback) && callback({
              isOk: result
            });
          };

          storeName = this.prefix + "-db";
          if (!((0, _util.isUndefined)(this.IDB) || (0, _util.isNull)(this.IDB) || this.IDB.readyState != 'done')) return [3
          /*break*/
          , 2];
          return [4
          /*yield*/
          , openDB.call(this, storeName)];

        case 1:
          result = _a.sent();

          if (result) {
            IDB = result.IDB, DB = result.DB;
            this.IDB = IDB;
            this.DB = DB;
          } else {
            return [2
            /*return*/
            ];
          }

          _a.label = 2;

        case 2:
          try {
            transaction = this.DB.transaction(storeName, 'readwrite');
            store = transaction.objectStore(storeName);
            store["delete"](key);
            fn(true);
          } catch (err) {
            this.onerror(err);
            fn(false);
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}