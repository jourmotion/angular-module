export function normalizeConstructor(input) {

    let constructorFn;

    if (input.constructor === Array) {

        let injected = input.slice(0, input.length - 1);
        constructorFn = input[input.length - 1];
        constructorFn.$inject = injected;
    } else {

        constructorFn = input;
    }

    return constructorFn;
}

export function createFactoryArray(constructorFn) {

    let args = constructorFn.$inject || [];
    let factoryArray = args.slice();

    factoryArray.push((...args) => {

        let instance = new constructorFn(...args);
        for (let key in instance) {
            instance[key] = instance[key];
        }
        return instance;
    });

    return factoryArray;
}

export function cloneFunction(original) {

    return function() {
        return original.apply(this, arguments);
    };
}

export function override(object, methodName, callback) {

    object[methodName] = callback(object[methodName])
}
