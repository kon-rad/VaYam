// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import "hardhat/console.sol";

contract VaYemMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _accountIds;
    Account[] public accounts;

    address payable owner;
    uint256 accountCreationPrice = 0.0025 ether;

    mapping(uint256 => Account) private idToAccount;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Job {
        uint jobId;
        uint accountId;
        string description;
        address acc_owner;
        uint pricePerWeek;
        uint maxUnits;
        bool active;
    }

    struct Account {
        uint accountId;
        string description;
        string imageUrl;
        address payable acc_owner;
        Job[] jobs;
        uint256 jobIds;
    }

    event AccountCreated (
        uint indexed accountId,
        string description,
        string imageUrl,
        address acc_owner,
        Job[] jobs,
        uint256 jobIds
    );

    event JobCreated (
        uint indexed jobId,
        uint indexed accountId,
        string description,
        address acc_owner,
        uint pricePerWeek,
        uint maxUnits,
        bool active
    );
    
    function createAccount() public payable nonReentrant {
        require(msg.value == accountCreationPrice, "Price must equal to account creation price");
        _accountIds.increment();
        uint256 accountId = _accountIds.current();

        idToAccount[accountId] = Account(
            accountId,
            description,
            imageUrl,
            payable(msg.sender),
            [],
            0
        );

        emit AccountCreated(
            accountId,
            description,
            imageUrl,
            payable(msg.sender),
            []
        );
    }

    function createJob(
        uint256 accountId,
        string description,
        uint256 pricePerWeek,
        uint256 maxUnits
    ) public payable nonReentrant {
        address acc_owner = idToAccount[accountId].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can create new jobs");

        uint256 newJobId = idToAccount[accountId].jobIds + 1;
        Job newJob = Job(
            newJobId,
            accountId,
            description,
            acc_owner,
            pricePerWeek,
            maxUnits,
            true
        );

        emit JobCreated(
            newJobId,
            accountId,
            description,
            acc_owner,
            pricePerWeek,
            maxUnits,
            true
        );
    }

    fetchAccounts() public view returns (Accounts[] memory) {
        
    }
}
