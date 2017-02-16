const testModule = Promise.resolve(require('test-module')).then(lol => lol.something());
const secondModule = Promise.resolve(require(`./local_${name}`));