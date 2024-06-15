hardhat test code 
const { ethers } = require("hardhat");

async function main () {
  const vicmabi = [
    "constructor()",
    "function contribute() public payable",
    "function getContribution() public view returns (uint256)",
    "function withdraw() public"
  ];


  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractFactory("Fallback");
  const deploycontract = await contract.deploy();
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const mywallet = new ethers.Wallet("0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1", provider);
  const address = deploycontract.target;
  const abicontract = new ethers.Contract(address, vicmabi, mywallet);
  const ownerAddress = await deploycontract.owner();
  let contractbalance = await ethers.provider.getBalance(address);

  console.log("Contract deployed at: ", address);
  console.log("Before contract owner address: ", ownerAddress);

  let eth = ethers.parseEther("0.0001");
  let getContribution = await abicontract.getContribution();
  let contributeTx = await abicontract.contribute({ value: eth });

  console.log("Send contribute transaction hash:", contributeTx.hash);

  await contributeTx.wait();
  eth = ethers.parseEther("0.1");
  const sendTx = await mywallet.sendTransaction({
    to: address,
    value: eth
  });

  console.log("Send transaction(0.1 ETH) hash:", sendTx.hash);
  contractbalance = await ethers.provider.getBalance(address);
  console.log("Before CA balance: ", ethers.formatEther(contractbalance));
  let userbalance = await ethers.provider.getBalance(mywallet.address);

  console.log("Before user balance: ", ethers.formatEther(userbalance));

  await sendTx.wait();
  const afterownerAddress = await deploycontract.owner();

  console.log("After contract owner address: ", afterownerAddress);

  if (afterownerAddress === mywallet.address) {
    let withdrawTx = await abicontract.withdraw();
    console.log("Withdraw transaction hash:", withdrawTx.hash);
    await withdrawTx.wait();

    const balance = await provider.getBalance(mywallet.address);

    console.log("Owner balance after withdrawal:", ethers.formatEther(balance));

    contractbalance = await ethers.provider.getBalance(address);

    console.log("After CA balance: ", ethers.formatEther(contractbalance));
  } else {
    console.log("MyWallet is not the owner, withdraw not attempted");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
})

