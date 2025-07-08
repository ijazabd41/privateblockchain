// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract DocumentRegistry is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant HEALTHCARE_ROLE = keccak256("HEALTHCARE_ROLE");
    bytes32 public constant AGRICULTURE_ROLE = keccak256("AGRICULTURE_ROLE");
    bytes32 public constant FINANCE_ROLE = keccak256("FINANCE_ROLE");

    struct Document {
        string hash;
        address owner;
        string domain;
        uint256 timestamp;
    }

    mapping(string => Document) private documents;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // replaces _setupRole
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function registerDocument(string memory docId, string memory hash, string memory domain) public {
        require(documents[docId].timestamp == 0, "Document already exists");

        if (keccak256(bytes(domain)) == keccak256("healthcare")) {
            require(hasRole(HEALTHCARE_ROLE, msg.sender), "Unauthorized domain access");
        } else if (keccak256(bytes(domain)) == keccak256("agriculture")) {
            require(hasRole(AGRICULTURE_ROLE, msg.sender), "Unauthorized domain access");
        } else if (keccak256(bytes(domain)) == keccak256("finance")) {
            require(hasRole(FINANCE_ROLE, msg.sender), "Unauthorized domain access");
        }

        documents[docId] = Document(hash, msg.sender, domain, block.timestamp);
    }

    function getDocument(string memory docId) public view returns (string memory, address, string memory, uint256) {
        Document memory doc = documents[docId];
        require(doc.timestamp != 0, "Document not found");
        return (doc.hash, doc.owner, doc.domain, doc.timestamp);
    }
}
