# Deployment Guide - Fabric-Inspired Blockchain

This guide will help you deploy and run the Fabric-inspired private blockchain multi-domain application.

## 🏗️ Overview

This project implements a **Hyperledger Fabric-inspired blockchain** with:
- **Channels** for data isolation
- **Chaincodes** for smart contract functionality
- **Organizations** with role-based access control
- **Real-time WebSocket updates**
- **Multi-domain document registry**

## Prerequisites

1. Node.js v18+ installed
2. npm or yarn package manager

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Start the Backend

```bash
cd backend
npm start
```

The server will start on http://localhost:4000 with:
- REST API endpoints
- WebSocket server for real-time updates
- Fabric-inspired blockchain with channels and chaincodes

## Step 3: Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on http://localhost:3000

## 🏗️ Fabric-Inspired Architecture

### Organizations
- **Org1** (Healthcare domain)
- **Org2** (Agriculture domain)  
- **Org3** (Finance domain)
- **OrgAdmin** (Administrative domain)

### Channels
- **mychannel** - Main channel for document registry

### Chaincodes
- **document-registry-1.0** - Document management chaincode

### Default Users
- `admin/admin123` (ADMIN role)
- `healthcare_user/health123` (HEALTHCARE role)
- `agriculture_user/agri123` (AGRICULTURE role)
- `finance_user/finance123` (FINANCE role)

## 🔧 API Endpoints

### Authentication
All endpoints require authentication via headers:
```
username: your_username
password: your_password
```

### Core Endpoints
- `GET /api/health` - Health check with blockchain info
- `POST /api/documents/register` - Register a new document
- `GET /api/documents` - Get all documents for user's organization
- `GET /api/documents/:docId` - Get specific document

### Blockchain Management
- `GET /api/blockchain/info` - Get blockchain information
- `GET /api/blockchain/channels` - List all channels
- `GET /api/blockchain/channels/:channelName` - Get channel info
- `GET /api/blockchain/channels/:channelName/blocks` - Get channel blocks
- `GET /api/blockchain/organizations` - List organizations

### User Management
- `POST /api/users` - Create new user (admin only)

### WebSocket
- `GET /api/websocket/status` - WebSocket connection status

## 🔌 WebSocket Events

Connect to `ws://localhost:4000` for real-time updates:

### Subscribe to Channel
```json
{
  "type": "SUBSCRIBE_CHANNEL",
  "channelName": "mychannel"
}
```

### Subscribe to Blocks
```json
{
  "type": "SUBSCRIBE_BLOCKS"
}
```

### Subscribe to Transactions
```json
{
  "type": "SUBSCRIBE_TRANSACTIONS"
}
```

## 📝 Testing the Application

1. Open http://localhost:3000 in your browser
2. Select a user from the authentication dropdown
3. Fill in the document registration form:
   - Document ID: Any unique identifier
   - Document Hash: A hash of your document
   - Domain: Select healthcare, agriculture, or finance
4. Click "Register Document"
5. Watch real-time updates in the WebSocket panel

## 🔒 Security Features

- **Role-based access control** for different domains
- **Organization-based data isolation**
- **Channel-based data privacy**
- **Authentication required for all operations**
- **Domain-specific permissions**

## 🏗️ Fabric Concepts Implemented

### Channels
- Private communication channels between organizations
- Isolated data and transactions
- Configurable channel policies

### Chaincodes
- Smart contracts for business logic
- State management within channels
- Function-based invocation

### Organizations
- MSP (Membership Service Provider) simulation
- Role-based access control
- Organization-specific data access

### Consensus
- Simplified proof-of-work for demo purposes
- Block validation and chain integrity
- Transaction ordering

## 🚀 Advanced Features

### Real-time Updates
- WebSocket connections for live blockchain updates
- Channel-specific subscriptions
- Transaction and block notifications

### Multi-domain Support
- Healthcare document registry
- Agriculture document registry
- Finance document registry
- Cross-domain access control

### Blockchain Explorer
- View all blocks in channels
- Transaction history
- Organization information
- Real-time statistics

## 🔧 Troubleshooting

### Common Issues:

1. **"User not found" error**: Check username/password in authentication
2. **"Unauthorized domain access"**: User doesn't have permission for selected domain
3. **"Document already exists"**: Document ID must be unique
4. **WebSocket connection failed**: Ensure backend is running on port 4000
5. **"Channel not found"**: Default channel 'mychannel' should be created automatically

### Valid Domain Permissions:
- Healthcare users can only register healthcare documents
- Agriculture users can only register agriculture documents
- Finance users can only register finance documents
- Admin users can register documents in any domain

## 🏗️ Architecture Benefits

### Compared to Traditional Blockchains:
- **Better privacy** through channels
- **Scalability** through organization isolation
- **Flexible consensus** mechanisms
- **Enterprise-ready** architecture
- **Permissioned access** control

### Key Features:
- **Multi-organization support**
- **Channel-based data isolation**
- **Chaincode-based smart contracts**
- **Real-time event streaming**
- **Role-based access control**
- **Organization-specific data access**

## 📊 Monitoring

### Health Check
Visit http://localhost:4000/api/health for:
- Blockchain status
- Channel information
- Organization details
- WebSocket connection status

### Real-time Monitoring
- WebSocket panel shows live updates
- Block additions
- Transaction processing
- System messages

## 🔄 Development

### Adding New Chaincodes
1. Create chaincode functions in `Blockchain.js`
2. Register functions with `registerChaincodeFunction()`
3. Install on channels with `installChaincode()`

### Adding New Organizations
1. Use `createOrganization()` method
2. Add users with appropriate roles
3. Update channel configurations

### Adding New Channels
1. Use `createChannel()` method
2. Specify participating organizations
3. Install required chaincodes

This Fabric-inspired implementation provides a solid foundation for enterprise blockchain applications with privacy, scalability, and flexibility. 