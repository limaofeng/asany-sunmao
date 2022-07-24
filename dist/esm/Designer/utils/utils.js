export var DATA_SCENA_ELEMENT_ID = 'data-scena-element-id';
export function getId(el) {
  return el.getAttribute(DATA_SCENA_ELEMENT_ID);
}
export function getIds(els) {
  return els.map(function (el) {
    return getId(el);
  });
}