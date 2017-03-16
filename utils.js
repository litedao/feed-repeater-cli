const web3 = require('./web3');

function toBytes(number, bytes) {
  let hex = web3.fromDecimal(number).replace('0x', '');
  while (hex.length < bytes * 2) hex = `0${hex}`;
  return `0x${hex}`;
}

function toBytes12(number) {
  return toBytes(number, 12);
}

module.exports = {
  toBytes,
  toBytes12,
  getNetwork: () => (
    new Promise((resolve, reject) => {
      web3.version.getNetwork((error, result) => {
        if (error) {
          reject(error);
        } else {
          switch(result) {
            case '1':
              env = 'live'; break;
            case '2':
              env = 'morden'; break;
            case '3':
              env = 'ropsten'; break;
            case '42':
              env = 'kovan'; break;
            default:
              env = 'develop'; break;
          }
          resolve(env);
        }
      });
    })
  ),
  getAccounts: () => (
    new Promise((resolve, reject) => {
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          reject(error);
        } else {
          resolve(accounts);
        }
      });
    })
  ),

  detectMethodArgs: (object, argsQuantity) => {
    let subMethod = null;
    Object.keys(object).forEach((key) => {
      if (key.indexOf('bytes') ||
        key.indexOf('uint') ||
        key.indexOf('string')) {
        if (argsQuantity === (key.match(/,/g) || []).length + 1) {
          subMethod = key;
        }
      }
    });
    return subMethod;
  },

  prepareArgs: (args, format) => {
    const argsType = format.split(',');
    let val = null;

    if (args.length !== argsType.length) return false;

    const returnArgs = [];
    for (let i = 0; i < args.length; i += 1) {
      if (argsType[i] === 'bytes12') {
        val = toBytes12(args[i]);
      } else if (argsType[i] === 'bytes32' && /^\d+$/.test(args[i])) {
        // It also checks that the bytes32 is a number. Otherwise we do send it as string
        val = toBytes(args[i], 32);
      } else {
        val = args[i];
      }
      returnArgs.push(val);
    }

    return returnArgs;
  },

  unique: (value, index, self) => self.indexOf(value) === index,
};
