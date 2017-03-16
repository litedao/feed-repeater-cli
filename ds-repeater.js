#! /usr/bin/env node

const pkg = require('./package.json');
const prettyjson = require('prettyjson');
const program = require('commander');
const CLI = require('clui');
const inquirer = require('inquirer');
const Preferences = require('preferences');
const web3 = require('./web3');
const utils = require('./utils');
const dsfeeds = require('./lib/ds-repeater');

const Spinner = CLI.Spinner;
const status = new Spinner('Connecting to network...');

const prefs = new Preferences('com.dapphub.dsfeeds');

function dump(data, options = {}) {
  console.log(prettyjson.render(data, options));
}

function clearPreferences() {
  Object.keys(prefs).forEach((prop) => {
    delete prefs[prop];
  });
}
function showAccountSelector() {
  const question = [
    {
      name: 'account',
      message: 'Select your default account:',
      type: 'list',
      choices: web3.eth.accounts,
    },
  ];
  return inquirer.prompt(question);
}

function askForContractAddress() {
  const questions = [
    {
      name: 'contract',
      message: 'Enter feed contract address:',
      type: 'input',
      default: prefs.contract || '',
      validate: str => (
        web3.isAddress(str) || 'Invalid contract address'
      ),
    },
  ];
  return inquirer.prompt(questions);
}

function getDefaultAccount() {
  if (prefs.account) {
    return Promise.resolve({ account: prefs.account });
  }
  return showAccountSelector();
}

function getDefaultContractAddress() {
  if (prefs.contract) {
    return Promise.resolve({ contract: prefs.contract });
  }
  return askForContractAddress();
}

function runMethod(method, args) {
  // status.start();
  utils.getNetwork().then((network) => {
    status.stop();
    prefs.network = network;
    return getDefaultAccount();
  })
  .then((answer) => {
    prefs.account = answer.account;
    web3.eth.defaultAccount = answer.account;
    return getDefaultContractAddress();
  })
  .then((answer) => {
    prefs.contract = answer.contract;
    const dsfeedsOb = dsfeeds(prefs.contract, prefs.network);
    if (dsfeedsOb[method]) {
      if (method === 'inspect') {
        console.log('Getting result... Please wait.');
        dump(dsfeedsOb.inspect(...utils.prepareArgs(args, 'bytes12')));
      } else {
        const setterMethod = method === 'claim' || method === 'set' || method.indexOf('set_') !== -1 || method === 'unset';
        const subMethod = utils.detectMethodArgs(dsfeedsOb[method], args.length);
        let func = subMethod ? dsfeedsOb[method][subMethod] : dsfeedsOb[method];
        func = setterMethod ? func : func.call;
        const preparedArgs = subMethod ? utils.prepareArgs(args, subMethod) : args;
        if (setterMethod) {
          console.log('Waiting for your approval... Please sign the transaction.');
        } else {
          console.log('Getting result... Please wait.');
        }
        func(...preparedArgs, (e, r) => {
          if (!e) {
            if (!e) {
              if (setterMethod) {
                // It means we are calling a writing method
                console.log(`Transaction ${r} was generated. Waiting for confirmation...`);

                dsfeedsOb.filter({}, (err, id) => {
                  if (err) {
                    console.log('Error: ', err.message);
                  } else if (dsfeedsOb.owner(id) === prefs.account) {
                    dump(dsfeedsOb.inspect(id.substring(0, 26)));
                  } else {
                    console.warn('Something weird: ', id);
                  }
                  process.exit();
                });
              } else {
                // It means we are calling a read method
                dump(r);
              }
            } else {
              console.warn('Something weird: ', e);
            }
          }
        });
      }
    }
  })
  .catch((error) => {
    status.stop();
    console.log(error);
    process.exit(1);
  });
}

program
  .version(pkg.version)
  .option('-c, --clear', 'clear user preferences')
  .option('-a, --account [account]', 'set default account')
  .option('-f, --contract [account]', 'set default feed contract address')
  .option('-i, --info', 'prints default information');

const commands = [
  'inspect [repeaterId]',
  'owner [repeaterId]',
  'label [repeaterId]',
  'timestamp [repeaterId]',
  'expiration [repeaterId]',
  'expired [repeaterId]',
  'get [repeaterId]',
  'tryGet [repeaterId]',
  'claim',
  'set [repeaterId, value, expiration]',
  'set [repeaterId, value] (expiration = unlimited)',
  'set_owner [repeaterId, ownerAddress]',
  'set_label [repeaterId, labelText]',
];

commands.map(command => command.split(' ')[0]).filter(utils.unique).forEach((command) => {
  program
  .command(`${command} [args...]`)
  .action((args) => {
    runMethod(command, args);
  });
});

program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  commands.forEach((command) => {
    console.log(`    $ ds-repeater ${command}`);
  });
  console.log('');
});

program.parse(process.argv); // end with parse to parse through the input

if (program.clear) {
  clearPreferences();
  console.log('Cleared preferences.');
}

if (program.account) {
  if (program.account === true) {
    showAccountSelector().then((answer) => {
      prefs.account = answer.account;
      web3.eth.defaultAccount = answer.account;
    });
  } else if (web3.isAddress(program.account)) {
    prefs.account = program.account;
    web3.eth.defaultAccount = program.account;
    console.log('Set default account');
  } else {
    console.log('Error: account invalid');
  }
}

if (program.contract) {
  if (program.contract === true) {
    askForContractAddress().then((answer) => {
      prefs.contract = answer.contract;
    });
  } else if (web3.isAddress(program.contract)) {
    prefs.contract = program.contract;
    console.log('Set feed contract address');
  } else {
    console.log('Error: feed contract address invalid');
  }
}

if (program.info) {
  dump(prefs);
}

// if (!program.args.length) program.help();
