export var IComponentCategory;

(function (IComponentCategory) {
  IComponentCategory[IComponentCategory["Page"] = 0] = "Page";
  IComponentCategory[IComponentCategory["Symbol"] = 1] = "Symbol";
})(IComponentCategory || (IComponentCategory = {}));

export var IComponentPlatform;

(function (IComponentPlatform) {
  IComponentPlatform[IComponentPlatform["web"] = 0] = "web";
  IComponentPlatform[IComponentPlatform["mobile"] = 1] = "mobile";
})(IComponentPlatform || (IComponentPlatform = {}));

export var METADATA_KEY_COMPONENTS = '_COMPONENTS';
export var defaultEqualityFn = function defaultEqualityFn(a, b) {
  return a === b;
};