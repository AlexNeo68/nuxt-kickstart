import Web3 from "web3";

let web3 = null;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  if (process.server) {
    const provider = Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/9f410f00e4d94485bbfc70d3ce827a92"
    );
    web3 = new Web3(provider);
  }
}

export default web3;
