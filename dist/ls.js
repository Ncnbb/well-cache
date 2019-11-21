"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ls_save = ls_save;
exports.ls_get = ls_get;
exports.ls_has = ls_has;
exports.ls_remove = ls_remove;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _util = require("./util");

function ls_save(key, data) {
  try {
    var saveData = (0, _util.isObject)(data) ? (0, _stringify["default"])(data) : data;
    window.localStorage.setItem(key, saveData);
    return true;
  } catch (err) {
    this.onerror(err);
    return false;
  }
}

function ls_get(key, conditions) {
  var ls_data = null;

  try {
    ls_data = window.localStorage.getItem(key);
    ls_data = ls_data ? JSON.parse(ls_data) : null; // has conditions

    if (ls_data && (0, _util.isObject)(conditions)) {
      // data must be object
      if ((0, _util.isObject)(ls_data)) {
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

function ls_has(key, conditions) {
  var ls_data = null;
  var haveData = true;

  try {
    ls_data = window.localStorage.getItem(key);
    ls_data = ls_data ? JSON.parse(ls_data) : null;
    if (!ls_data) return false; // has conditions

    if (ls_data && (0, _util.isObject)(conditions)) {
      // data must be object
      if ((0, _util.isObject)(ls_data)) {
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

function ls_remove(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    this.onerror(err);
    return false;
  }
}