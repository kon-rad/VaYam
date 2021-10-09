// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.9;
pragma abicoderv2;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import "hardhat/console.sol";

contract VaYemMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _accountIds;

    address payable owner;
    uint256 accountCreationPrice = 0.0025 ether;

    mapping(bytes32 => Account) private accounts;

    bytes32[] public accountHashes;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Job {
        uint256 jobId;
        bytes32 accountHash;
        string title;
        string description;
        address acc_owner;
        uint256 pricePerWeek;
        bool active;
    }

    // todo: add reviews
    struct Account {
        uint256 accountId;
        bytes32 hash;
        string title;
        string description;
        string imageUrl;
        address payable acc_owner;
        Job[] jobs;
        uint256 jobIds;
    }

    event AccountCreated (
        uint256 indexed accountId,
        bytes32 hash,
        string title,
        string description,
        string imageUrl,
        address acc_owner,
        Job[] jobs,
        uint256 jobIds
    );

    event JobCreated (
        uint256 indexed jobId,
        bytes32 accountHash,
        string title,
        string description,
        address acc_owner,
        uint256 pricePerWeek,
        bool active
    );
    
    function createAccount(string title, string description, string imageUrl) public payable nonReentrant {
        require(msg.value == accountCreationPrice, "Price must equal to account creation price");
        _accountIds.increment();
        uint256 accountId = _accountIds.current();

        // todo: check if title, description, imageUrl are not empty
        // bytes memory tempEmptyStringTest = bytes(emptyStringTest); // Uses memory

        bytes32 hash = keccak256(abi.encodePacked(msg.sender, block.number));

        require(!accountExists(hash), "Account must not already exist in the same block!");

        accountIndex.push(hash);

        accounts[hash] = Account(
            accountId,
            hash,
            title,
            description,
            imageUrl,
            payable(msg.sender),
            [],
            0
        );

        accountHashes.push(hash);

        emit AccountCreated(
            accountId,
            hash,
            title,
            description,
            imageUrl,
            payable(msg.sender),
            []
        );
    }

    function createJob(
        bytes32 accountHash,
        string title,
        string description,
        uint256 pricePerWeek
    ) public payable nonReentrant {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can create new jobs");

        uint256 newJobId = accounts[accountHash].jobIds + 1;
        
        accounts[accountHash].jobs[newJobId] = Job(
            newJobId,
            accountHash,
            title,
            description,
            acc_owner,
            pricePerWeek,
            true
        );
        accounts[accountHash].jobIds = newJobId;

        emit JobCreated(
            newJobId,
            accountHash,
            title,
            description,
            acc_owner,
            pricePerWeek,
            true
        );
    }

    function pauseJob(bytes32 accountHash, uint jobId) public {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can pause jobs");

        accounts[accountHash].jobs[jobId].isActive = false;
    }

    function activateJob(bytes32 accountHash, uint jobId) public {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can activate jobs");

        accounts[accountHash].jobs[jobId].isActive = true;
    }

    function deleteJob(bytes32 accountHash, uint jobId) public {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can delete jobs");

        delete accounts[accountHash].jobs[jobId];
    }

    function fetchAllJobs(bytes32 accountHash) public view returns (Job[] memory) {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can view all jobs");

        uint totalJobsCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < accounts[accountHash].jobs.length; i++) {
            if (accounts[accountHash].jobs[i] != address(0)) {
                totalJobsCount += 1;
            }
        }

        Job[] jobs = new Job[]()(totalJobsCount);

        for (uint i = 0; i < totalJobsCount; i++) {
            if (accounts[accountHash].jobs[i] != address(0)) {
                jobs[currentIndex] = accounts[accountHash].jobs[i];
                currentIndex += 1;
            }
        }

        return jobs;
    }

    function fetchAllActiveJobs(bytes32 accountHash) public view returns (Job[] memory) {
        uint totalJobsCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < accounts[accountHash].jobs.length; i++) {
            if (accounts[accountHash].jobs[i] != address(0) && accounts[accountHash].jobs[i].isActive) {
                totalJobsCount += 1;
            }
        }

        Job[] jobs = new Job[]()(totalJobsCount);

        for (uint i = 0; i < totalJobsCount; i++) {
            if (accounts[accountHash].jobs[i] != address(0) && accounts[accountHash].jobs[i].isActive) {
                jobs[currentIndex] = accounts[accountHash].jobs[i];
                currentIndex += 1;
            }
        }
        
        return jobs;
    }

    function getAllAccountHashes() public view returns (bytes32[] memory) {
        return submissionIndex;
    }

    function geAccountCount() public view returns (uint256) {
        return accounts.length;
    }

    function fetchAccounts() public view returns (Accounts[] memory) {
        return accounts;
    }

    function deleteAccount(base32 hash) public {
        Account acc = accounts[hash];
        require(msg.sender == acc.owner, "Only the account owner can delete the account.");

        delete accounts[hash];
        removeAccountHash(hash);
    }

    // todo: delete this maybe
    function removeAccInOrder(uint index) private {
        for (uint i = index; i < totalAccounts; i++) {
            accounts[i] = accounts[i + 1];
        }
        accounts.pop();
    }

    function removeAccountHash(base32 hash) private {
        uint length = accountHashes.length;
        for (uint i = 0; i < length; i++) {
            if (accounts[accountHashes[i]].hash == hash) {
                accountHashes[i] = accountHashes[length - 1];
                accountHashes.pop();
                break;
            }
        }
    }

    function fetchJobs(uint256 accountId) public view returns (Job[] memory) {
        return accounts[accountId].jobs;
    }

    function hire(uint256 accountId, uint256 jobId) public payable nonReentrant {
        // todo: add a one time payment option?
        // todo: add a one time up front payment option?
        // todo: add flag if streaming

    }
}
