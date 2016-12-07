# babel-plugin-dynamic-import-system-import

Babel plugin to transpile `import()` to `System.import()`.

**NOTE:** Babylon >= v6.12.0 is required to correct parse dynamic imports.

## Installation

```sh
$ npm install babel-plugin-dynamic-import-system-import --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["dynamic-import-system-import"]
}
```

### Via CLI

```sh
$ babel --plugins dynamic-import-system-import script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['dynamic-import-system-import']
});
```
