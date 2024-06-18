const { showThrottleMessage } = require("ethers");
const { ethers } = require("hardhat");

async function main () {

  const [vicm] = await ethers.getSigners();
  const vicmcontract = await ethers.getContractFactory("CoinFlip");
  const attackcontract = await ethers.getContractFactory("Attack");
  const deploycontract_v = await vicmcontract.deploy();
  const deploycontract_a = await attackcontract.deploy(deploycontract_v.target);

  console.log("Flip contract deployed at: ", deploycontract_v.target);
  console.log("Attack contract deployed at: ", deploycontract_a.target);

  for (var i=0; i<10; i++){
    await deploycontract_a.letflip();
  }

  let number = await deploycontract_v.consecutiveWins();

  console.log(number);
  
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
})
