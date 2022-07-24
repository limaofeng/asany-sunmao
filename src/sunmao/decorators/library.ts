import {
  IComponentDefinition,
  ILibraryDefinition,
  LibraryMetadata,
  METADATA_KEY_COMPONENTS,
} from '../typings';
import { getMetadata } from '../utils';

export default function library(metadata: LibraryMetadata, loadComponentsMethod?: string) {
  return function (target: any) {
    for (const key of Object.keys(metadata)) {
      Reflect.defineMetadata(key, (metadata as any)[key], target);
    }

    const name = Reflect.getMetadata('name', target);
    const description = Reflect.getMetadata('description', target);

    const components = Reflect.getMetadata(METADATA_KEY_COMPONENTS, target.prototype) || [];

    return class extends target implements ILibraryDefinition {
      name = name;
      tags = [];
      description = description;
      get components(): IComponentDefinition[] {
        if (loadComponentsMethod) {
          return target.prototype[loadComponentsMethod].apply(this);
        }
        return components.map((get: any) => {
          const rc = get.apply(this);
          if (metadata.namespace) {
            const name = Reflect.getMetadata('name', rc);
            Reflect.deleteMetadata('name', rc);
            Reflect.defineMetadata('name', metadata.namespace + '.' + name, rc);
          }
          return { ...getMetadata(rc), component: rc, library: this };
        });
      }
    };
  } as any;
}
