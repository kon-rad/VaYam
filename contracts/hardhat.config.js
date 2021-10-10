require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
const privateKey =
  fs.readFileSync('.secret').toString().trim() || '01234567890123456789';
const goerliKey = fs.readFileSync('.goerliKey').toString().trim() || '01234567890123456789';
const mumbaiKey = fs.readFileSync('.mumbaiKey').toString().trim() || '01234567890123456789';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/v1/' + mumbaiKey,
      accounts: [privateKey],
      chainId: 80001,
    },
    goerli: {
        url: 'https://goerli.infura.io/v3/' + goerliKey,
        chainId: 5,
        accounts: [privateKey],
    }
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
