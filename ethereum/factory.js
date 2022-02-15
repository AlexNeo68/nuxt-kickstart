import web3 from "@/ethereum/web3";

const address = "0x1A479F16508bB5Edf3eAf3Ce0fA5e29bf8A642f5";

const compiledFactoryCompaign = require("./build/FactoryCompaign");

const contract = new web3.eth.Contract(compiledFactoryCompaign.abi, address);
contract.setProvider(
  "https://rinkeby.infura.io/v3/9f410f00e4d94485bbfc70d3ce827a92"
);

export default contract;
