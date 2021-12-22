import { getOwner, setOwner } from '@ember/application';
import { assert } from '@ember/debug';

//
// This `@di` (or however named decorator) should be in its own addon 😱
//

interface DecoratorPropertyDescriptor extends PropertyDescriptor {
  initializer?(): unknown;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore typings are weird for that case. That's the best to make it work
// as expression - ie. ignoring was easier than to change the code to a factory 😱
const di: PropertyDecorator = function (
  _prototype: unknown,
  key: string | symbol,
  desc: PropertyDescriptor
) {
  const containers = new WeakMap();
  const { initializer, get } = desc as DecoratorPropertyDescriptor;
  const invoker = initializer ?? get;

  return {
    get() {
      let container = containers.get(this);

      if (!container) {
        assert(
          `Missing initializer for '${String(key)}'.`,
          typeof invoker === 'function'
        );

        container = invoker.call(this);
        setOwner(container, getOwner(this));
        containers.set(this, container);
      }

      return container;
    }
  };
};

export { di };
