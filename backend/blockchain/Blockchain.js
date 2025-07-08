const Block = require('./Block');
const crypto = require('crypto');
const EventEmitter = require('events');

class Blockchain extends EventEmitter {
    constructor() {
        super();
        this.channels = new Map();
        this.chaincodes = new Map();
        this.organizations = new Map();
        this.peers = new Map();
        this.orderers = new Map();
        this.users = new Map();
        this.roles = new Map();
        
        // Initialize default Fabric-like structure
        this.initializeFabricNetwork();
    }

    initializeFabricNetwork() {
        // Create default organizations
        this.createOrganization('Org1', 'healthcare');
        this.createOrganization('Org2', 'agriculture');
        this.createOrganization('Org3', 'finance');
        this.createOrganization('OrgAdmin', 'admin');

        // Create default channel
        this.createChannel('mychannel', ['Org1', 'Org2', 'Org3', 'OrgAdmin']);

        // Create default chaincode
        this.installChaincode('document-registry', '1.0', ['Org1', 'Org2', 'Org3']);

        // Create default users
        this.createUser('admin', 'admin123', 'OrgAdmin', ['ADMIN']);
        this.createUser('healthcare_user', 'health123', 'Org1', ['HEALTHCARE']);
        this.createUser('agriculture_user', 'agri123', 'Org2', ['AGRICULTURE']);
        this.createUser('finance_user', 'finance123', 'Org3', ['FINANCE']);
    }

    // Organization Management
    createOrganization(name, domain) {
        const orgId = crypto.randomBytes(16).toString('hex');
        this.organizations.set(orgId, {
            name,
            domain,
            mspId: `${name}MSP`,
            peers: [],
            users: []
        });
        return orgId;
    }

    // Channel Management
    createChannel(channelName, orgNames) {
        const channel = {
            name: channelName,
            organizations: orgNames,
            chain: [this.createGenesisBlock()],
            chaincodes: new Map(),
            config: {
                batchTimeout: 2000,
                maxMessageCount: 500,
                absoluteMaxBytes: 99 * 1024 * 1024,
                preferredMaxBytes: 512 * 1024,
                maxUniqueCertCount: 100
            }
        };
        
        this.channels.set(channelName, channel);
        console.log(`✅ Channel '${channelName}' created with organizations: ${orgNames.join(', ')}`);
        return channel;
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), { 
            type: 'CONFIG',
            channelConfig: 'Genesis Block for Fabric-inspired Channel'
        }, "0");
    }

    // Chaincode Management
    installChaincode(name, version, orgNames) {
        const chaincodeId = `${name}-${version}`;
        const chaincode = {
            name,
            version,
            organizations: orgNames,
            functions: new Map(),
            state: new Map()
        };

        // Register default chaincode functions
        this.registerChaincodeFunction(chaincodeId, 'registerDocument', this.registerDocument.bind(this));
        this.registerChaincodeFunction(chaincodeId, 'getDocument', this.getDocument.bind(this));
        this.registerChaincodeFunction(chaincodeId, 'getAllDocuments', this.getAllDocuments.bind(this));
        this.registerChaincodeFunction(chaincodeId, 'createUser', this.createUser.bind(this));
        this.registerChaincodeFunction(chaincodeId, 'authenticateUser', this.authenticateUser.bind(this));

        this.chaincodes.set(chaincodeId, chaincode);
        
        // Install on all channels
        for (const [channelName, channel] of this.channels) {
            channel.chaincodes.set(chaincodeId, chaincode);
        }

        console.log(`✅ Chaincode '${chaincodeId}' installed on organizations: ${orgNames.join(', ')}`);
        return chaincodeId;
    }

    registerChaincodeFunction(chaincodeId, functionName, handler) {
        const chaincode = this.chaincodes.get(chaincodeId);
        if (chaincode) {
            chaincode.functions.set(functionName, handler);
        }
    }

    // User Management
    createUser(username, password, organization, roles) {
        const userId = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        
        this.users.set(userId, {
            username,
            password: hashedPassword,
            organization,
            roles: roles || [],
            mspId: `${organization}MSP`
        });

        // Add user to organization
        for (const [orgId, org] of this.organizations) {
            if (org.name === organization) {
                org.users.push(userId);
                break;
            }
        }

        // Grant roles
        roles.forEach(role => {
            if (!this.roles.has(role)) {
                this.roles.set(role, new Set());
            }
            this.roles.get(role).add(userId);
        });

        return userId;
    }

    authenticateUser(username, password) {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        
        for (const [userId, user] of this.users) {
            if (user.username === username && user.password === hashedPassword) {
                return { userId, roles: user.roles, organization: user.organization };
            }
        }
        return null;
    }

    hasRole(userId, role) {
        const user = this.users.get(userId);
        return user && user.roles.includes(role);
    }

    // Fabric-inspired transaction processing
    async invokeChaincode(channelName, chaincodeId, functionName, args, userId) {
        const channel = this.channels.get(channelName);
        if (!channel) {
            throw new Error(`Channel '${channelName}' not found`);
        }

        const chaincode = channel.chaincodes.get(chaincodeId);
        if (!chaincode) {
            throw new Error(`Chaincode '${chaincodeId}' not found on channel '${channelName}'`);
        }

        const handler = chaincode.functions.get(functionName);
        if (!handler) {
            throw new Error(`Function '${functionName}' not found in chaincode '${chaincodeId}'`);
        }

        // Create transaction
        const transaction = {
            txId: crypto.randomBytes(32).toString('hex'),
            channelName,
            chaincodeId,
            functionName,
            args,
            userId,
            timestamp: Date.now(),
            status: 'PENDING'
        };

        try {
            // Execute chaincode function
            const result = await handler(...args, userId);
            
            // Create new block
            const block = new Block(
                channel.chain.length,
                Date.now(),
                {
                    type: 'TRANSACTION',
                    transaction,
                    result
                },
                channel.chain[channel.chain.length - 1].hash
            );

            // Mine block (simplified for demo)
            block.mineBlock(2);
            channel.chain.push(block);

            // Update transaction status
            transaction.status = 'SUCCESS';
            transaction.blockNumber = block.index;

            // Emit event for real-time updates
            this.emit('blockAdded', {
                channelName,
                block: {
                    index: block.index,
                    hash: block.hash,
                    timestamp: block.timestamp,
                    transaction: transaction
                }
            });

            return {
                success: true,
                txId: transaction.txId,
                blockNumber: block.index,
                result
            };

        } catch (error) {
            transaction.status = 'FAILED';
            transaction.error = error.message;
            throw error;
        }
    }

    // Document registry functions (chaincode functions)
    async registerDocument(docId, hash, domain, userId) {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Check domain permissions
        const domainRole = `${domain.toUpperCase()}_ROLE`;
        if (!user.roles.includes(domainRole) && !user.roles.includes('ADMIN')) {
            throw new Error(`Unauthorized domain access: ${domain}`);
        }

        // Check if document already exists
        const existingDoc = await this.getDocument(docId, userId);
        if (existingDoc) {
            throw new Error('Document already exists');
        }

        // Create document record
        const document = {
            hash,
            owner: userId,
            domain,
            timestamp: Date.now(),
            organization: user.organization
        };

        // Store in chaincode state
        const chaincodeId = 'document-registry-1.0';
        const chaincode = this.chaincodes.get(chaincodeId);
        chaincode.state.set(docId, document);

        return document;
    }

    async getDocument(docId, userId) {
        const chaincodeId = 'document-registry-1.0';
        const chaincode = this.chaincodes.get(chaincodeId);
        const document = chaincode.state.get(docId);
        
        if (!document) {
            return null;
        }

        // Check access permissions
        const user = this.users.get(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (document.owner !== userId && 
            !user.roles.includes('ADMIN') && 
            document.organization !== user.organization) {
            throw new Error('Unauthorized access to document');
        }

        return document;
    }

    async getAllDocuments(userId) {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const chaincodeId = 'document-registry-1.0';
        const chaincode = this.chaincodes.get(chaincodeId);
        
        const documents = [];
        for (const [docId, doc] of chaincode.state) {
            // Filter by organization or admin access
            if (doc.organization === user.organization || user.roles.includes('ADMIN')) {
                documents.push({
                    docId,
                    ...doc
                });
            }
        }

        return documents;
    }

    // Blockchain info
    getBlockchainInfo() {
        const info = {
            channels: Array.from(this.channels.keys()),
            chaincodes: Array.from(this.chaincodes.keys()),
            organizations: Array.from(this.organizations.values()).map(org => org.name),
            totalUsers: this.users.size
        };

        // Add channel-specific info
        info.channelDetails = {};
        for (const [channelName, channel] of this.channels) {
            info.channelDetails[channelName] = {
                chainLength: channel.chain.length,
                isChainValid: this.isChannelValid(channelName),
                installedChaincodes: Array.from(channel.chaincodes.keys())
            };
        }

        return info;
    }

    isChannelValid(channelName) {
        const channel = this.channels.get(channelName);
        if (!channel) return false;

        for (let i = 1; i < channel.chain.length; i++) {
            const currentBlock = channel.chain[i];
            const previousBlock = channel.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getChannelBlocks(channelName) {
        const channel = this.channels.get(channelName);
        if (!channel) return [];

        return channel.chain.map(block => ({
            index: block.index,
            timestamp: block.timestamp,
            hash: block.hash,
            previousHash: block.previousHash,
            nonce: block.nonce,
            data: block.data
        }));
    }

    // Peer and Orderer simulation
    createPeer(peerName, organization) {
        const peerId = crypto.randomBytes(16).toString('hex');
        this.peers.set(peerId, {
            name: peerName,
            organization,
            channels: [],
            chaincodes: []
        });
        return peerId;
    }

    createOrderer(ordererName) {
        const ordererId = crypto.randomBytes(16).toString('hex');
        this.orderers.set(ordererId, {
            name: ordererName,
            channels: []
        });
        return ordererId;
    }
}

module.exports = Blockchain; 