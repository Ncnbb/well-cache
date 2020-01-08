function isType(s, typeString) {
    return Object.prototype.toString.call(s) === "[object " + typeString + "]";
}
export function isWindow(s) {
    return isType(s, 'Window');
}
export function isObject(s) {
    return isType(s, 'Object');
}
export function isArray(s) {
    return Array.isArray ? Array.isArray(s) : isType(s, 'Array');
}
export function isString(s) {
    return isType(s, 'String');
}
export function isFunction(s) {
    return isType(s, 'Function');
}
export function isNumber(s) {
    return isType(s, 'Number');
}
export function isRegExp(s) {
    return isType(s, 'RegExp');
}
export function isUndefined(s) {
    return isType(s, 'Undefined');
}
export function isNull(s) {
    return isType(s, 'Null');
}
export function isDate(s) {
    return isType(s, 'Date');
}
export function isDOM(s) {
    if (typeof HTMLElement === 'object') {
        return s instanceof HTMLElement;
    }
    return s && typeof s === 'object' && s.nodeType === 1 && typeof s.nodeName === 'string';
}
export function isEmptyString(s) {
    return s == '';
}
export function isEmptyObject(s) {
    return Object.keys(s).length == 0;
}
export function isNoTransmission(s) {
    return isNull(s) || isUndefined(s);
}
// export function isNoTra22nsmission(s:any): boolean {
//     return isNull(s) || isUndefined(s);
// }
