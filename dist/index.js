"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _util = require("./util");

var _ls = require("./ls");

var _ss = require("./ss");

var WellCache =
/** @class */
function () {
  function WellCache(opt) {
    if (opt === void 0) {
      opt = {};
    }

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
      case 'ls':
        result = _ls.ls_save.call(this, saveKey, data);
        break;

      case 'ss':
        result = _ss.ss_save.call(this, saveKey, data);
        break;
    }

    callback && (0, _util.isFunction)(callback) && callback({
      name: saveKey,
      isOk: result
    });
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
      case 'ls':
        result = _ls.ls_get.call(this, saveKey, conditions);
        break;

      case 'ss':
        result = _ss.ss_get.call(this, saveKey, conditions);
        break;
    }

    callback && (0, _util.isFunction)(callback) && callback(result);
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
      case 'ls':
        result = _ls.ls_has.call(this, saveKey, conditions);
        break;

      case 'ss':
        result = _ss.ss_has.call(this, saveKey, conditions);
        break;
    }

    callback && (0, _util.isFunction)(callback) && callback(result);
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
      case 'ls':
        result = _ls.ls_remove.call(this, saveKey);
        break;

      case 'ss':
        result = _ss.ss_remove.call(this, saveKey);
        break;
    }

    callback && (0, _util.isFunction)(callback) && callback({
      isOk: result
    });
  };

  return WellCache;
}();

var _default = WellCache;
exports["default"] = _default;