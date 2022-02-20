import web3 from "@/ethereum/web3";

const address = "0xE65c386cf309C4a4a3f21944E03dae2DE418595F";

const compiledFactoryCompaign = require("./build/FactoryCompaign");

const contract = new web3.eth.Contract(compiledFactoryCompaign.abi, address);

if (process.server) {
  contract.setProvider(
    "https://rinkeby.infura.io/v3/9f410f00e4d94485bbfc70d3ce827a92"
  );
}

export default contract;
