function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var merge = function merge(props, newProps) {
  var newBolcks = _toConsumableArray(newProps);

  return [].concat(_toConsumableArray(props.filter(function (i) {
    return !newBolcks.some(function (item, index) {
      if (item.key === i.key) {
        newBolcks[index] = _objectSpread(_objectSpread(_objectSpread({}, i), item), {}, {
          version: (i.version || 0) + 1
        });
      }

      return item.key === i.key;
    });
  })), _toConsumableArray(newBolcks));
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'UpdateAllBlockProps':
      return _objectSpread(_objectSpread({}, state), {}, {
        version: state.version + 1,
        blocks: merge(state.blocks, action.payload || [])
      });

    case 'RegistrationBlock':
      if (state.blocks.some(function (_ref) {
        var key = _ref.key;
        return key === action.payload.key;
      })) {
        return _objectSpread(_objectSpread({}, state), {}, {
          version: state.version + 1,
          blocks: state.blocks.map(function (item) {
            if (item.key === action.payload.key) {
              return _objectSpread(_objectSpread({}, action.payload), {}, {
                props: item.props,
                version: 0
              });
            }

            return item;
          })
        });
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        blocks: [].concat(_toConsumableArray(state.blocks), [action.payload])
      });

    case 'UninstallBlock':
      return _objectSpread(_objectSpread({}, state), {}, {
        version: state.version + 1,
        blocks: state.blocks.filter(function (_ref2) {
          var key = _ref2.key;
          return key !== action.payload.key;
        })
      });

    case 'UpdateBlockProps':
      {
        var data = action.payload;
        console.log('action:', action);
        return _objectSpread(_objectSpread({}, state), {}, {
          version: state.version + 1,
          blocks: state.blocks.map(function (block) {
            if (block.key === data.key) {
              block.props = _objectSpread({}, data.props);
              block.version = (block.version || 0) + 1;
            }

            return block;
          })
        });
      }

    default:
      return state;
  }
}