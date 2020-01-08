function isType(s: any, typeString: string): boolean {
    return Object.prototype.toString.call(s) === `[object ${typeString}]`;
}

export function isWindow(s: any): boolean {
    return isType(s, 'Window');
}

export function isObject(s: any): boolean {
    return isType(s, 'Object');
}
export function isArray(s: any): boolean {
    return Array.isArray ? Array.isArray(s) : isType(s, 'Array');
}
export function isString(s: any): boolean {
    return isType(s, 'String');
}
export function isFunction(s: any): boolean {
    return isType(s, 'Function');
}
export function isNumber(s: any): boolean {
    return isType(s, 'Number');
}
export function isRegExp(s: any): boolean {
    return isType(s, 'RegExp');
}
export function isUndefined(s: any): boolean {
    return isType(s, 'Undefined');
}
export function isNull(s: any): boolean {
    return isType(s, 'Null');
}
export function isDate(s: any): boolean {
    return isType(s, 'Date');
}
export function isDOM(s: any): boolean {
    if (typeof HTMLElement === 'object') {
        return s instanceof HTMLElement;
    }
    return s && typeof s === 'object' && s.nodeType === 1 && typeof s.nodeName === 'string';
}
export function isEmptyString(s:any): boolean {
    return s == '';
}
export function isEmptyObject(s:any): boolean {
    return Object.keys(s).length == 0;
}
export function isNoTransmission(s:any): boolean {
    return isNull(s) || isUndefined(s);
}


