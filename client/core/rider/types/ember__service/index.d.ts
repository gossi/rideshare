import ComputedProperty from '@ember/object/computed';

declare module '@ember/service' {
  export function service(): ComputedProperty<Service>;
  export function service(target: object, propertyKey: string | symbol): void;
  export function service<K extends keyof Registry>(
    name: K
  ): ComputedProperty<Registry[K]>;
}
