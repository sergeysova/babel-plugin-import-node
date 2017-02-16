const testModule = import('test-module').then(lol => lol.something());
const secondModule = import(`./local_${name}`);