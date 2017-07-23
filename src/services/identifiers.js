export const getNextId = arr => {
  var ids = arr.map((item) => { return item.id });
  var maxId = Math.max(Math.max(...ids), 0);
  return maxId + 1;
}
