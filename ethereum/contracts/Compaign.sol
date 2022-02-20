// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.8 <0.9.0;

contract FactoryCompaign {
    address[] public deployedCompaigns;

    function createCompaigns(uint _minContribution) public {
        address newCompaign = address(new Compaign(_minContribution, msg.sender));
        deployedCompaigns.push(newCompaign);
    }
    
    function getDeployedCompaigns() public view returns(address[] memory){
        return deployedCompaigns;
    }
}

contract Compaign {
    struct Request {
        string description;
        address recipient;
        uint value;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint public numRequests;
    mapping(uint => Request) public requests;
    
    uint public minContribution;
    address payable public manager;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint _minContribution, address creator) {
        manager = payable(creator);
        minContribution = _minContribution; 
    }

    function contribute() public payable {
        require (msg.value > minContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory _description, uint _value, address _recipient) public restricted {
        Request storage newRequest = requests[numRequests++];
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;       
    }

    function approveRequest(uint index) public {
        
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > approversCount / 2);
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address) {
        return (
            minContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return numRequests;
    }
}