const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", "Compaign.sol");
const contractSource = fs.readFileSync(contractPath, "utf8");

fs.ensureDirSync(buildPath);

const input = {
  language: "Solidity",
  sources: {
    "Compaign.sol": {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

for (let contract in output["Compaign.sol"]) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + ".json"),
    output["Compaign.sol"][contract]
  );
}
