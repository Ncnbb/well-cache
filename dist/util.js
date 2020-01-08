"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.isWindow = isWindow;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isString = isString;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isRegExp = isRegExp;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isDate = isDate;
exports.isDOM = isDOM;
exports.isEmptyString = isEmptyString;
exports.isEmptyObject = isEmptyObject;
exports.isNoTransmission = isNoTransmission;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/typeof"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

function isType(s, typeString) {
  return Object.prototype.toString.call(s) === "[object " + typeString + "]";
}

function isWindow(s) {
  return isType(s, 'Window');
}

function isObject(s) {
  return isType(s, 'Object');
}

function isArray(s) {
  return _isArray["default"] ? (0, _isArray["default"])(s) : isType(s, 'Array');
}

function isString(s) {
  return isType(s, 'String');
}

function isFunction(s) {
  return isType(s, 'Function');
}

function isNumber(s) {
  return isType(s, 'Number');
}

function isRegExp(s) {
  return isType(s, 'RegExp');
}

function isUndefined(s) {
  return isType(s, 'Undefined');
}

function isNull(s) {
  return isType(s, 'Null');
}

function isDate(s) {
  return isType(s, 'Date');
}

function isDOM(s) {
  if ((typeof HTMLElement === "undefined" ? "undefined" : (0, _typeof2["default"])(HTMLElement)) === 'object') {
    return s instanceof HTMLElement;
  }

  return s && (0, _typeof2["default"])(s) === 'object' && s.nodeType === 1 && typeof s.nodeName === 'string';
}

function isEmptyString(s) {
  return s == '';
}

function isEmptyObject(s) {
  return (0, _keys["default"])(s).length == 0;
}

function isNoTransmission(s) {
  return isNull(s) || isUndefined(s);
} // export function isNoTra22nsmission(s:any): boolean {
//     return isNull(s) || isUndefined(s);
// }