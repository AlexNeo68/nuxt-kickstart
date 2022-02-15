const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
// const web3 = new Web3("HTTP://127.0.0.1:7545");

const compiledFactoryCompaign = require("../ethereum/build/FactoryCompaign");
const compiledCompaign = require("../ethereum/build/Compaign");

let account;
let factory;
let compaign;
let compaignAddress;

beforeEach(async () => {
  [account, approver] = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactoryCompaign.abi)
    .deploy({
      data: compiledFactoryCompaign.evm.bytecode.object,
    })
    .send({
      from: account,
      gas: "4500000",
    });

  await factory.methods.createCompaigns("100").send({
    from: account,
    gas: "1000000",
  });
  [compaignAddress] = await factory.methods.getDeployedCompaigns().call();
  compaign = await new web3.eth.Contract(compiledCompaign.abi, compaignAddress);
});

describe("Compaign test", () => {
  it("contracts is deployed", () => {
    assert.ok(factory.options.address);
    assert.ok(compaign.options.address);
  });

  it("check manager", async () => {
    const manager = await compaign.methods.manager().call();
    assert.equal(account, manager);
  });

  it("check approver", async () => {
    await compaign.methods.contribute().send({
      from: approver,
      value: "1000",
    });

    const isApprover = await compaign.methods.approvers(approver).call();
    assert(isApprover);
  });

  it("check minimum contribution", async () => {
    try {
      await compaign.methods.contribute().send({
        from: approver,
        value: "10",
      });
      assert(false);
    } catch (e) {
      assert(e);
    }
  });

  it("can manager create request", async () => {
    await compaign.methods
      .createRequest("Buy battaries", "100", approver)
      .send({
        from: account,
        gas: "1000000",
      });
    const request = await compaign.methods.requests(0).call();
    assert.equal("Buy battaries", request.description);
  });

  it("full way to recieve money vendor", async () => {
    await compaign.methods.contribute().send({
      from: account,
      value: web3.utils.toWei("10", "ether"),
    });

    await compaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), approver)
      .send({
        from: account,
        gas: "1000000",
      });

    await compaign.methods.approveRequest(0).send({
      from: account,
      gas: "1000000",
    });

    await compaign.methods.finalizeRequest(0).send({
      from: account,
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(approver);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
