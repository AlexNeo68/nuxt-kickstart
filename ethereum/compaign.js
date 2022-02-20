import web3 from "@/ethereum/web3";

const compiledCompaign = require("./build/Compaign");

export default (address) => {
  const contract = new web3.eth.Contract(compiledCompaign.abi, address);
  if (process.server) {
    contract.setProvider(
      "https://rinkeby.infura.io/v3/9f410f00e4d94485bbfc70d3ce827a92"
    );
  }
  return contract;
};
