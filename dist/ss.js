"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ss_save = ss_save;
exports.ss_get = ss_get;
exports.ss_has = ss_has;
exports.ss_remove = ss_remove;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _util = require("./util");

function ss_save(key, data) {
  try {
    var saveData = (0, _util.isObject)(data) ? (0, _stringify["default"])(data) : data;
    window.sessionStorage.setItem(key, saveData);
    return true;
  } catch (err) {
    this.onerror(err);
    return false;
  }
}

function ss_get(key, conditions) {
  var ss_data = null;

  try {
    ss_data = window.sessionStorage.getItem(key);
    ss_data = ss_data ? JSON.parse(ss_data) : null; // has conditions

    if (ss_data && (0, _util.isObject)(conditions)) {
      // data must be object
      if ((0, _util.isObject)(ss_data)) {
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
  } catch (err) {
    this.onerror(err);
    return {
      isOk: false,
      data: ss_data || null
    };
  }
}

function ss_has(key, conditions) {
  var ss_data = null;
  var haveData = true;

  try {
    ss_data = window.sessionStorage.getItem(key);
    ss_data = ss_data ? JSON.parse(ss_data) : null;
    if (!ss_data) return false; // has conditions

    if (ss_data && (0, _util.isObject)(conditions)) {
      // data must be object
      if ((0, _util.isObject)(ss_data)) {
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
  } catch (err) {
    this.onerror(err);
    return false;
    ;
  }
}

function ss_remove(key) {
  try {
    window.sessionStorage.removeItem(key);
    return true;
  } catch (err) {
    this.onerror(err);
    return false;
  }
}