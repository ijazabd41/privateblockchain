# 🏗️ Fabric-Inspired Private Blockchain Multi-Domain Application

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **Hyperledger Fabric-inspired** private blockchain application for document registry across multiple domains, built with modern web technologies.

## 🚀 Live Demo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **WebSocket**: ws://localhost:4000

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

```
private-blockchain-multidomain/
├── backend/
│   ├── blockchain/
│   │   ├── Block.js              # Block structure and mining
│   │   ├── Blockchain.js         # Main blockchain with channels and chaincodes
│   │   └── WebSocketManager.js   # Real-time updates
│   ├── app.js                    # Express.js server
│   └── package.json
├── frontend/
│   ├── pages/
│   │   ├── index.js              # Main application page
│   │   └── _app.js               # Next.js app wrapper
│   ├── styles/
│   │   └── globals.css           # Tailwind CSS styles
│   └── package.json
├── docs/                         # Documentation
├── DEPLOYMENT_GUIDE.md           # Complete setup guide
└── README.md                     # This file
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/private-blockchain-multidomain.git
cd private-blockchain-multidomain
```

### 2. Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 3. Start the Backend

```bash
cd backend && npm start
```

The Fabric-inspired blockchain server will start on http://localhost:4000

### 4. Start the Frontend

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Install dependencies
npm install

# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Hyperledger Fabric architecture
- Built with Express.js and Next.js
- Styled with Tailwind CSS
- Real-time updates with WebSocket

## 📞 Support

If you have any questions or need help:

1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Open an [Issue](../../issues) on GitHub
3. Review the [API documentation](#api-endpoints)

## 🔄 Roadmap

- [ ] Add more chaincode functions
- [ ] Implement actual Fabric integration
- [ ] Add Docker containerization
- [ ] Implement advanced consensus mechanisms
- [ ] Add more security features
- [ ] Create mobile application

---

**Note**: This is a Fabric-inspired implementation for educational and development purposes. For production enterprise use, consider using the actual Hyperledger Fabric framework. 