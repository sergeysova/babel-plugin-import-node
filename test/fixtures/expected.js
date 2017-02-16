var _requireAsync = function requireAsync(modulePath) {
  return Promise.resolve().then(function () {
    return require(modulePath);
  });
};

const testModule = _requireAsync('test-module').then(lol => lol.something());
const secondModule = _requireAsync(`./local_${name}`);