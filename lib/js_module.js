/* eslint-disable */

// For geth
if (typeof dapp === 'undefined') {
  var dapp = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapp['feed-repeater'] = (function builder () {
  var environments = {
    "kovan": {
      "feeds": {
        "value": 0,
        "type": "Repeater"
      }
    },
    "live": {
      "feeds": {
        "value": 0,
        "type": "Repeater"
      }
    },
    "develop": {
      "feeds": {
        "value": 0,
        "type": "Repeater"
      }
    }
};

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
  "objects": {},
  "type": "internal"
};
    }
    if(typeof env === "object" && !("objects" in env)) {
      env = {objects: env};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = {objects: environments[env]};
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
  "AverageRepeater": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "peekFeed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "set_min",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "min",
        "outputs": [
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "set_label",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "set",
        "outputs": [
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "unset",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "label",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "getFeedInfo",
        "outputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "peek",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "set_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "feedsQuantity",
        "outputs": [
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "readFeed",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "LogUnset",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "LogSetMin",
        "type": "event"
      }
    ],
    "bytecode": "606060405260017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff02191690837401000000000000000000000000000000000000000090040217905550341561005f57fe5b5b6123ed8061006f6000396000f300606060405236156100ef576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633b25757b146100f15780634e71d92d14610187578063516e4424146101db578063533deb301461024a57806368e4d727146102a1578063770eb5bb1461031a5780637a177cc61461035e57806381031eba146103d75780638981d5131461048f57806389ee639d14610506578063ac016a311461055d578063aed0a6e6146105b0578063b47a2f101461067c578063ba22e562146106cb578063c90858201461071e578063f303b6ac14610774578063fad8e711146107ed575bfe5b34156100f957fe5b610185600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610860565b005b341561018f57fe5b610197610b14565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156101e357fe5b610230600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b3d565b604051808215151515815260200191505060405180910390f35b341561025257fe5b61029f600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610d4e565b005b34156102a957fe5b6102d6600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610e8f565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561032257fe5b61035c600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803560001916906020019091905050610eff565b005b341561036657fe5b610393600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610fea565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156103df57fe5b61044b600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611283565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561049757fe5b6104c4600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611430565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561050e57fe5b61055b600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061149f565b005b341561056557fe5b610592600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611700565b60405180826000191660001916815260200191505060405180910390f35b34156105b857fe5b610605600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061174f565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019250505060405180910390f35b341561068457fe5b6106b1600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506118ae565b604051808215151515815260200191505060405180910390f35b34156106d357fe5b610700600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611c0b565b60405180826000191660001916815260200191505060405180910390f35b341561072657fe5b610772600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611fb8565b005b341561077c57fe5b6107a9600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506120fd565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156107f557fe5b610842600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061219f565b60405180826000191660001916815260200191505060405180910390f35b836108a061086d82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b82600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508473ffffffffffffffffffffffffffffffffffffffff19167f62ba5ff08854575a78f11e69ef033464759a0d1b4a7737d7532084865ea000fc858585604051808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001935050505060405180910390a25b5b5050505050565b6000610b3760017401000000000000000000000000000000000000000002610fea565b90505b90565b6000600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515610d2e57fe5b60325a03f11515610d3b57fe5b5050506040518051905090505b92915050565b81610d8e610d5b82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160006101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508273ffffffffffffffffffffffffffffffffffffffff19167fec4fd4fb7f733324f380320915ea65152c17fa7f202718be1ce4bf88cfd61e5583604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000290505b919050565b81610f3f610f0c82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060010181600019169055508273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779028360405180826000191660001916815260200191505060405180910390a25b5b505050565b6000600160009054906101000a90047401000000000000000000000000000000000000000002905061104d600074010000000000000000000000000000000000000000028273ffffffffffffffffffffffffffffffffffffffff191614156123b0565b6001600160009054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555033600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060017401000000000000000000000000000000000000000002600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c6101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508073ffffffffffffffffffffffffffffffffffffffff19167fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a261127a8183610d4e565b8090505b919050565b6000836112c561129282611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a900474010000000000000000000000000000000000000000029150611368600074010000000000000000000000000000000000000000028373ffffffffffffffffffffffffffffffffffffffff191614156123b0565b600182740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c6101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555061142385838686610860565b8191505b5b509392505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b816114df6114ac82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b6000600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060007401000000000000000000000000000000000000000002600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508273ffffffffffffffffffffffffffffffffffffffff19167f0be474a55c16887f4473fcdbdcae7da92be6da32d23ccbc2736c511007d8771583604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206001015490505b919050565b60006000600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a90047401000000000000000000000000000000000000000002915091505b9250929050565b6000600060006000600060009450600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900493506001600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004118015611a45575083600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004115b15611c01576000925060009150600190505b600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004811015611bfa576000600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600301600083740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611bec57611bda86827401000000000000000000000000000000000000000002610b3d565b94508415611beb5781806001019250505b5b5b8080600101915050611a57565b8382101594505b5b50505050919050565b600060006000600060006000600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900494506001600060008973ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004118015611da0575084600060008973ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004115b15611fa8576000935060009250600190505b600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004811015611f7c576000600060008973ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600301600083740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611f6e57611f3587827401000000000000000000000000000000000000000002610b3d565b15611f6d57611f5b8782740100000000000000000000000000000000000000000261219f565b91508160019004840193506001830192505b5b5b8080600101915050611db2565b600083118015611f8c5750848310155b15611fa7578284811515611f9c57fe5b046001029550611fae565b5b60006000fd5b5050505050919050565b81611ff8611fc582611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b60006001600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900403740100000000000000000000000000000000000000000290505b919050565b6000600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151561239057fe5b60325a03f1151561239d57fe5b5050506040518051905090505b92915050565b8015156123bd5760006000fd5b5b505600a165627a7a723058204cf099a1f83e537a815b05d98bfab56bdeab5a274325d72048d801db5338aff50029"
  },
  "AverageRepeaterTest": {
    "interface": [
      {
        "constant": false,
        "inputs": [],
        "name": "test_get_feedInfo",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_try_get_feed",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "setUp",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "time",
        "outputs": [
          {
            "name": "",
            "type": "uint40"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFail_set_label_unauth",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_claim_with_no_minimum",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFail_set_owner_unauth",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_set_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_claim",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_is_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_read",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "target",
            "type": "address"
          }
        ],
        "name": "expectEventsExact",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_read_with_three_expired",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_feeds_quantity",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFail_read_with_three_expired",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "failed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_read_with_two_expired",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "a",
            "type": "bytes"
          },
          {
            "name": "b",
            "type": "bytes"
          }
        ],
        "name": "assertEq0",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_set_label",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_unset",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "IS_TEST",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "LogUnset",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "LogSetMin",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "target",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "exact",
            "type": "bool"
          }
        ],
        "name": "eventListener",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "logs",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "log_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "address"
          }
        ],
        "name": "log_named_address",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "bytes32"
          }
        ],
        "name": "log_named_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_uint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          }
        ],
        "name": "log_named_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          }
        ],
        "name": "log_named_uint",
        "type": "event"
      }
    ],
    "bytecode": "60606040526200000e620001ab565b809050604051809103906000f08015156200002557fe5b600060026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200006f620001bc565b809050604051809103906000f08015156200008657fe5b600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000d0620001bc565b809050604051809103906000f0801515620000e757fe5b600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000131620001bc565b809050604051809103906000f08015156200014857fe5b600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b6001600060006101000a81548160ff0219169083151502179055505b620001cd565b60405161245c80620091c283390190565b604051610dc4806200b61e83390190565b618fe580620001dd6000396000f3006060604052361562000131576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063068a19d914620001335780630925ce3114620001485780630a9254e4146200015d57806316ada5471462000172578063277e268e14620001a95780633a93f15514620001be5780635d0ad8d014620001d35780637bc7638814620001e85780637ce8e19614620001fd57806380bdc0681462000212578063831d520d14620002275780638af784dc146200023c578063a9459e441462000275578063a9871112146200028a578063aa73f666146200029f578063ba414fa614620002b4578063e381174914620002e1578063f578fd8514620002f6578063f6a251271462000396578063f722ac2314620003ab578063fa7626d414620003c0575bfe5b34156200013c57fe5b62000146620003ed565b005b34156200015157fe5b6200015b620008b4565b005b34156200016657fe5b6200017062000d18565b005b34156200017b57fe5b6200018562000f01565b604051808264ffffffffff1664ffffffffff16815260200191505060405180910390f35b3415620001b257fe5b620001bc62000f0a565b005b3415620001c757fe5b620001d162001025565b005b3415620001dc57fe5b620001e662001263565b005b3415620001f157fe5b620001fb620013ac565b005b34156200020657fe5b620002106200170f565b005b34156200021b57fe5b6200022562001984565b005b34156200023057fe5b6200023a62001a92565b005b34156200024557fe5b62000273600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062002c28565b005b34156200027e57fe5b6200028862002c9c565b005b34156200029357fe5b6200029d62003d5f565b005b3415620002a857fe5b620002b2620047ce565b005b3415620002bd57fe5b620002c762005885565b604051808215151515815260200191505060405180910390f35b3415620002ea57fe5b620002f462005898565b005b3415620002ff57fe5b62000394600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505062006a3c565b005b34156200039f57fe5b620003a962006cf5565b005b3415620003b457fe5b620003be62006ffa565b005b3415620003c957fe5b620003d3620088b4565b604051808215151515815260200191505060405180910390f35b600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200048257fe5b60325a03f115156200049057fe5b505050604051805190509250600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460326040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200056857fe5b60325a03f115156200057657fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620006ed57fe5b60325a03f11515620006fb57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663aed0a6e6600460149054906101000a90047401000000000000000000000000000000000000000002856000604051604001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200192505050604060405180830381600087803b15156200082457fe5b60325a03f115156200083257fe5b50505060405180519060200180519050915091506200087482600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16620088c7565b620008ae8173ffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff191662008a7a565b5b505050565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200094757fe5b60325a03f115156200095557fe5b505050604051805190509150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888360326040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562000a2d57fe5b60325a03f1151562000a3b57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562000bb257fe5b60325a03f1151562000bc057fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fad8e711600460149054906101000a90047401000000000000000000000000000000000000000002846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200192505050602060405180830381600087803b151562000ce957fe5b60325a03f1151562000cf757fe5b50505060405180519050905062000d1381603260010262008bc1565b5b5050565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1662000d4562008d8d565b808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f080151562000d8f57fe5b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc6600374010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562000eac57fe5b60325a03f1151562000eba57fe5b50505060405180519050600460146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055505b565b60004290505b90565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663770eb5bb600460149054906101000a900474010000000000000000000000000000000000000000026040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001807f666f6f0000000000000000000000000000000000000000000000000000000000815250602001915050600060405180830381600087803b15156200101157fe5b60325a03f115156200101f57fe5b5050505b565b62001052600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1662002c28565b6200109a600460149054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004600162008bd2565b62001165600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200112d57fe5b60325a03f115156200113b57fe5b50505060405180519050740100000000000000000000000000000000000000009004600262008bd2565b600274010000000000000000000000000000000000000000027fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4930604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a2600274010000000000000000000000000000000000000000027fec4fd4fb7f733324f380320915ea65152c17fa7f202718be1ce4bf88cfd61e5560016040518082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c9085820600460149054906101000a90047401000000000000000000000000000000000000000002600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b15156200139857fe5b60325a03f11515620013a657fe5b5050505b565b620013d9600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1662002c28565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c9085820600460149054906101000a90047401000000000000000000000000000000000000000002600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b15156200150e57fe5b60325a03f115156200151c57fe5b505050600460149054906101000a9004740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a26200170c600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638981d513600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515620016cb57fe5b60325a03f11515620016d957fe5b50505060405180519050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16620088c7565b5b565b6200173c600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1662002c28565b62001784600460149054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004600162008bd2565b62001886600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660016000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200184e57fe5b60325a03f115156200185c57fe5b50505060405180519050740100000000000000000000000000000000000000009004600262008bd2565b600274010000000000000000000000000000000000000000027fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4930604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a2600274010000000000000000000000000000000000000000027fec4fd4fb7f733324f380320915ea65152c17fa7f202718be1ce4bf88cfd61e5560016040518082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b565b62001a8f600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638981d513600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562001a7057fe5b60325a03f1151562001a7e57fe5b5050506040518051905030620088c7565b5b565b6000600060006000600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562001b2f57fe5b60325a03f1151562001b3d57fe5b505050604051805190509650600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558888600b6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562001c1557fe5b60325a03f1151562001c2357fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562001cb557fe5b60325a03f1151562001cc357fe5b505050604051805190509550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888760056040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562001d9b57fe5b60325a03f1151562001da957fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562001e3b57fe5b60325a03f1151562001e4957fe5b505050604051805190509450600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558886600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562001f2157fe5b60325a03f1151562001f2f57fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562001fc157fe5b60325a03f1151562001fcf57fe5b505050604051805190509350600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888560106040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620020a757fe5b60325a03f11515620020b557fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200214757fe5b60325a03f115156200215557fe5b505050604051805190509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200222d57fe5b60325a03f115156200223b57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168a6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620023b257fe5b60325a03f11515620023c057fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200253f57fe5b60325a03f115156200254d57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620026cc57fe5b60325a03f11515620026da57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200285957fe5b60325a03f115156200286757fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620029e657fe5b60325a03f11515620029f457fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562002ae757fe5b60325a03f1151562002af557fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562002be957fe5b60325a03f1151562002bf757fe5b50505060405180519050905062002c0e8262008d01565b62002c1e81600c60010262008bc1565b5b50505050505050565b7f190835d3ea3627fcd8cd319a6778f7f8798c3704b4af777966fba6571bcd76e8816001604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a15b50565b6000600060006000600060006000600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660036000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562002d7057fe5b60325a03f1151562002d7e57fe5b505050604051805190509650600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562002e1957fe5b60325a03f1151562002e2757fe5b505050604051805190509550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2787600b60006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b151562002f0f57fe5b60325a03f1151562002f1d57fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562002faf57fe5b60325a03f1151562002fbd57fe5b505050604051805190509450600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2786600560006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b1515620030a557fe5b60325a03f11515620030b357fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200314557fe5b60325a03f115156200315357fe5b505050604051805190509350600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558885600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200322b57fe5b60325a03f115156200323957fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620032cb57fe5b60325a03f11515620032d957fe5b505050604051805190509250600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2784601060006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b1515620033c157fe5b60325a03f11515620033cf57fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200346157fe5b60325a03f115156200346f57fe5b505050604051805190509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888360126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200354757fe5b60325a03f115156200355557fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620036a957fe5b60325a03f11515620036b757fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200381357fe5b60325a03f115156200382157fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200397d57fe5b60325a03f115156200398b57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562003ae757fe5b60325a03f1151562003af557fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562003c5157fe5b60325a03f1151562003c5f57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10886000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562003d2f57fe5b60325a03f1151562003d3d57fe5b50505060405180519050905062003d55811562008d01565b5b50505050505050565b6000600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562003df657fe5b60325a03f1151562003e0457fe5b505050604051805190509350600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558885600b6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562003edc57fe5b60325a03f1151562003eea57fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562003f7c57fe5b60325a03f1151562003f8a57fe5b505050604051805190509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460056040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200406257fe5b60325a03f115156200407057fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200410257fe5b60325a03f115156200411057fe5b505050604051805190509150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558883600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620041e857fe5b60325a03f11515620041f657fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200436d57fe5b60325a03f115156200437b57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620044fa57fe5b60325a03f115156200450857fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200468757fe5b60325a03f115156200469557fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f303b6ac600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200478857fe5b60325a03f115156200479657fe5b505050604051805190507401000000000000000000000000000000000000000090049050620047c781600362008bd2565b5b50505050565b6000600060006000600060006000600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660036000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515620048a257fe5b60325a03f11515620048b057fe5b505050604051805190509650600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200494b57fe5b60325a03f115156200495957fe5b505050604051805190509550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2787600b60006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b151562004a4157fe5b60325a03f1151562004a4f57fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562004ae157fe5b60325a03f1151562004aef57fe5b505050604051805190509450600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2786600560006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b151562004bd757fe5b60325a03f1151562004be557fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562004c7757fe5b60325a03f1151562004c8557fe5b505050604051805190509350600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558885600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562004d5d57fe5b60325a03f1151562004d6b57fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562004dfd57fe5b60325a03f1151562004e0b57fe5b505050604051805190509250600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2784601060006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b151562004ef357fe5b60325a03f1151562004f0157fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562004f9357fe5b60325a03f1151562004fa157fe5b505050604051805190509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888360126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200507957fe5b60325a03f115156200508757fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620051db57fe5b60325a03f11515620051e957fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200534557fe5b60325a03f115156200535357fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620054af57fe5b60325a03f11515620054bd57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200561957fe5b60325a03f115156200562757fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200578357fe5b60325a03f115156200579157fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562886000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200586157fe5b60325a03f115156200586f57fe5b5050506040518051905090505b50505050505050565b600060019054906101000a900460ff1681565b60006000600060006000600060006000600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660036000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200596e57fe5b60325a03f115156200597c57fe5b505050604051805190509750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562005a1757fe5b60325a03f1151562005a2557fe5b505050604051805190509650600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2788600b60006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b151562005b0d57fe5b60325a03f1151562005b1b57fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562005bad57fe5b60325a03f1151562005bbb57fe5b505050604051805190509550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888760056040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562005c9357fe5b60325a03f1151562005ca157fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562005d3357fe5b60325a03f1151562005d4157fe5b505050604051805190509450600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558886600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562005e1957fe5b60325a03f1151562005e2757fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562005eb957fe5b60325a03f1151562005ec757fe5b505050604051805190509350600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2785601060006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b151562005faf57fe5b60325a03f1151562005fbd57fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200604f57fe5b60325a03f115156200605d57fe5b505050604051805190509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200613557fe5b60325a03f115156200614357fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168a6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200629757fe5b60325a03f11515620062a557fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200640157fe5b60325a03f115156200640f57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200656b57fe5b60325a03f115156200657957fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620066d557fe5b60325a03f11515620066e357fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200683f57fe5b60325a03f115156200684d57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10896000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200691d57fe5b60325a03f115156200692b57fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562896000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515620069fc57fe5b60325a03f1151562006a0a57fe5b50505060405180519050905062006a218262008d01565b62006a3181600b60010262008bc1565b5b5050505050505050565b600060006001915082518451141562006b8157600090505b83518160ff16101562006b7b57828160ff1681518110151562006a7357fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916848260ff1681518110151562006af257fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614151562006b6c57600091505b5b808060010191505062006a54565b62006b86565b600091505b81151562006cee577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e6720606279746573272076616c7565000000000000815250602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb60405180807f2020457870656374656400000000000000000000000000000000000000000000815250602001807f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000815250602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb60405180807f202041637475616c000000000000000000000000000000000000000000000000815250602001807f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000815250602001905060405180910390a162006ced62008d6f565b5b5b50505050565b62006d22600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1662002c28565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663770eb5bb600460149054906101000a900474010000000000000000000000000000000000000000026040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001807f666f6f0000000000000000000000000000000000000000000000000000000000815250602001915050600060405180830381600087803b151562006e2957fe5b60325a03f1151562006e3757fe5b505050600460149054906101000a9004740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a17790260405180807f666f6f0000000000000000000000000000000000000000000000000000000000815250602001905060405180910390a262006ff7600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ac016a31600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562006fb857fe5b60325a03f1151562006fc657fe5b505050604051805190507f666f6f000000000000000000000000000000000000000000000000000000000062008bc1565b5b565b6000600060006000600060006000600060006000600060006000600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660036000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515620070da57fe5b60325a03f11515620070e857fe5b505050604051805190509c50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200718357fe5b60325a03f115156200719157fe5b505050604051805190509b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888d600b6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200726957fe5b60325a03f115156200727757fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200730957fe5b60325a03f115156200731757fe5b505050604051805190509a50600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888c60056040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620073ef57fe5b60325a03f11515620073fd57fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200748f57fe5b60325a03f115156200749d57fe5b505050604051805190509950600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888b600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200757557fe5b60325a03f115156200758357fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200761557fe5b60325a03f115156200762357fe5b505050604051805190509850600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888a60106040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620076fb57fe5b60325a03f115156200770957fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200779b57fe5b60325a03f11515620077a957fe5b505050604051805190509750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888960126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200788157fe5b60325a03f115156200788f57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168f6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620079e357fe5b60325a03f11515620079f157fe5b505050604051805190509650600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168e6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562007b4e57fe5b60325a03f1151562007b5c57fe5b505050604051805190509550600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168d6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562007cb957fe5b60325a03f1151562007cc757fe5b505050604051805190509450600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168c6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562007e2457fe5b60325a03f1151562007e3257fe5b505050604051805190509350600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168b6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562007f8f57fe5b60325a03f1151562007f9d57fe5b505050604051805190509250600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f108e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200806e57fe5b60325a03f115156200807c57fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e5628e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200814d57fe5b60325a03f115156200815b57fe5b505050604051805190509050620081728262008d01565b6200818281600c60010262008bc1565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389ee639d8e896040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200192505050600060405180830381600087803b15156200827457fe5b60325a03f115156200828257fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389ee639d8e886040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200192505050600060405180830381600087803b15156200837757fe5b60325a03f115156200838557fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f108e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200844d57fe5b60325a03f115156200845b57fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e5628e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200852c57fe5b60325a03f115156200853a57fe5b505050604051805190509050620085518262008d01565b6200856181600e60010262008bc1565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168e6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620086b257fe5b60325a03f11515620086c057fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f108e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200879057fe5b60325a03f115156200879e57fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e5628e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200886f57fe5b60325a03f115156200887d57fe5b505050604051805190509050620088948262008d01565b620088a481600c60010262008bc1565b5b50505050505050505050505050565b600060009054906101000a900460ff1681565b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151562008a75577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e67206061646472657373272076616c756500000000815250602001905060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258160405180807f20204578706563746564000000000000000000000000000000000000000000008152506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258260405180807f2020202041637475616c000000000000000000000000000000000000000000008152506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a162008a7462008d6f565b5b5b5050565b8060001916826000191614151562008bbc577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e67206062797465733332272076616c756500000000815250602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8160405180807f2020457870656374656400000000000000000000000000000000000000000000815250602001826000191660001916815260200191505060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8260405180807f2020202041637475616c00000000000000000000000000000000000000000000815250602001826000191660001916815260200191505060405180910390a162008bbb62008d6f565b5b5b5050565b62008bcd828262008a7a565b5b5050565b808214151562008cfc577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e67206075696e74272076616c756500000000000000815250602001905060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78160405180807f202045787065637465640000000000000000000000000000000000000000000081525060200182815260200191505060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78260405180807f2020202041637475616c0000000000000000000000000000000000000000000081525060200182815260200191505060405180910390a162008cfb62008d6f565b5b5b5050565b80151562008d6b577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f417373657274696f6e206661696c656400000000000000000000000000000000815250602001905060405180910390a162008d6a62008d6f565b5b5b50565b6001600060016101000a81548160ff0219169083151502179055505b565b60405161021b8062008d9f8339019056006060604052341561000c57fe5b60405160208061021b833981016040528080519060200190919050505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505b61019f8061007c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063ba22e5621461003b575bfe5b341561004357fe5b610070600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061008e565b60405180826000191660001916815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151561015457fe5b60325a03f1151561016157fe5b5050506040518051905090505b9190505600a165627a7a723058208b0e2806378549f88192bc1e88e1fcd160618a776b6926f3ba110abc4f9668140029a165627a7a7230582036f7e40c5d7777112ad00c9464075326746c79c93dad212c66ac3191f715e6200029606060405260017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff02191690837401000000000000000000000000000000000000000090040217905550341561005f57fe5b5b6123ed8061006f6000396000f300606060405236156100ef576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633b25757b146100f15780634e71d92d14610187578063516e4424146101db578063533deb301461024a57806368e4d727146102a1578063770eb5bb1461031a5780637a177cc61461035e57806381031eba146103d75780638981d5131461048f57806389ee639d14610506578063ac016a311461055d578063aed0a6e6146105b0578063b47a2f101461067c578063ba22e562146106cb578063c90858201461071e578063f303b6ac14610774578063fad8e711146107ed575bfe5b34156100f957fe5b610185600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610860565b005b341561018f57fe5b610197610b14565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156101e357fe5b610230600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b3d565b604051808215151515815260200191505060405180910390f35b341561025257fe5b61029f600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610d4e565b005b34156102a957fe5b6102d6600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610e8f565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561032257fe5b61035c600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803560001916906020019091905050610eff565b005b341561036657fe5b610393600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610fea565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156103df57fe5b61044b600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611283565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561049757fe5b6104c4600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611430565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561050e57fe5b61055b600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061149f565b005b341561056557fe5b610592600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611700565b60405180826000191660001916815260200191505060405180910390f35b34156105b857fe5b610605600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061174f565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019250505060405180910390f35b341561068457fe5b6106b1600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506118ae565b604051808215151515815260200191505060405180910390f35b34156106d357fe5b610700600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611c0b565b60405180826000191660001916815260200191505060405180910390f35b341561072657fe5b610772600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611fb8565b005b341561077c57fe5b6107a9600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506120fd565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156107f557fe5b610842600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061219f565b60405180826000191660001916815260200191505060405180910390f35b836108a061086d82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b82600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508473ffffffffffffffffffffffffffffffffffffffff19167f62ba5ff08854575a78f11e69ef033464759a0d1b4a7737d7532084865ea000fc858585604051808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001935050505060405180910390a25b5b5050505050565b6000610b3760017401000000000000000000000000000000000000000002610fea565b90505b90565b6000600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515610d2e57fe5b60325a03f11515610d3b57fe5b5050506040518051905090505b92915050565b81610d8e610d5b82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160006101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508273ffffffffffffffffffffffffffffffffffffffff19167fec4fd4fb7f733324f380320915ea65152c17fa7f202718be1ce4bf88cfd61e5583604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000290505b919050565b81610f3f610f0c82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060010181600019169055508273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779028360405180826000191660001916815260200191505060405180910390a25b5b505050565b6000600160009054906101000a90047401000000000000000000000000000000000000000002905061104d600074010000000000000000000000000000000000000000028273ffffffffffffffffffffffffffffffffffffffff191614156123b0565b6001600160009054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555033600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060017401000000000000000000000000000000000000000002600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c6101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508073ffffffffffffffffffffffffffffffffffffffff19167fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a261127a8183610d4e565b8090505b919050565b6000836112c561129282611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a900474010000000000000000000000000000000000000000029150611368600074010000000000000000000000000000000000000000028373ffffffffffffffffffffffffffffffffffffffff191614156123b0565b600182740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c6101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555061142385838686610860565b8191505b5b509392505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b816114df6114ac82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b6000600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060007401000000000000000000000000000000000000000002600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508273ffffffffffffffffffffffffffffffffffffffff19167f0be474a55c16887f4473fcdbdcae7da92be6da32d23ccbc2736c511007d8771583604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206001015490505b919050565b60006000600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a90047401000000000000000000000000000000000000000002915091505b9250929050565b6000600060006000600060009450600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900493506001600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004118015611a45575083600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004115b15611c01576000925060009150600190505b600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004811015611bfa576000600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600301600083740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611bec57611bda86827401000000000000000000000000000000000000000002610b3d565b94508415611beb5781806001019250505b5b5b8080600101915050611a57565b8382101594505b5b50505050919050565b600060006000600060006000600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900494506001600060008973ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004118015611da0575084600060008973ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004115b15611fa8576000935060009250600190505b600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004811015611f7c576000600060008973ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600301600083740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611f6e57611f3587827401000000000000000000000000000000000000000002610b3d565b15611f6d57611f5b8782740100000000000000000000000000000000000000000261219f565b91508160019004840193506001830192505b5b5b8080600101915050611db2565b600083118015611f8c5750848310155b15611fa7578284811515611f9c57fe5b046001029550611fae565b5b60006000fd5b5050505050919050565b81611ff8611fc582611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146123b0565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b60006001600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900403740100000000000000000000000000000000000000000290505b919050565b6000600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151561239057fe5b60325a03f1151561239d57fe5b5050506040518051905090505b92915050565b8015156123bd5760006000fd5b5b505600a165627a7a723058204cf099a1f83e537a815b05d98bfab56bdeab5a274325d72048d801db5338aff50029606060405260017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff02191690837401000000000000000000000000000000000000000090040217905550341561005f57fe5b5b610d558061006f6000396000f300606060405236156100b8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806320202965146100ba5780633f29cd27146101095780634e71d92d1461015d578063770eb5bb146101b15780638981d513146101f5578063a160bdf51461026c578063a69a5588146102c5578063a99ffb7b14610309578063ac016a3114610362578063b47a2f10146103b5578063ba22e56214610404578063c908582014610457575bfe5b34156100c257fe5b6100ef600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506104ad565b604051808215151515815260200191505060405180910390f35b341561011157fe5b61015b600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919080356000191690602001909190803564ffffffffff169060200190919050506104d8565b005b341561016557fe5b61016d6106ab565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156101b957fe5b6101f3600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091908035600019169060200190919050506108a3565b005b34156101fd57fe5b61022a600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061098e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561027457fe5b6102a1600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506109fd565b604051808264ffffffffff1664ffffffffff16815260200191505060405180910390f35b34156102cd57fe5b610307600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803560001916906020019091905050610a5d565b005b341561031157fe5b61033e600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610a8d565b604051808264ffffffffff1664ffffffffff16815260200191505060405180910390f35b341561036a57fe5b610397600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610aed565b60405180826000191660001916815260200191505060405180910390f35b34156103bd57fe5b6103ea600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b3c565b604051808215151515815260200191505060405180910390f35b341561040c57fe5b610439600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b50565b60405180826000191660001916815260200191505060405180910390f35b341561045f57fe5b6104ab600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610bb5565b005b60006104b8826109fd565b64ffffffffff166104c7610cfa565b64ffffffffff16101590505b919050565b826105186104e58261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b82600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201816000191690555061056d610cfa565b600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160006101000a81548164ffffffffff021916908364ffffffffff16021790555081600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160056101000a81548164ffffffffff021916908364ffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff19167f90a633a4a2ae23be4c20dd1f7cfe2f504e94c72375b96ad676914f78b67cd22884846040518083600019166000191681526020018264ffffffffff1664ffffffffff1681526020019250505060405180910390a25b5b50505050565b6000600160009054906101000a90047401000000000000000000000000000000000000000002905061070e600074010000000000000000000000000000000000000000028273ffffffffffffffffffffffffffffffffffffffff19161415610d03565b6001600160009054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555033600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff19167fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28090505b90565b816108e36108b08261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060010181600019169055508273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779028360405180826000191660001916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160059054906101000a900464ffffffffff1690505b919050565b610a8882827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6104d8565b5b5050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160009054906101000a900464ffffffffff1690505b919050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206001015490505b919050565b6000610b483383610d14565b90505b919050565b6000610b5c3383610d14565b1515610b685760006000fd5b600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206002015490505b919050565b81610bf5610bc28261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b60004290505b90565b801515610d105760006000fd5b5b50565b6000610d1f826104ad565b1590505b929150505600a165627a7a7230582062b7172a2837e2179aee6022ee2477d95cd8d71e2a67a1de6fdd8e2be330bbfb0029"
  },
  "DSFeeds": {
    "interface": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "expired",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "value",
            "type": "bytes32"
          },
          {
            "name": "expiration",
            "type": "uint40"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "set_label",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "expiration",
        "outputs": [
          {
            "name": "",
            "type": "uint40"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "value",
            "type": "bytes32"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "timestamp",
        "outputs": [
          {
            "name": "",
            "type": "uint40"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "label",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "peek",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "value",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "set_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "expiration",
            "type": "uint40"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      }
    ],
    "bytecode": "606060405260017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff02191690837401000000000000000000000000000000000000000090040217905550341561005f57fe5b5b610d558061006f6000396000f300606060405236156100b8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806320202965146100ba5780633f29cd27146101095780634e71d92d1461015d578063770eb5bb146101b15780638981d513146101f5578063a160bdf51461026c578063a69a5588146102c5578063a99ffb7b14610309578063ac016a3114610362578063b47a2f10146103b5578063ba22e56214610404578063c908582014610457575bfe5b34156100c257fe5b6100ef600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506104ad565b604051808215151515815260200191505060405180910390f35b341561011157fe5b61015b600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919080356000191690602001909190803564ffffffffff169060200190919050506104d8565b005b341561016557fe5b61016d6106ab565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156101b957fe5b6101f3600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091908035600019169060200190919050506108a3565b005b34156101fd57fe5b61022a600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061098e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561027457fe5b6102a1600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506109fd565b604051808264ffffffffff1664ffffffffff16815260200191505060405180910390f35b34156102cd57fe5b610307600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803560001916906020019091905050610a5d565b005b341561031157fe5b61033e600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610a8d565b604051808264ffffffffff1664ffffffffff16815260200191505060405180910390f35b341561036a57fe5b610397600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610aed565b60405180826000191660001916815260200191505060405180910390f35b34156103bd57fe5b6103ea600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b3c565b604051808215151515815260200191505060405180910390f35b341561040c57fe5b610439600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b50565b60405180826000191660001916815260200191505060405180910390f35b341561045f57fe5b6104ab600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610bb5565b005b60006104b8826109fd565b64ffffffffff166104c7610cfa565b64ffffffffff16101590505b919050565b826105186104e58261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b82600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201816000191690555061056d610cfa565b600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160006101000a81548164ffffffffff021916908364ffffffffff16021790555081600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160056101000a81548164ffffffffff021916908364ffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff19167f90a633a4a2ae23be4c20dd1f7cfe2f504e94c72375b96ad676914f78b67cd22884846040518083600019166000191681526020018264ffffffffff1664ffffffffff1681526020019250505060405180910390a25b5b50505050565b6000600160009054906101000a90047401000000000000000000000000000000000000000002905061070e600074010000000000000000000000000000000000000000028273ffffffffffffffffffffffffffffffffffffffff19161415610d03565b6001600160009054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555033600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff19167fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28090505b90565b816108e36108b08261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060010181600019169055508273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779028360405180826000191660001916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160059054906101000a900464ffffffffff1690505b919050565b610a8882827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6104d8565b5b5050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160009054906101000a900464ffffffffff1690505b919050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206001015490505b919050565b6000610b483383610d14565b90505b919050565b6000610b5c3383610d14565b1515610b685760006000fd5b600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206002015490505b919050565b81610bf5610bc28261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b60004290505b90565b801515610d105760006000fd5b5b50565b6000610d1f826104ad565b1590505b929150505600a165627a7a72305820d1bdde3548adabb09d841e42eb58a41a353702e711b400c8cc719b81d46a803b0029"
  },
  "DSFeedsEvents": {
    "interface": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "expiration",
            "type": "uint40"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      }
    ],
    "bytecode": "60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a723058208fcf8036206780fc7b4344f14efb1dc50411cc73b738e699719dcf7bbccff8770029"
  },
  "DSFeedsInterface": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "value",
            "type": "bytes32"
          },
          {
            "name": "expiration",
            "type": "uint40"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "peek",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "value",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      }
    ],
    "bytecode": ""
  },
  "DSTest": {
    "interface": [
      {
        "constant": false,
        "inputs": [],
        "name": "setUp",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "target",
            "type": "address"
          }
        ],
        "name": "expectEventsExact",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "failed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "a",
            "type": "bytes"
          },
          {
            "name": "b",
            "type": "bytes"
          }
        ],
        "name": "assertEq0",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "IS_TEST",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "target",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "exact",
            "type": "bool"
          }
        ],
        "name": "eventListener",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "logs",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "log_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "address"
          }
        ],
        "name": "log_named_address",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "bytes32"
          }
        ],
        "name": "log_named_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_uint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          }
        ],
        "name": "log_named_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          }
        ],
        "name": "log_named_uint",
        "type": "event"
      }
    ],
    "bytecode": "6060604052341561000c57fe5b5b6001600060006101000a81548160ff0219169083151502179055505b5b610536806100396000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630a9254e4146100675780638af784dc14610079578063ba414fa6146100af578063f578fd85146100d9578063fa7626d414610176575bfe5b341561006f57fe5b6100776101a0565b005b341561008157fe5b6100ad600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101a3565b005b34156100b757fe5b6100bf610217565b604051808215151515815260200191505060405180910390f35b34156100e157fe5b610174600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061022a565b005b341561017e57fe5b6101866104d9565b604051808215151515815260200191505060405180910390f35b5b565b7f190835d3ea3627fcd8cd319a6778f7f8798c3704b4af777966fba6571bcd76e8816001604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a15b50565b600060019054906101000a900460ff1681565b600060006001915082518451141561036857600090505b83518160ff16101561036357828160ff1681518110151561025e57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916848260ff168151811015156102dc57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614151561035557600091505b5b8080600101915050610241565b61036d565b600091505b8115156104d2577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e6720606279746573272076616c7565000000000000815250602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb60405180807f2020457870656374656400000000000000000000000000000000000000000000815250602001807f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000815250602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb60405180807f202041637475616c000000000000000000000000000000000000000000000000815250602001807f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000815250602001905060405180910390a16104d16104ec565b5b5b50505050565b600060009054906101000a900460ff1681565b6001600060016101000a81548160ff0219169083151502179055505b5600a165627a7a7230582004d4bfb9b95ff52dcb9cbbcb76a749d410687f81f277aa826d3a0afbff15f34a0029"
  },
  "FakePerson": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "repeater_",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "constructor"
      }
    ],
    "bytecode": "6060604052341561000c57fe5b60405160208061021b833981016040528080519060200190919050505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505b61019f8061007c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063ba22e5621461003b575bfe5b341561004357fe5b610070600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061008e565b60405180826000191660001916815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151561015457fe5b60325a03f1151561016157fe5b5050506040518051905090505b9190505600a165627a7a72305820ab2c6d8d71ec179fc85c8f6e08b9c7607f0083da46fc9a3b97e382f4f55b76ec0029"
  },
  "MedianRepeater": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "peekFeed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "set_min",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "min",
        "outputs": [
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "set_label",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "set",
        "outputs": [
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "unset",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "label",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "getFeedInfo",
        "outputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "peek",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "set_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "feedsQuantity",
        "outputs": [
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "readFeed",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "LogUnset",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "LogSetMin",
        "type": "event"
      }
    ],
    "bytecode": "606060405260017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff02191690837401000000000000000000000000000000000000000090040217905550341561005f57fe5b5b6125d98061006f6000396000f300606060405236156100ef576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633b25757b146100f15780634e71d92d14610187578063516e4424146101db578063533deb301461024a57806368e4d727146102a1578063770eb5bb1461031a5780637a177cc61461035e57806381031eba146103d75780638981d5131461048f57806389ee639d14610506578063ac016a311461055d578063aed0a6e6146105b0578063b47a2f101461067c578063ba22e562146106cb578063c90858201461071e578063f303b6ac14610774578063fad8e711146107ed575bfe5b34156100f957fe5b610185600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610860565b005b341561018f57fe5b610197610b14565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156101e357fe5b610230600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b3d565b604051808215151515815260200191505060405180910390f35b341561025257fe5b61029f600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610d4e565b005b34156102a957fe5b6102d6600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610e8f565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561032257fe5b61035c600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803560001916906020019091905050610eff565b005b341561036657fe5b610393600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610fea565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156103df57fe5b61044b600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611283565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561049757fe5b6104c4600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611430565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561050e57fe5b61055b600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061149f565b005b341561056557fe5b610592600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611700565b60405180826000191660001916815260200191505060405180910390f35b34156105b857fe5b610605600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061174f565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019250505060405180910390f35b341561068457fe5b6106b1600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506118ae565b604051808215151515815260200191505060405180910390f35b34156106d357fe5b610700600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611c0b565b60405180826000191660001916815260200191505060405180910390f35b341561072657fe5b610772600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612190565b005b341561077c57fe5b6107a9600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506122d5565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156107f557fe5b610842600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050612377565b60405180826000191660001916815260200191505060405180910390f35b836108a061086d82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b82600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508473ffffffffffffffffffffffffffffffffffffffff19167f62ba5ff08854575a78f11e69ef033464759a0d1b4a7737d7532084865ea000fc858585604051808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001935050505060405180910390a25b5b5050505050565b6000610b3760017401000000000000000000000000000000000000000002610fea565b90505b90565b6000600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515610d2e57fe5b60325a03f11515610d3b57fe5b5050506040518051905090505b92915050565b81610d8e610d5b82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160006101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508273ffffffffffffffffffffffffffffffffffffffff19167fec4fd4fb7f733324f380320915ea65152c17fa7f202718be1ce4bf88cfd61e5583604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000290505b919050565b81610f3f610f0c82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060010181600019169055508273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779028360405180826000191660001916815260200191505060405180910390a25b5b505050565b6000600160009054906101000a90047401000000000000000000000000000000000000000002905061104d600074010000000000000000000000000000000000000000028273ffffffffffffffffffffffffffffffffffffffff19161415612588565b6001600160009054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555033600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060017401000000000000000000000000000000000000000002600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c6101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508073ffffffffffffffffffffffffffffffffffffffff19167fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a261127a8183610d4e565b8090505b919050565b6000836112c561129282611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a900474010000000000000000000000000000000000000000029150611368600074010000000000000000000000000000000000000000028373ffffffffffffffffffffffffffffffffffffffff19161415612588565b600182740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c6101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555061142385838686610860565b8191505b5b509392505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b816114df6114ac82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b6000600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060007401000000000000000000000000000000000000000002600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508273ffffffffffffffffffffffffffffffffffffffff19167f0be474a55c16887f4473fcdbdcae7da92be6da32d23ccbc2736c511007d8771583604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206001015490505b919050565b60006000600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a90047401000000000000000000000000000000000000000002915091505b9250929050565b6000600060006000600060009450600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900493506001600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004118015611a45575083600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004115b15611c01576000925060009150600190505b600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004811015611bfa576000600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600301600083740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611bec57611bda86827401000000000000000000000000000000000000000002610b3d565b94508415611beb5781806001019250505b5b5b8080600101915050611a57565b8382101594505b5b50505050919050565b60006000611c17612599565b60006000600060006000600060008a73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900496506001600060008b73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004118015611daa575086600060008b73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004115b1561217e57600060008a73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004604051805910611e3a5750595b908082528060200260200182016040525b50955060009450600192505b600060008a73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900483101561213a576000600060008b73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600301600085740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561212c57611fda89847401000000000000000000000000000000000000000002610b3d565b1561212b5761200089847401000000000000000000000000000000000000000002612377565b935060008514806120335750856001860381518110151561201d57fe5b9060200190602002015160001916846000191610155b156120645783868681518110151561204757fe5b906020019060200201906000191690816000191681525050612122565b600091505b858281518110151561207757fe5b9060200190602002015160001916846000191610151561209e578180600101925050612069565b8490505b818111156120fa5785600182038151811015156120bb57fe5b9060200190602002015186828151811015156120d357fe5b9060200190602002019060001916908160001916815250505b8080600190039150506120a2565b83868381518110151561210957fe5b9060200190602002019060001916908160001916815250505b84806001019550505b5b5b8280600101935050611e57565b60008511801561214a5750868510155b1561217d578560026001870381151561215f57fe5b0481518110151561216c57fe5b906020019060200201519750612184565b5b60006000fd5b50505050505050919050565b816121d061219d82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b60006001600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900403740100000000000000000000000000000000000000000290505b919050565b6000600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151561256857fe5b60325a03f1151561257557fe5b5050506040518051905090505b92915050565b8015156125955760006000fd5b5b50565b6020604051908101604052806000815250905600a165627a7a7230582099ccda10ef2001064d3bffda2d04c71b8b8b013c1a4ba393c985955f6a6fadbb0029"
  },
  "MedianRepeaterTest": {
    "interface": [
      {
        "constant": false,
        "inputs": [],
        "name": "test_get_feedInfo",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "setUp",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "time",
        "outputs": [
          {
            "name": "",
            "type": "uint40"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFail_set_label_unauth",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_claim_with_no_minimum",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_read_three",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFail_set_owner_unauth",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_set_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_claim",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_is_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_read",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "target",
            "type": "address"
          }
        ],
        "name": "expectEventsExact",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_read_with_three_expired",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_feeds_quantity",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFail_read_with_three_expired",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "failed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_read_with_two_expired",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_read_feed",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "a",
            "type": "bytes"
          },
          {
            "name": "b",
            "type": "bytes"
          }
        ],
        "name": "assertEq0",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_set_label",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "test_unset",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "IS_TEST",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "LogUnset",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "LogSetMin",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "target",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "exact",
            "type": "bool"
          }
        ],
        "name": "eventListener",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "logs",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "log_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "address"
          }
        ],
        "name": "log_named_address",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "bytes32"
          }
        ],
        "name": "log_named_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_uint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          }
        ],
        "name": "log_named_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          }
        ],
        "name": "log_named_uint",
        "type": "event"
      }
    ],
    "bytecode": "60606040526200000e620001ab565b809050604051809103906000f08015156200002557fe5b600060026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200006f620001bc565b809050604051809103906000f08015156200008657fe5b600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000d0620001bc565b809050604051809103906000f0801515620000e757fe5b600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000131620001bc565b809050604051809103906000f08015156200014857fe5b600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b6001600060006101000a81548160ff0219169083151502179055505b620001cd565b6040516126488062009c4d83390190565b604051610dc4806200c29583390190565b619a7080620001dd6000396000f300606060405236156200013d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063068a19d9146200013f5780630a9254e4146200015457806316ada5471462000169578063277e268e14620001a05780633a93f15514620001b55780635c4b532214620001ca5780635d0ad8d014620001df5780637bc7638814620001f45780637ce8e196146200020957806380bdc068146200021e578063831d520d14620002335780638af784dc1462000248578063a9459e441462000281578063a98711121462000296578063aa73f66614620002ab578063ba414fa614620002c0578063e381174914620002ed578063f10d2a061462000302578063f578fd851462000317578063f6a2512714620003b7578063f722ac2314620003cc578063fa7626d414620003e1575bfe5b34156200014857fe5b620001526200040e565b005b34156200015d57fe5b62000167620008d5565b005b34156200017257fe5b6200017c62000abe565b604051808264ffffffffff1664ffffffffff16815260200191505060405180910390f35b3415620001a957fe5b620001b362000ac7565b005b3415620001be57fe5b620001c862000be2565b005b3415620001d357fe5b620001dd62000e20565b005b3415620001e857fe5b620001f26200187a565b005b3415620001fd57fe5b62000207620019c3565b005b34156200021257fe5b6200021c62001d26565b005b34156200022757fe5b6200023162001f9b565b005b34156200023c57fe5b62000246620020a9565b005b34156200025157fe5b6200027f600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506200323f565b005b34156200028a57fe5b62000294620032b3565b005b34156200029f57fe5b620002a962004376565b005b3415620002b457fe5b620002be62004de5565b005b3415620002c957fe5b620002d362005eac565b604051808215151515815260200191505060405180910390f35b3415620002f657fe5b6200030062005ebf565b005b34156200030b57fe5b6200031562007063565b005b34156200032057fe5b620003b5600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050620074c7565b005b3415620003c057fe5b620003ca62007780565b005b3415620003d557fe5b620003df62007a85565b005b3415620003ea57fe5b620003f46200933f565b604051808215151515815260200191505060405180910390f35b600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620004a357fe5b60325a03f11515620004b157fe5b505050604051805190509250600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460326040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200058957fe5b60325a03f115156200059757fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200070e57fe5b60325a03f115156200071c57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663aed0a6e6600460149054906101000a90047401000000000000000000000000000000000000000002856000604051604001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200192505050604060405180830381600087803b15156200084557fe5b60325a03f115156200085357fe5b50505060405180519060200180519050915091506200089582600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1662009352565b620008cf8173ffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff191662009505565b5b505050565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff166200090262009818565b808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f08015156200094c57fe5b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc6600374010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562000a6957fe5b60325a03f1151562000a7757fe5b50505060405180519050600460146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055505b565b60004290505b90565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663770eb5bb600460149054906101000a900474010000000000000000000000000000000000000000026040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001807f666f6f0000000000000000000000000000000000000000000000000000000000815250602001915050600060405180830381600087803b151562000bce57fe5b60325a03f1151562000bdc57fe5b5050505b565b62000c0f600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff166200323f565b62000c57600460149054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900460016200964c565b62000d22600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562000cea57fe5b60325a03f1151562000cf857fe5b5050506040518051905074010000000000000000000000000000000000000000900460026200964c565b600274010000000000000000000000000000000000000000027fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4930604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a2600274010000000000000000000000000000000000000000027fec4fd4fb7f733324f380320915ea65152c17fa7f202718be1ce4bf88cfd61e5560016040518082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b565b6000600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562000eb757fe5b60325a03f1151562000ec557fe5b505050604051805190509350600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558885600b6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562000f9d57fe5b60325a03f1151562000fab57fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200103d57fe5b60325a03f115156200104b57fe5b505050604051805190509250600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460106040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200112357fe5b60325a03f115156200113157fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620011c357fe5b60325a03f11515620011d157fe5b505050604051805190509150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558883600f6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620012a957fe5b60325a03f11515620012b757fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200142e57fe5b60325a03f115156200143c57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620015bb57fe5b60325a03f11515620015c957fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200174857fe5b60325a03f115156200175657fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200184957fe5b60325a03f115156200185757fe5b5050506040518051905090506200187381600f6001026200977b565b5b50505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c9085820600460149054906101000a90047401000000000000000000000000000000000000000002600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b1515620019af57fe5b60325a03f11515620019bd57fe5b5050505b565b620019f0600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff166200323f565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c9085820600460149054906101000a90047401000000000000000000000000000000000000000002600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b151562001b2557fe5b60325a03f1151562001b3357fe5b505050600460149054906101000a9004740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a262001d23600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638981d513600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562001ce257fe5b60325a03f1151562001cf057fe5b50505060405180519050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1662009352565b5b565b62001d53600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff166200323f565b62001d9b600460149054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900460016200964c565b62001e9d600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660016000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562001e6557fe5b60325a03f1151562001e7357fe5b5050506040518051905074010000000000000000000000000000000000000000900460026200964c565b600274010000000000000000000000000000000000000000027fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4930604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a2600274010000000000000000000000000000000000000000027fec4fd4fb7f733324f380320915ea65152c17fa7f202718be1ce4bf88cfd61e5560016040518082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b565b620020a6600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638981d513600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200208757fe5b60325a03f115156200209557fe5b505050604051805190503062009352565b5b565b6000600060006000600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200214657fe5b60325a03f115156200215457fe5b505050604051805190509650600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558888600b6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200222c57fe5b60325a03f115156200223a57fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620022cc57fe5b60325a03f11515620022da57fe5b505050604051805190509550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888760056040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620023b257fe5b60325a03f11515620023c057fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200245257fe5b60325a03f115156200246057fe5b505050604051805190509450600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558886600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200253857fe5b60325a03f115156200254657fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620025d857fe5b60325a03f11515620025e657fe5b505050604051805190509350600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888560106040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620026be57fe5b60325a03f11515620026cc57fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200275e57fe5b60325a03f115156200276c57fe5b505050604051805190509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200284457fe5b60325a03f115156200285257fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168a6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620029c957fe5b60325a03f11515620029d757fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562002b5657fe5b60325a03f1151562002b6457fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562002ce357fe5b60325a03f1151562002cf157fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562002e7057fe5b60325a03f1151562002e7e57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562002ffd57fe5b60325a03f115156200300b57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515620030fe57fe5b60325a03f115156200310c57fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200320057fe5b60325a03f115156200320e57fe5b50505060405180519050905062003225826200978c565b6200323581600b6001026200977b565b5b50505050505050565b7f190835d3ea3627fcd8cd319a6778f7f8798c3704b4af777966fba6571bcd76e8816001604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a15b50565b6000600060006000600060006000600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660036000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200338757fe5b60325a03f115156200339557fe5b505050604051805190509650600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200343057fe5b60325a03f115156200343e57fe5b505050604051805190509550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2787600b60006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b15156200352657fe5b60325a03f115156200353457fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620035c657fe5b60325a03f11515620035d457fe5b505050604051805190509450600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2786600560006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b1515620036bc57fe5b60325a03f11515620036ca57fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200375c57fe5b60325a03f115156200376a57fe5b505050604051805190509350600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558885600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200384257fe5b60325a03f115156200385057fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620038e257fe5b60325a03f11515620038f057fe5b505050604051805190509250600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2784601060006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b1515620039d857fe5b60325a03f11515620039e657fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562003a7857fe5b60325a03f1151562003a8657fe5b505050604051805190509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888360126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562003b5e57fe5b60325a03f1151562003b6c57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562003cc057fe5b60325a03f1151562003cce57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562003e2a57fe5b60325a03f1151562003e3857fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562003f9457fe5b60325a03f1151562003fa257fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620040fe57fe5b60325a03f115156200410c57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200426857fe5b60325a03f115156200427657fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10886000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200434657fe5b60325a03f115156200435457fe5b5050506040518051905090506200436c81156200978c565b5b50505050505050565b6000600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200440d57fe5b60325a03f115156200441b57fe5b505050604051805190509350600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558885600b6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620044f357fe5b60325a03f115156200450157fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200459357fe5b60325a03f11515620045a157fe5b505050604051805190509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460056040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200467957fe5b60325a03f115156200468757fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200471957fe5b60325a03f115156200472757fe5b505050604051805190509150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558883600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620047ff57fe5b60325a03f115156200480d57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200498457fe5b60325a03f115156200499257fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562004b1157fe5b60325a03f1151562004b1f57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562004c9e57fe5b60325a03f1151562004cac57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f303b6ac600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562004d9f57fe5b60325a03f1151562004dad57fe5b50505060405180519050740100000000000000000000000000000000000000009004905062004dde8160036200964c565b5b50505050565b6000600060006000600060006000600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660036000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562004eb957fe5b60325a03f1151562004ec757fe5b505050604051805190509650600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562004f6257fe5b60325a03f1151562004f7057fe5b505050604051805190509550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2787600b60006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b15156200505857fe5b60325a03f115156200506657fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620050f857fe5b60325a03f115156200510657fe5b505050604051805190509450600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2786600560006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b1515620051ee57fe5b60325a03f11515620051fc57fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200528e57fe5b60325a03f115156200529c57fe5b505050604051805190509350600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558885600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200537457fe5b60325a03f115156200538257fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200541457fe5b60325a03f115156200542257fe5b505050604051805190509250600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2784601060006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b15156200550a57fe5b60325a03f115156200551857fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620055aa57fe5b60325a03f11515620055b857fe5b505050604051805190509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888360126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200569057fe5b60325a03f115156200569e57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620057f257fe5b60325a03f115156200580057fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200595c57fe5b60325a03f115156200596a57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562005ac657fe5b60325a03f1151562005ad457fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562005c3057fe5b60325a03f1151562005c3e57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba88600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562005d9a57fe5b60325a03f1151562005da857fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562886000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562005e7857fe5b60325a03f1151562005e8657fe5b50505060405180519050905062005ea28160006001026200977b565b5b50505050505050565b600060019054906101000a900460ff1681565b60006000600060006000600060006000600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660036000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562005f9557fe5b60325a03f1151562005fa357fe5b505050604051805190509750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200603e57fe5b60325a03f115156200604c57fe5b505050604051805190509650600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2788600b60006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b15156200613457fe5b60325a03f115156200614257fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620061d457fe5b60325a03f11515620061e257fe5b505050604051805190509550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888760056040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620062ba57fe5b60325a03f11515620062c857fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200635a57fe5b60325a03f115156200636857fe5b505050604051805190509450600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a558886600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200644057fe5b60325a03f115156200644e57fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620064e057fe5b60325a03f11515620064ee57fe5b505050604051805190509350600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f29cd2785601060006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001836001026000191681526020018264ffffffffff1681526020019350505050600060405180830381600087803b1515620065d657fe5b60325a03f11515620065e457fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200667657fe5b60325a03f115156200668457fe5b505050604051805190509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888460126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200675c57fe5b60325a03f115156200676a57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168a6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620068be57fe5b60325a03f11515620068cc57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562006a2857fe5b60325a03f1151562006a3657fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562006b9257fe5b60325a03f1151562006ba057fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562006cfc57fe5b60325a03f1151562006d0a57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba89600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562006e6657fe5b60325a03f1151562006e7457fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10896000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562006f4457fe5b60325a03f1151562006f5257fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562896000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200702357fe5b60325a03f115156200703157fe5b50505060405180519050905062007048826200978c565b6200705881600a6001026200977b565b5b5050505050505050565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620070f657fe5b60325a03f115156200710457fe5b505050604051805190509150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888360326040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b1515620071dc57fe5b60325a03f11515620071ea57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba600460149054906101000a90047401000000000000000000000000000000000000000002600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200736157fe5b60325a03f115156200736f57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fad8e711600460149054906101000a90047401000000000000000000000000000000000000000002846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200192505050602060405180830381600087803b15156200749857fe5b60325a03f11515620074a657fe5b505050604051805190509050620074c28160326001026200977b565b5b5050565b60006000600191508251845114156200760c57600090505b83518160ff1610156200760657828160ff16815181101515620074fe57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916848260ff168151811015156200757d57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141515620075f757600091505b5b8080600101915050620074df565b62007611565b600091505b81151562007779577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e6720606279746573272076616c7565000000000000815250602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb60405180807f2020457870656374656400000000000000000000000000000000000000000000815250602001807f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000815250602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb60405180807f202041637475616c000000000000000000000000000000000000000000000000815250602001807f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000815250602001905060405180910390a162007778620097fa565b5b5b50505050565b620077ad600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff166200323f565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663770eb5bb600460149054906101000a900474010000000000000000000000000000000000000000026040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001807f666f6f0000000000000000000000000000000000000000000000000000000000815250602001915050600060405180830381600087803b1515620078b457fe5b60325a03f11515620078c257fe5b505050600460149054906101000a9004740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a17790260405180807f666f6f0000000000000000000000000000000000000000000000000000000000815250602001905060405180910390a262007a82600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ac016a31600460149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562007a4357fe5b60325a03f1151562007a5157fe5b505050604051805190507f666f6f00000000000000000000000000000000000000000000000000000000006200977b565b5b565b6000600060006000600060006000600060006000600060006000600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a177cc660036000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562007b6557fe5b60325a03f1151562007b7357fe5b505050604051805190509c50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562007c0e57fe5b60325a03f1151562007c1c57fe5b505050604051805190509b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888d600b6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562007cf457fe5b60325a03f1151562007d0257fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562007d9457fe5b60325a03f1151562007da257fe5b505050604051805190509a50600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888c60056040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b151562007e7a57fe5b60325a03f1151562007e8857fe5b505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151562007f1a57fe5b60325a03f1151562007f2857fe5b505050604051805190509950600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888b600a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200800057fe5b60325a03f115156200800e57fe5b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b1515620080a057fe5b60325a03f11515620080ae57fe5b505050604051805190509850600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888a60106040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200818657fe5b60325a03f115156200819457fe5b505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156200822657fe5b60325a03f115156200823457fe5b505050604051805190509750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a69a55888960126040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018260010260001916815260200192505050600060405180830381600087803b15156200830c57fe5b60325a03f115156200831a57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168f6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200846e57fe5b60325a03f115156200847c57fe5b505050604051805190509650600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168e6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620085d957fe5b60325a03f11515620085e757fe5b505050604051805190509550600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168d6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200874457fe5b60325a03f115156200875257fe5b505050604051805190509450600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168c6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620088af57fe5b60325a03f11515620088bd57fe5b505050604051805190509350600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168b6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562008a1a57fe5b60325a03f1151562008a2857fe5b505050604051805190509250600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f108e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562008af957fe5b60325a03f1151562008b0757fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e5628e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562008bd857fe5b60325a03f1151562008be657fe5b50505060405180519050905062008bfd826200978c565b62008c0d81600b6001026200977b565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389ee639d8e896040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200192505050600060405180830381600087803b151562008cff57fe5b60325a03f1151562008d0d57fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389ee639d8e886040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200192505050600060405180830381600087803b151562008e0257fe5b60325a03f1151562008e1057fe5b505050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f108e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562008ed857fe5b60325a03f1151562008ee657fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e5628e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151562008fb757fe5b60325a03f1151562008fc557fe5b50505060405180519050905062008fdc826200978c565b62008fec8160106001026200977b565b600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166381031eba8e600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168e6000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200913d57fe5b60325a03f115156200914b57fe5b5050506040518051905050600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f108e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b15156200921b57fe5b60325a03f115156200922957fe5b505050604051805190509150600060029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e5628e6000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515620092fa57fe5b60325a03f115156200930857fe5b5050506040518051905090506200931f826200978c565b6200932f81600a6001026200977b565b5b50505050505050505050505050565b600060009054906101000a900460ff1681565b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151562009500577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e67206061646472657373272076616c756500000000815250602001905060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258160405180807f20204578706563746564000000000000000000000000000000000000000000008152506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258260405180807f2020202041637475616c000000000000000000000000000000000000000000008152506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1620094ff620097fa565b5b5b5050565b8060001916826000191614151562009647577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e67206062797465733332272076616c756500000000815250602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8160405180807f2020457870656374656400000000000000000000000000000000000000000000815250602001826000191660001916815260200191505060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8260405180807f2020202041637475616c00000000000000000000000000000000000000000000815250602001826000191660001916815260200191505060405180910390a162009646620097fa565b5b5b5050565b808214151562009776577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4572726f723a2057726f6e67206075696e74272076616c756500000000000000815250602001905060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78160405180807f202045787065637465640000000000000000000000000000000000000000000081525060200182815260200191505060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78260405180807f2020202041637475616c0000000000000000000000000000000000000000000081525060200182815260200191505060405180910390a162009775620097fa565b5b5b5050565b62009787828262009505565b5b5050565b801515620097f6577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f417373657274696f6e206661696c656400000000000000000000000000000000815250602001905060405180910390a1620097f5620097fa565b5b5b50565b6001600060016101000a81548160ff0219169083151502179055505b565b60405161021b806200982a8339019056006060604052341561000c57fe5b60405160208061021b833981016040528080519060200190919050505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505b61019f8061007c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063ba22e5621461003b575bfe5b341561004357fe5b610070600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061008e565b60405180826000191660001916815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151561015457fe5b60325a03f1151561016157fe5b5050506040518051905090505b9190505600a165627a7a72305820ab2c6d8d71ec179fc85c8f6e08b9c7607f0083da46fc9a3b97e382f4f55b76ec0029a165627a7a72305820bd282dfab0b82365de3c56bfb221e8d4e087c9515c5bfc25812647a9651cb16d0029606060405260017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff02191690837401000000000000000000000000000000000000000090040217905550341561005f57fe5b5b6125d98061006f6000396000f300606060405236156100ef576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633b25757b146100f15780634e71d92d14610187578063516e4424146101db578063533deb301461024a57806368e4d727146102a1578063770eb5bb1461031a5780637a177cc61461035e57806381031eba146103d75780638981d5131461048f57806389ee639d14610506578063ac016a311461055d578063aed0a6e6146105b0578063b47a2f101461067c578063ba22e562146106cb578063c90858201461071e578063f303b6ac14610774578063fad8e711146107ed575bfe5b34156100f957fe5b610185600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610860565b005b341561018f57fe5b610197610b14565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156101e357fe5b610230600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b3d565b604051808215151515815260200191505060405180910390f35b341561025257fe5b61029f600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610d4e565b005b34156102a957fe5b6102d6600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610e8f565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561032257fe5b61035c600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803560001916906020019091905050610eff565b005b341561036657fe5b610393600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610fea565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156103df57fe5b61044b600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611283565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561049757fe5b6104c4600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611430565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561050e57fe5b61055b600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061149f565b005b341561056557fe5b610592600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611700565b60405180826000191660001916815260200191505060405180910390f35b34156105b857fe5b610605600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061174f565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019250505060405180910390f35b341561068457fe5b6106b1600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506118ae565b604051808215151515815260200191505060405180910390f35b34156106d357fe5b610700600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050611c0b565b60405180826000191660001916815260200191505060405180910390f35b341561072657fe5b610772600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612190565b005b341561077c57fe5b6107a9600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506122d5565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156107f557fe5b610842600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050612377565b60405180826000191660001916815260200191505060405180910390f35b836108a061086d82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b82600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508473ffffffffffffffffffffffffffffffffffffffff19167f62ba5ff08854575a78f11e69ef033464759a0d1b4a7737d7532084865ea000fc858585604051808473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001935050505060405180910390a25b5b5050505050565b6000610b3760017401000000000000000000000000000000000000000002610fea565b90505b90565b6000600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b47a2f10600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b1515610d2e57fe5b60325a03f11515610d3b57fe5b5050506040518051905090505b92915050565b81610d8e610d5b82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160006101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508273ffffffffffffffffffffffffffffffffffffffff19167fec4fd4fb7f733324f380320915ea65152c17fa7f202718be1ce4bf88cfd61e5583604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000290505b919050565b81610f3f610f0c82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060010181600019169055508273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779028360405180826000191660001916815260200191505060405180910390a25b5b505050565b6000600160009054906101000a90047401000000000000000000000000000000000000000002905061104d600074010000000000000000000000000000000000000000028273ffffffffffffffffffffffffffffffffffffffff19161415612588565b6001600160009054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555033600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060017401000000000000000000000000000000000000000002600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c6101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508073ffffffffffffffffffffffffffffffffffffffff19167fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a261127a8183610d4e565b8090505b919050565b6000836112c561129282611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a900474010000000000000000000000000000000000000000029150611368600074010000000000000000000000000000000000000000028373ffffffffffffffffffffffffffffffffffffffff19161415612588565b600182740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c6101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555061142385838686610860565b8191505b5b509392505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b816114df6114ac82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b6000600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060007401000000000000000000000000000000000000000002600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160146101000a8154816bffffffffffffffffffffffff021916908374010000000000000000000000000000000000000000900402179055508273ffffffffffffffffffffffffffffffffffffffff19167f0be474a55c16887f4473fcdbdcae7da92be6da32d23ccbc2736c511007d8771583604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206001015490505b919050565b60006000600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a90047401000000000000000000000000000000000000000002915091505b9250929050565b6000600060006000600060009450600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900493506001600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004118015611a45575083600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004115b15611c01576000925060009150600190505b600060008773ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004811015611bfa576000600060008873ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600301600083740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611bec57611bda86827401000000000000000000000000000000000000000002610b3d565b94508415611beb5781806001019250505b5b5b8080600101915050611a57565b8382101594505b5b50505050919050565b60006000611c17612599565b60006000600060006000600060008a73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060020160009054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900496506001600060008b73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004118015611daa575086600060008b73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004115b1561217e57600060008a73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004604051805910611e3a5750595b908082528060200260200182016040525b50955060009450600192505b600060008a73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900483101561213a576000600060008b73ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600301600085740100000000000000000000000000000000000000000273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561212c57611fda89847401000000000000000000000000000000000000000002610b3d565b1561212b5761200089847401000000000000000000000000000000000000000002612377565b935060008514806120335750856001860381518110151561201d57fe5b9060200190602002015160001916846000191610155b156120645783868681518110151561204757fe5b906020019060200201906000191690816000191681525050612122565b600091505b858281518110151561207757fe5b9060200190602002015160001916846000191610151561209e578180600101925050612069565b8490505b818111156120fa5785600182038151811015156120bb57fe5b9060200190602002015186828151811015156120d357fe5b9060200190602002019060001916908160001916815250505b8080600190039150506120a2565b83868381518110151561210957fe5b9060200190602002019060001916908160001916815250505b84806001019550505b5b5b8280600101935050611e57565b60008511801561214a5750868510155b1561217d578560026001870381151561215f57fe5b0481518110151561216c57fe5b906020019060200201519750612184565b5b60006000fd5b50505050505050919050565b816121d061219d82611430565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612588565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b60006001600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201600c9054906101000a9004740100000000000000000000000000000000000000000274010000000000000000000000000000000000000000900403740100000000000000000000000000000000000000000290505b919050565b6000600060008473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ba22e562600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160149054906101000a900474010000000000000000000000000000000000000000026000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001915050602060405180830381600087803b151561256857fe5b60325a03f1151561257557fe5b5050506040518051905090505b92915050565b8015156125955760006000fd5b5b50565b6020604051908101604052806000815250905600a165627a7a7230582099ccda10ef2001064d3bffda2d04c71b8b8b013c1a4ba393c985955f6a6fadbb0029606060405260017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff02191690837401000000000000000000000000000000000000000090040217905550341561005f57fe5b5b610d558061006f6000396000f300606060405236156100b8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806320202965146100ba5780633f29cd27146101095780634e71d92d1461015d578063770eb5bb146101b15780638981d513146101f5578063a160bdf51461026c578063a69a5588146102c5578063a99ffb7b14610309578063ac016a3114610362578063b47a2f10146103b5578063ba22e56214610404578063c908582014610457575bfe5b34156100c257fe5b6100ef600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506104ad565b604051808215151515815260200191505060405180910390f35b341561011157fe5b61015b600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919080356000191690602001909190803564ffffffffff169060200190919050506104d8565b005b341561016557fe5b61016d6106ab565b604051808273ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34156101b957fe5b6101f3600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091908035600019169060200190919050506108a3565b005b34156101fd57fe5b61022a600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190505061098e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561027457fe5b6102a1600480803573ffffffffffffffffffffffffffffffffffffffff19169060200190919050506109fd565b604051808264ffffffffff1664ffffffffff16815260200191505060405180910390f35b34156102cd57fe5b610307600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803560001916906020019091905050610a5d565b005b341561031157fe5b61033e600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610a8d565b604051808264ffffffffff1664ffffffffff16815260200191505060405180910390f35b341561036a57fe5b610397600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610aed565b60405180826000191660001916815260200191505060405180910390f35b34156103bd57fe5b6103ea600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b3c565b604051808215151515815260200191505060405180910390f35b341561040c57fe5b610439600480803573ffffffffffffffffffffffffffffffffffffffff1916906020019091905050610b50565b60405180826000191660001916815260200191505060405180910390f35b341561045f57fe5b6104ab600480803573ffffffffffffffffffffffffffffffffffffffff191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610bb5565b005b60006104b8826109fd565b64ffffffffff166104c7610cfa565b64ffffffffff16101590505b919050565b826105186104e58261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b82600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff19168152602001908152602001600020600201816000191690555061056d610cfa565b600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160006101000a81548164ffffffffff021916908364ffffffffff16021790555081600060008673ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160056101000a81548164ffffffffff021916908364ffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff19167f90a633a4a2ae23be4c20dd1f7cfe2f504e94c72375b96ad676914f78b67cd22884846040518083600019166000191681526020018264ffffffffff1664ffffffffff1681526020019250505060405180910390a25b5b50505050565b6000600160009054906101000a90047401000000000000000000000000000000000000000002905061070e600074010000000000000000000000000000000000000000028273ffffffffffffffffffffffffffffffffffffffff19161415610d03565b6001600160009054906101000a90047401000000000000000000000000000000000000000002740100000000000000000000000000000000000000009004017401000000000000000000000000000000000000000002600160006101000a8154816bffffffffffffffffffffffff0219169083740100000000000000000000000000000000000000009004021790555033600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff19167fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f4933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28090505b90565b816108e36108b08261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060010181600019169055508273ffffffffffffffffffffffffffffffffffffffff19167f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779028360405180826000191660001916815260200191505060405180910390a25b5b505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160059054906101000a900464ffffffffff1690505b919050565b610a8882827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6104d8565b5b5050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060030160009054906101000a900464ffffffffff1690505b919050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206001015490505b919050565b6000610b483383610d14565b90505b919050565b6000610b5c3383610d14565b1515610b685760006000fd5b600060008373ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206002015490505b919050565b81610bf5610bc28261098e565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d03565b81600060008573ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff19167ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b60004290505b90565b801515610d105760006000fd5b5b50565b6000610d1f826104ad565b1590505b929150505600a165627a7a72305820d1bdde3548adabb09d841e42eb58a41a353702e711b400c8cc719b81d46a803b0029"
  },
  "Repeater": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "peekFeed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "set_min",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "min",
        "outputs": [
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "set_label",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "set",
        "outputs": [
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "unset",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "label",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "getFeedInfo",
        "outputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "peek",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "value",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "set_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "feedsQuantity",
        "outputs": [
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "readFeed",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "LogUnset",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "LogSetMin",
        "type": "event"
      }
    ],
    "bytecode": ""
  },
  "RepeaterEvents": {
    "interface": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "LogUnset",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "LogSetMin",
        "type": "event"
      }
    ],
    "bytecode": "60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a7230582052c86fd496cddeae4bdda2db3ac3509ac7b2fce535419c0c628d9a78c27bf4cc0029"
  },
  "RepeaterInterface": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          },
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "set_min",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "min",
            "type": "bytes12"
          }
        ],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "position",
            "type": "bytes12"
          }
        ],
        "name": "set",
        "outputs": [
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "feedId",
            "type": "bytes12"
          }
        ],
        "name": "unset",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "peek",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "value",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      }
    ],
    "bytecode": ""
  }
};

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      if(!(obj['type'].split('[')[0] in this.classes)) continue;
      this.objects[i] = this.classes[obj['type'].split('[')[0]].at(obj.value);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapp['feed-repeater'];
}
