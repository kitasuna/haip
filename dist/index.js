"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// T: Using a generic for this instead of an indexed type seems to help TS typecheck within the function...
// k: setting this as a string to force strict use, although when we call `ko` we have to broaden the type to 'any'
exports.get = (obj) => (k) => (def) => {
    if (ko(obj, k)) {
        const val = obj[k];
        if (match(val, def)) {
            return val;
        }
        return def;
    }
    return def;
};
// Utility function for checking if some value
// is a keyof an object. Since we can't use
// an indexed type in the main function...
const ko = (obj, k) => {
    if (obj === null) {
        return false;
    }
    if (typeof obj !== "object") {
        return false;
    }
    if (k in obj) {
        return true;
    }
    return false;
};
const match = (objk, def) => {
    if (Array.isArray(def)) {
        return Array.isArray(objk);
    }
    if (Array.isArray(objk)) {
        return Array.isArray(def);
    }
    return typeof objk === typeof def;
};
