// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import "hardhat/console.sol";

// todo: create utility token for job marketplace 
contract VaYemMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _accountIds;

    address payable owner;
    uint accountCreationPrice = 0.0025 ether;
    uint hiringFee = 0.00025 ether;

    mapping(bytes32 => Account) private accounts;
    mapping(bytes32 => Job) private jobs;

    bytes32[] public accountHashes;
    bytes32[] public jobtHashes;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Job {
        bytes32 jobHash;
        bytes32 accountHash;
        string title;
        string description;
        address acc_owner;
        uint pricePerWeek;
        bool isActive;
        bool exists;
        address[] clients;
    }

    // todo: add reviews
    struct Account {
        uint accountId;
        bytes32 hash;
        string title;
        string description;
        string imageUrl;
        address payable acc_owner;
        uint jobIds;
        bool exists;
        string[] jobHashes;
    }

    event AccountCreated (
        uint indexed accountId,
        bytes32 hash,
        string title,
        string description,
        string imageUrl,
        address acc_owner
    );

    event JobCreated (
        uint indexed jobId,
        bytes32 accountHash,
        string title,
        string description,
        address acc_owner,
        uint pricePerWeek
    );
    
    function createAccount(string calldata title, string  calldata description, string calldata imageUrl) public payable nonReentrant {
        require(msg.value == accountCreationPrice, "Price must equal to account creation price");
        _accountIds.increment();
        uint accountId = _accountIds.current();

        // todo: check if title, description, imageUrl are not empty
        // bytes memory tempEmptyStringTest = bytes(emptyStringTest); // Uses memory

        bytes32 hash = keccak256(abi.encodePacked(msg.sender, block.number));

        require(!accountExists(hash), "Account must not already exist in the same block!");

        // Job[] storage jobs = new Job[](0);
        // Job[] memory jobs = new Job[](totalJobsCount);

        accounts[hash] = Account(
            accountId,
            hash,
            title,
            description,
            imageUrl,
            payable(msg.sender),
            0,
            true,
            new string[]()
        );

        accountHashes.push(hash);

        emit AccountCreated(
            accountId,
            hash,
            title,
            description,
            imageUrl,
            payable(msg.sender)
        );
    }

    function accountExists(bytes32 hash) private returns (bool) {
        return accounts[hash].exists;
    }

    function createJob(
        bytes32 accountHash,
        string calldata title,
        string calldata description,
        uint pricePerWeek
    ) public payable nonReentrant {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can create new jobs");

        bytes32 jobHash = keccak256(abi.encodePacked(msg.sender, block.number));

        jobs[jobHash] = Job(
            jobHash,
            accountHash,
            title,
            description,
            acc_owner,
            pricePerWeek,
            true,
            true,
            new address[](0)
        );
        accounts[accountHash].jobHashes.push(jobHash);

        emit JobCreated(
            jobHash,
            accountHash,
            title,
            description,
            acc_owner,
            pricePerWeek
        );
    }

    function pauseJob(bytes32 accountHash, bytes32 jobHash) public {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can pause jobs");

        jobs[jobHash].isActive = false;
    }

    function activateJob(bytes32 accountHash, bytes32 jobHash) public {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can activate jobs");

        jobs[jobHash].isActive = true;
    }

    function deleteJob(bytes32 accountHash, bytes32 jobHash) public {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can delete jobs");

        delete jobs[jobHash];

        uint length = accounts[accountHash].jobHashes.length;
        // remove job hash from account jobHashes array without maintaining the sort order
        for (uint i = 0; i < length; i++) {
            if (accounts[accountHash].jobHashes[i] == jobHash) {
                accounts[accountHash].jobHashes[i] = accounts[accountHash].jobHashes[length - 1];
                accounts[accountHash].jobHashes.pop();
                break;
            }
        }
    }

    function fetchAllJobs(bytes32 accountHash) public view returns (Job[] memory) {
        address acc_owner = accounts[accountHash].acc_owner;
        require(msg.sender == acc_owner, "Only account owner can view all jobs");

        uint totalJobsCount = accounts[accountHash].jobHashes.length;
        uint currentIndex = 0;

        Job[] memory jobs = new Job[](totalJobsCount);

        for (uint i = 0; i < totalJobsCount; i++) {
            if (jobs[accounts[accountHash].jobHashes[i]].exists) {
                
                Job storage currentItem = jobs[accounts[accountHash].jobHashes[i]];
                jobs[currentIndex] = currentItem;

                currentIndex += 1;
            }
        }

        return jobs;
    }

    function fetchAllActiveJobs(bytes32 accountHash) public view returns (Job[] memory) {
        uint activeJobsCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < accounts[accountHash].jobs.length; i++) {
            if (jobs[accounts[accountHash].jobHashes[i]].exists && jobs[accounts[accountHash].jobHashes[i]].isActive) {
                activeJobsCount += 1;
            }
        }

        Job[] memory jobs = new Job[](activeJobsCount);

        for (uint i = 0; i < activeJobsCount; i++) {
            if (jobs[accounts[accountHash].jobHashes[i]].exists && jobs[accounts[accountHash].jobHashes[i]].isActive) {
                
                Job storage currentItem = jobs[accounts[accountHash].jobHashes[i]];
                jobs[currentIndex] = currentItem;

                currentIndex += 1;
            }
        }
        
        return jobs;
    }

    function getAllAccountHashes() public view returns (bytes32[] memory) {
        return accountHashes;
    }

    function getAccountCount() public view returns (uint) {
        return accountHashes.length;
    }

    function deleteAccount(bytes32 hash) public {
        require(msg.sender == accounts[hash].acc_owner, "Only the account owner can delete the account.");

        delete accounts[hash];
        removeAccountHash(hash);
        // todo: delete account jobs
    }

    function removeAccountHash(bytes32 hash) private {
        uint length = accountHashes.length;
        for (uint i = 0; i < length; i++) {
            if (accounts[accountHashes[i]].hash == hash) {
                accountHashes[i] = accountHashes[length - 1];
                accountHashes.pop();
                break;
            }
        }
    }

    function hire(bytes32 hash, uint jobId) public payable nonReentrant {
        // todo: add a one time payment option?
        // todo: add a one time up front payment option?
        // todo: add flag if streaming?
        require(accounts[hash].jobs[jobId].isActive, "Job must be active to hire");

        require(msg.value == hiringFee, "Price must be equal to hiring fee");

        uint length = accounts[hash].jobs[jobId].clients.length;
        // make sure that the client was not already added in the array
        for (uint i = 0; i < length; i++) {
            require(accounts[hash].jobs[jobId].clients[i] != msg.sender, "Client may only hire one time per a job");
        }

        accounts[hash].jobs[jobId].clients.push(msg.sender);
    }

    function endJob(bytes32 hash, uint jobId) public payable nonReentrant {
        require(accounts[hash].jobs[jobId].isActive, "Job must be active to end the job");

        uint length = accounts[hash].jobs[jobId].clients.length;
        // remove client from array without maintaining the sort order
        for (uint i = 0; i < length; i++) {
            if (accounts[hash].jobs[jobId].clients[i] == msg.sender) {
                accounts[hash].jobs[jobId].clients[i] = accounts[hash].jobs[jobId].clients[length - 1];
                accounts[hash].jobs[jobId].clients.pop();
                break;
            }
        }

        accounts[hash].jobs[jobId].clients.push(msg.sender);
    }
}
