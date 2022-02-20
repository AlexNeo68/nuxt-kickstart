const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const compiledFactoryCompaign = require("../ethereum/build/FactoryCompaign");

const provider = new HDWalletProvider(
  "hotel empty vibrant lizard identify crowd rabbit lobster nut volume park material",
  "https://rinkeby.infura.io/v3/9f410f00e4d94485bbfc70d3ce827a92"
);

//https://rinkeby.infura.io/v3/9f410f00e4d94485bbfc70d3ce827a92

//https://mainnet.infura.io/v3/9f410f00e4d94485bbfc70d3ce827a92

const web3 = new Web3(provider);

const deploy = async () => {
  const [account] = await web3.eth.getAccounts();

  console.log("Attempting account from: ", account);
  try {
    const result = await new web3.eth.Contract(compiledFactoryCompaign.abi)
      .deploy({ data: compiledFactoryCompaign.evm.bytecode.object })
      .send({ from: account, gas: "5000000" });

    console.log("Contract address: ", result.options.address);
  } catch (e) {
    console.log(e);
  }

  provider.engine.stop();
};

deploy();
