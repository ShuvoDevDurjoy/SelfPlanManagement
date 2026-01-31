function isNull(value) {
  return value === null;
}

function isUndefined(value) {
  return value === undefined;
}

function isValid(value) {
    return !(isUndefined(value) || isNull(value) || isEmpty(value));
}

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

function isString(value) {
  return typeof value === "string";
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isDate(value) {
  return value instanceof Date && !isNaN(value.getTime());
}


export {
    isNull, 
    isUndefined, 
    isValid, 
    isNumber, 
    isString, 
    isArray, 
    isObject,
    isEmpty, 
    isBoolean, 
    isDate
}