export function keysToVals(obj) {
  return Object.keys(obj).reduce((acc, key) => (acc[key] = key) && acc, {});
}

export function action(type, data = {}) {
  return {type, ...data};
}
