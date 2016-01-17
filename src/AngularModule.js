import * as util from './util';

export default class AngularModule {

  constructor(moduleName, deps = []) {

    deps = deps.map((dep) => {
      if (dep instanceof AngularModule) {
        return dep.module;
      }
      return dep;
    });

    this.ng = angular.module(moduleName, deps);
    this.module = moduleName;
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

    this.ng
      .directive(name, util.createFactoryArray(constructorFn));

    return this;
  }

  controller(name, constructorFn) {

    this.ng
      .controller(name, constructorFn);

    return this;
  }

  service(name, constructorFn) {

    this.ng
      .service(name, constructorFn);

    return this;
  }

  provider(name, constructorFn) {

    this.ng
      .provider(name, constructorFn);

    return this;
  }

  factory(name, constructorFn) {

    this.ng
      .factory(name, util.createFactoryArray(
        util.normalizeConstructor(constructorFn)
      ));

    return this;
  }

  config(fn) {

    this.ng
      .config(fn);

    return this;
  }

  value(key, val) {

    this.ng
      .value(key, val);

    return this;
  }

  constant(key, val) {

    this.ng
      .value(key, val);

    return this;
  }

  run(fn) {

    this.ng
      .run(fn);

    return this;
  }

}
