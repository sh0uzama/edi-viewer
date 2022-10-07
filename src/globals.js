var inc = 0;
var _nodeReference = {};

export const getId = () => ++inc;
export function reset() {
  inc = 0;
  _nodeReference = {};
};
export function getReference(id) {
  return _nodeReference[id];
}
export function setReference(id, reference) {
  _nodeReference[id] = reference;
}
export const separators = {
  row: /(?<!\?)\'/g,
  segment: /(?<!\?)\+/g,
  component: /(?<!\?)\:/g,
};
