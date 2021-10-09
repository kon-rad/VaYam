const hre = require('hardhat');

async function main() {
  const Market = await hre.ethers.getContractFactory('VaYamMarketplace');
  const market = await Market.deploy();
  await market.deployed();
  console.log('VaYamMarketplace deployed to: ', market.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
