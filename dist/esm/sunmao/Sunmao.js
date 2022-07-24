function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function initTag(tag, rootTags, component) {
  tag.split('/').forEach(function (key, index, array) {
    var subTag = rootTags.find(function (_ref) {
      var id = _ref.id;
      return id === key;
    });

    if (!subTag) {
      rootTags.push(subTag = {
        id: key,
        value: key,
        label: key,
        children: []
      });
    }

    rootTags = subTag.children;

    if (array.length === index + 1) {
      rootTags.push(_objectSpread(_objectSpread({}, component), {}, {
        value: component.name,
        label: component.title || component.name
      }));
    }
  });
}

var Sunmao = /*#__PURE__*/function () {
  function Sunmao() {
    var _this = this;

    _classCallCheck(this, Sunmao);

    _defineProperty(this, "libraries", []);

    _defineProperty(this, "listeners", []);

    _defineProperty(this, "templates", new Map());

    _defineProperty(this, "components", new Map());

    _defineProperty(this, "dataSourceLoaders", new Map());

    _defineProperty(this, "library", {});

    _defineProperty(this, "tags", []);

    _defineProperty(this, "unsubscribe", function (callback) {
      return function () {
        var index = _this.listeners.indexOf(callback);

        if (index > -1) {
          _this.listeners.splice(index, 1);
        }
      };
    });

    _defineProperty(this, "dispatchSubscribe", function () {
      var _iterator = _createForOfIteratorHelper(_this.listeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          listener();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });

    _defineProperty(this, "subscribe", function (callback) {
      _this.listeners.push(callback.bind(_this));

      return _this.unsubscribe(callback);
    });
  }

  _createClass(Sunmao, [{
    key: "addComponents",
    value: function addComponents(components) {
      var _this2 = this;

      this.library = components.reduce(function (x, item) {
        return _this2.updateComponent(item, false, false, x);
      }, this.library);
      this.dispatchSubscribe();
    }
  }, {
    key: "addDataSourceLoader",
    value: function addDataSourceLoader(loader) {
      this.dataSourceLoaders.set(loader.type, loader);
      this.dispatchSubscribe();
    }
  }, {
    key: "getDataSourceLoader",
    value: function getDataSourceLoader(type) {
      return this.dataSourceLoaders.get(type);
    }
    /**
     * 添加 / 更新 组件
     * @param component 组件
     * @param repeatable 可重复
     * @param dispatch 触发监听
     * @param library 组件聚合对象
     */

  }, {
    key: "updateComponent",
    value: function updateComponent(component) {
      var dispatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var repeatable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var library = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.library;

      if (!component.component) {
        console.error('组件[', component.name, ']未设置组件', component);
        return library;
      }

      var root = library;
      component.name.split('.').forEach(function (key, index, arry) {
        if (arry.length === index + 1) {
          if (root[key]) {
            console.error('组件[', component.name, ']重复');

            if (!repeatable) {
              root = root[key];
              return;
            }
          } // 将组件设置到 library 中


          root[key] = component.component;
          root[key].info = component;
          root = root[key];
        } else {
          root = !root[key] ? root[key] = {} : root[key];
        }
      }); // 提取标签

      if (component.tags) {
        var _iterator2 = _createForOfIteratorHelper(component.tags),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var tag = _step2.value;
            var rootTags = this.tags;
            initTag(tag, rootTags, component);
            initTag(tag, component.library.tags, component);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      this.components.set(component.name, component);
      dispatch && this.dispatchSubscribe();
      return library;
    }
  }, {
    key: "addLibrary",
    value: function addLibrary() {
      var _this3 = this;

      for (var _len = arguments.length, librarys = new Array(_len), _key = 0; _key < _len; _key++) {
        librarys[_key] = arguments[_key];
      }

      librarys.forEach(function (library) {
        _this3.libraries.push(library);

        _this3.addComponents(library.components);
      });
    }
  }, {
    key: "addComponent",
    value: function addComponent(component) {
      this.updateComponent(component, false, true, this.library);
    }
  }, {
    key: "addTemplate",
    value: function addTemplate(template) {
      this.templates.set(template.id, template);
    }
  }, {
    key: "getLibrary",
    value: function getLibrary(name) {
      return this.libraries.find(function (data) {
        return data.name === name;
      });
    }
  }, {
    key: "getLibraries",
    value: function getLibraries() {
      return this.libraries;
    }
  }, {
    key: "getComponent",
    value: function getComponent(name) {
      return this.components.get(name);
    }
  }, {
    key: "getComponents",
    value: function getComponents(selector) {
      return Array.from(this.components.values()).filter(selector);
    }
  }, {
    key: "getTreeDate",
    value: function getTreeDate(tag) {
      var _this4 = this;

      if (!tag || !tag.length) {
        return this.tags;
      }

      if (typeof tag === 'function') {
        var components = this.getComponents(tag);
        console.warn('getTreeDate selector 未实现', components);
        return [];
      }

      if (tag instanceof Array) {
        return tag.reduce(function (l, r) {
          l.push.apply(l, _toConsumableArray(_this4.getTreeDate(r)));
          return l;
        }, []);
      }

      var subTags;

      var _iterator3 = _createForOfIteratorHelper(tag.split('/').filter(function (item) {
        return !!item;
      })),
          _step3;

      try {
        var _loop = function _loop() {
          var key = _step3.value;
          subTags = (subTags || _this4.tags).find(function (_ref2) {
            var id = _ref2.id;
            return id === key;
          });

          if (subTags) {
            subTags = subTags.children;
          }
        };

        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return subTags || [];
    }
  }]);

  return Sunmao;
}();

export default Sunmao;