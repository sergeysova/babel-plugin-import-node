# babel-plugin-import-node

Babel plugin to transpile `import()` to `Promise.resolve(require())`.

**NOTE:** Babylon >= v6.12.0 is required to correct parse dynamic imports.

## Installation

```sh
$ npm install babel-plugin-import-node --save-dev
```

## Example

In:

```js
const asyncRoutes = [
  import('./root').then(module => module.default),
  import(`./named_${subRoute}`),
]
```

Out:

```js
const asyncRoutes = [
  Promise.resolve(require('./root')).then(module => module.default),
  Promise.resolve(require(`./named_${subRoute}`)),
]
```


## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["import-node"]
}
```

### Via CLI

```sh
$ babel --plugins import-node script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['import-node']
});
```
