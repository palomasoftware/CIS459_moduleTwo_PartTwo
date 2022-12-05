var Voting = artifacts.require("./Voting.sol");
module.exports = function(deployer) {
        const listOfCandidates = ['Johnny', 'Amber','noneOfAbove']
        deployer.deploy(Voting, listOfCandidates.map(name => web3.utils.asciiToHex(name) ));
};

