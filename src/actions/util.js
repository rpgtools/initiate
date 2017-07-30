export function action(type, data = {}) {
  return {type, ...data};
}
