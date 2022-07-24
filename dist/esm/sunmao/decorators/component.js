import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import { METADATA_KEY_COMPONENTS } from "../typings";
export default function component(metadata) {
  return function (target, propertyKey, descriptor) {
    var components = [];

    if (Reflect.hasMetadata(METADATA_KEY_COMPONENTS, target)) {
      components = Reflect.getMetadata(METADATA_KEY_COMPONENTS, target);
    } else {
      Reflect.defineMetadata(METADATA_KEY_COMPONENTS, components, target);
    }

    var method;

    if (descriptor) {
      method = descriptor.value || descriptor.initializer;
    } else {
      method = function method() {
        return this[propertyKey];
      };
    }

    var getValue = function getValue() {
      var retval = method.apply(this);

      if (metadata) {
        for (var _i = 0, _Object$keys = Object.keys(metadata); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          Reflect.defineMetadata(key, metadata[key], retval);
        }
      }

      if (!(metadata !== null && metadata !== void 0 && metadata.name)) {
        Reflect.defineMetadata('name', upperFirst(camelCase(propertyKey)), retval);
      }

      return retval;
    };

    if (descriptor) {
      descriptor.value = getValue;
    }

    components.push(getValue);
  };
}