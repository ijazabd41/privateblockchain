# Fabric-Inspired Private Blockchain Multi-Domain Application

This is a **Hyperledger Fabric-inspired** private blockchain application for document registry across multiple domains, built with modern web technologies.

## 🏗️ Features

- **Fabric-inspired architecture** with channels, chaincodes, and organizations
- **Multi-domain document registry** (Healthcare, Agriculture, Finance)
- **Role-based access control** with organization-specific permissions
- **Real-time WebSocket updates** for live blockchain events
- **Channel-based data isolation** for privacy and security
- **Beautiful, responsive UI** with modern design and real-time monitoring

## 🏗️ Architecture

### Core Components
- **Channels**: Private communication channels between organizations
- **Chaincodes**: Smart contracts for business logic
- **Organizations**: MSP-based identity management
- **WebSocket**: Real-time event streaming
- **REST API**: Traditional HTTP endpoints

### Organizations
- **Org1** (Healthcare domain)
- **Org2** (Agriculture domain)
- **Org3** (Finance domain)
- **OrgAdmin** (Administrative domain)

## 📁 Project Structure

- `backend/` - Express.js server with Fabric-inspired blockchain
  - `blockchain/` - Core blockchain implementation
    - `Block.js` - Block structure and mining
    - `Blockchain.js` - Main blockchain with channels and chaincodes
    - `WebSocketManager.js` - Real-time updates
- `frontend/` - Next.js frontend with modern UI
- `docs/` - Documentation
- `DEPLOYMENT_GUIDE.md` - Complete setup and deployment guide

## ⚡ Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 2. Start the Backend

```bash
cd backend && npm start
```

The Fabric-inspired blockchain server will start on http://localhost:4000

### 3. Start the Frontend

```bash
cd frontend && npm run dev
```

The frontend will start on http://localhost:3000

## 🔐 Default Users

- `admin/admin123` (ADMIN role - can access all domains)
- `healthcare_user/health123` (HEALTHCARE role)
- `agriculture_user/agri123` (AGRICULTURE role)
- `finance_user/finance123` (FINANCE role)

## 🏗️ Fabric Concepts Implemented

### Channels
- **mychannel**: Main channel for document registry
- Private data isolation between organizations
- Configurable channel policies

### Chaincodes
- **document-registry-1.0**: Document management chaincode
- Smart contract functions for business logic
- State management within channels

### Organizations & MSP
- Membership Service Provider simulation
- Organization-specific data access
- Role-based permissions

### Consensus
- Simplified proof-of-work for demonstration
- Block validation and chain integrity
- Transaction ordering

## 📋 API Endpoints

### Authentication Required
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

### WebSocket
- `ws://localhost:4000` - Real-time blockchain updates
- Subscribe to channels, blocks, and transactions

## 🔌 Real-time Features

### WebSocket Events
- **Block additions** with transaction details
- **Channel-specific updates**
- **System notifications**
- **Connection status**

### Live Monitoring
- Real-time blockchain statistics
- Transaction processing updates
- Organization activity
- Channel health status

## 🔒 Security Features

- **Role-based access control** for different domains
- **Organization-based data isolation**
- **Channel-based data privacy**
- **Authentication required for all operations**
- **Domain-specific permissions**

## 🏗️ Benefits Over Traditional Blockchains

### Privacy & Security
- **Channel isolation** prevents cross-organization data leakage
- **Organization-specific access** controls
- **Permissioned network** architecture

### Scalability
- **Multi-channel support** for different use cases
- **Organization isolation** reduces network overhead
- **Modular chaincode** architecture

### Enterprise Ready
- **MSP-based identity management**
- **Flexible consensus mechanisms**
- **Configurable policies**
- **Real-time monitoring**

## 🚀 Advanced Features

### Multi-domain Support
- **Healthcare document registry** with medical data privacy
- **Agriculture document registry** for supply chain tracking
- **Finance document registry** for financial transactions
- **Cross-domain access control** for administrators

### Blockchain Explorer
- **Real-time block viewing**
- **Transaction history**
- **Organization information**
- **Channel statistics**

### Development Tools
- **Easy chaincode deployment**
- **Organization management**
- **Channel configuration**
- **User role assignment**

## 📊 Monitoring & Analytics

### Health Dashboard
- Blockchain status and health
- Channel information
- Organization details
- WebSocket connection status

### Real-time Metrics
- Connected clients
- Channel subscribers
- Transaction throughput
- Block generation rate

## 🔧 Development

For detailed setup instructions and development guidelines, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Adding New Features
- **New chaincodes**: Extend business logic
- **New organizations**: Add domain-specific entities
- **New channels**: Create isolated networks
- **New roles**: Implement custom permissions

## 🔒 Security Best Practices

- **Role-based access control** for all operations
- **Organization-based data isolation**
- **Channel-based privacy**
- **Authentication for all endpoints**
- **Input validation and sanitization**

## 🏗️ Architecture Comparison

### vs Traditional Blockchains
- **Better privacy** through channels
- **Improved scalability** through organization isolation
- **Enterprise-ready** architecture
- **Flexible consensus** mechanisms
- **Permissioned access** control

### vs Ethereum
- **No gas fees** for transactions
- **Better privacy** through channels
- **Organization-based** access control
- **Simplified deployment** process
- **Real-time updates** via WebSocket

This Fabric-inspired implementation provides a solid foundation for enterprise blockchain applications with privacy, scalability, and flexibility while maintaining the core benefits of blockchain technology. 