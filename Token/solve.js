const { ethers } = require("hardhat");
const contractaddress = "0x8755D348E575Fc4a68EC5d0B609BC7c070ebeA3d";
const useraddress = "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097";

async function main () {
  const signer = await ethers.getSigner(useraddress);
  const contract = await ethers.getContractAt(
    "Token", 
    contractaddress, 
    signer
  );


  let balance = await contract.balanceOf(useraddress);
  
  console.log("before user balance: ", balance);

  let transfer = await contract.transfer(contractaddress, 200);

  balance = await contract.balanceOf(useraddress);

  console.log("after user balance: ", balance);

  balance = await contract.balanceOf(contractaddress);

  console.log("contarct balance: ", balance);
}


main().catch((error) => {
  console.error(error);
  process.exit(1);
})
