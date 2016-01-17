# angular-module

ES2015 way to define Angular 1x modules and register services, factories, etc. as ES2015 classes

This project module was mainly inspired by [register.js](https://github.com/michaelbromley/angular-es6/blob/master/src/app/utils/register.js)

## Installation

```
npm install --save angular-module
```

## Usage

```js
// app.js
import AngularModule from 'angular-module';
import * as config from './config';
import {AppCtrl} from './AppCtrl';

new AngularModule('app', [

  // add your dependency modules here

])
.config(config.routing)
.config(config.foo)
.config(config.bar)
.controller('AppCtrl', AppCtrl);
```

## Nested modules

```
/src
    /app.js
    /api/module.js
    /auth/module.js
```

```js
// app.js
import AngularModule from 'angular-module';
import api from './api/module';
import auth from './auth/module';

new AngularModule('app', [
  api,
  auth
]);
```

```js
// api.js
import AngularModule from 'angular-module';

export default new AngularModule('api', [

]);
```

```js
// auth.js
import AngularModule from 'angular-module';

export default new AngularModule('auth', [

]);
```
## License

MIT
