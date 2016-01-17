import * as util from './util';

export class AngularModule {

  constructor(moduleName, deps = []) {

    deps.map((dep) => dep.module);

    this.module = angular.module(moduleName, deps);
  }

  directive(name, constructorFn) {

    constructorFn = util.normalizeConstructor(constructorFn);

    if (!constructorFn.prototype.compile) {

        constructorFn.prototype.compile = () => {};
    }

    let originalCompileFn = util.cloneFunction(constructorFn.prototype.compile);

    util.override(constructorFn.prototype, 'compile', function () {
        return function () {
            originalCompileFn.apply(this, arguments);

            if (constructorFn.prototype.link) {
                return constructorFn.prototype.link.bind(this);
            }
        };
    });

    this.module
      .directive(name, util.createFactoryArray(constructorFn));

    return this;
  }

  controller(name, constructorFn) {

    this.module
      .controller(name, constructorFn);

    return this;
  }

  service(name, constructorFn) {

    this.module
      .service(name, constructorFn);

    return this;
  }

  provider(name, constructorFn) {

    this.module
      .provider(name, constructorFn);

    return this;
  }

  factory(name, constructorFn) {

    this.module
      .factory(name, util.createFactoryArray(
        util.normalizeConstructor(constructorFn)
      ));

    return this;
  }

  config(fn) {

    this.module
      .config(fn);

    return this;
  }

  value(key, val) {

    this.module
      .value(key, val);

    return this;
  }

  constant(key, val) {

    this.module
      .value(key, val);

    return this;
  }

  run(fn) {

    this.module
      .run(fn);

    return this;
  }

}
