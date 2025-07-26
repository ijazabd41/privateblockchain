const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Blockchain = require('./blockchain/Blockchain');
const WebSocketManager = require('./blockchain/WebSocketManager');

const app = express();

// Load TLS certificate and private key
const privateKey = fs.readFileSync('./key.pem', 'utf8');
const certificate = fs.readFileSync('./cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTPS server
const server = https.createServer(credentials, app);

// Initialize blockchain and WebSocket manager
const blockchain = new Blockchain();
const wsManager = new WebSocketManager(server);

// WebSocket Events
blockchain.on('blockAdded', (data) => {
    wsManager.broadcastBlockUpdate(data.channelName, data.block);
    wsManager.broadcastTransactionUpdate(data.channelName, data.block.transaction);
});

// Authentication middleware
const authenticateUser = (req, res, next) => {
    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required. Provide username and password in headers.'
        });
    }

    const authResult = blockchain.authenticateUser(username, password);
    if (!authResult) {
        return res.status(401).json({
            success: false,
            error: 'Invalid credentials'
        });
    }

    req.user = authResult;
    next();
};

// --- API Endpoints ---

app.get('/api/health', (req, res) => {
    try {
        const info = blockchain.getBlockchainInfo();
        res.json({
            success: true,
            blockchain: info,
            websocket: {
                connectedClients: wsManager.getConnectedClients()
            },
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/documents/register', authenticateUser, async (req, res) => {
    const { docId, hash, domain } = req.body;
    const { userId } = req.user;

    if (!docId || !hash || !domain) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: docId, hash, domain'
        });
    }

    try {
        console.log(`📝 Registering document: ${docId} for domain: ${domain} by user: ${userId}`);

        const result = await blockchain.invokeChaincode(
            'mychannel',
            'document-registry-1.0',
            'registerDocument',
            [docId, hash, domain],
            userId
        );

        console.log(`✅ Document registered successfully. TX ID: ${result.txId}`);

        res.json({
            success: true,
            txId: result.txId,
            blockNumber: result.blockNumber,
            result: result.result
        });
    } catch (error) {
        console.error('❌ Registration Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/documents/:docId', authenticateUser, async (req, res) => {
    const { docId } = req.params;
    const { userId } = req.user;

    try {
        const document = await blockchain.invokeChaincode(
            'mychannel',
            'document-registry-1.0',
            'getDocument',
            [docId],
            userId
        );

        res.json({
            success: true,
            document: document.result
        });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
});

app.get('/api/documents', authenticateUser, async (req, res) => {
    const { userId } = req.user;

    try {
        const result = await blockchain.invokeChaincode(
            'mychannel',
            'document-registry-1.0',
            'getAllDocuments',
            [],
            userId
        );

        res.json({
            success: true,
            documents: result.result
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/users', authenticateUser, async (req, res) => {
    const { username, password, organization, roles } = req.body;
    const { userId } = req.user;

    const user = blockchain.users.get(userId);
    if (!user.roles.includes('ADMIN')) {
        return res.status(403).json({
            success: false,
            error: 'Only administrators can create users'
        });
    }

    if (!username || !password || !organization) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: username, password, organization'
        });
    }

    try {
        const newUserId = blockchain.createUser(username, password, organization, roles || []);

        res.json({
            success: true,
            userId: newUserId,
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/blockchain/info', (req, res) => {
    try {
        const info = blockchain.getBlockchainInfo();
        res.json({ success: true, info });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/blockchain/channels/:channelName/blocks', (req, res) => {
    const { channelName } = req.params;

    try {
        const blocks = blockchain.getChannelBlocks(channelName);
        res.json({ success: true, channelName, blocks });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
});

app.get('/api/blockchain/channels/:channelName', (req, res) => {
    const { channelName } = req.params;

    try {
        const channel = blockchain.channels.get(channelName);
        if (!channel) {
            return res.status(404).json({
                success: false,
                error: 'Channel not found'
            });
        }

        res.json({
            success: true,
            channel: {
                name: channel.name,
                organizations: channel.organizations,
                chainLength: channel.chain.length,
                isChainValid: blockchain.isChannelValid(channelName),
                installedChaincodes: Array.from(channel.chaincodes.keys())
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/blockchain/channels', (req, res) => {
    try {
        const channels = Array.from(blockchain.channels.keys());
        res.json({ success: true, channels });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/blockchain/organizations', (req, res) => {
    try {
        const organizations = Array.from(blockchain.organizations.values()).map(org => ({
            name: org.name,
            domain: org.domain,
            mspId: org.mspId,
            userCount: org.users.length
        }));

        res.json({ success: true, organizations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/websocket/status', (req, res) => {
    res.json({
        success: true,
        connectedClients: wsManager.getConnectedClients(),
        channelSubscribers: {
            mychannel: wsManager.getChannelSubscribers('mychannel')
        }
    });
});

// Start the HTTPS server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`✅ HTTPS server running at https://localhost:${PORT}`);
    console.log(`🔌 WebSocket server running on wss://localhost:${PORT}`);
    console.log(`📋 Health check: https://localhost:${PORT}/api/health`);

    const info = blockchain.getBlockchainInfo();
    console.log('\n🏗️  Fabric-inspired Network Initialized:');
    console.log(`   Channels: ${info.channels.join(', ')}`);
    console.log(`   Organizations: ${info.organizations.join(', ')}`);
    console.log(`   Chaincodes: ${info.chaincodes.join(', ')}`);
    console.log(`   Total Users: ${info.totalUsers}`);
    console.log('\n👥 Default Users:');
    console.log('   admin/admin123 (ADMIN)');
    console.log('   healthcare_user/health123 (HEALTHCARE)');
    console.log('   agriculture_user/agri123 (AGRICULTURE)');
    console.log('   finance_user/finance123 (FINANCE)');
});
