const WebSocket = require('ws');

class WebSocketManager {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Set();
        this.setupWebSocket();
    }

    setupWebSocket() {
        this.wss.on('connection', (ws, req) => {
            console.log('🔌 New WebSocket connection established');
            this.clients.add(ws);

            // Send initial connection message
            ws.send(JSON.stringify({
                type: 'CONNECTION_ESTABLISHED',
                message: 'Connected to Fabric-inspired Blockchain',
                timestamp: Date.now()
            }));

            ws.on('message', (message) => {
                try {
                    const data = JSON.parse(message);
                    this.handleMessage(ws, data);
                } catch (error) {
                    console.error('❌ WebSocket message error:', error);
                    ws.send(JSON.stringify({
                        type: 'ERROR',
                        message: 'Invalid message format',
                        timestamp: Date.now()
                    }));
                }
            });

            ws.on('close', () => {
                console.log('🔌 WebSocket connection closed');
                this.clients.delete(ws);
            });

            ws.on('error', (error) => {
                console.error('❌ WebSocket error:', error);
                this.clients.delete(ws);
            });
        });
    }

    handleMessage(ws, data) {
        switch (data.type) {
            case 'SUBSCRIBE_CHANNEL':
                ws.channelSubscription = data.channelName;
                ws.send(JSON.stringify({
                    type: 'SUBSCRIPTION_CONFIRMED',
                    channelName: data.channelName,
                    timestamp: Date.now()
                }));
                break;

            case 'SUBSCRIBE_BLOCKS':
                ws.blockSubscription = true;
                ws.send(JSON.stringify({
                    type: 'BLOCK_SUBSCRIPTION_CONFIRMED',
                    timestamp: Date.now()
                }));
                break;

            case 'SUBSCRIBE_TRANSACTIONS':
                ws.transactionSubscription = true;
                ws.send(JSON.stringify({
                    type: 'TRANSACTION_SUBSCRIPTION_CONFIRMED',
                    timestamp: Date.now()
                }));
                break;

            default:
                ws.send(JSON.stringify({
                    type: 'ERROR',
                    message: 'Unknown message type',
                    timestamp: Date.now()
                }));
        }
    }

    broadcastToChannel(channelName, message) {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && 
                client.channelSubscription === channelName) {
                client.send(JSON.stringify(message));
            }
        });
    }

    broadcastToAll(message) {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }

    broadcastBlockUpdate(channelName, blockData) {
        const message = {
            type: 'BLOCK_ADDED',
            channelName,
            block: blockData,
            timestamp: Date.now()
        };

        this.broadcastToChannel(channelName, message);
    }

    broadcastTransactionUpdate(channelName, transactionData) {
        const message = {
            type: 'TRANSACTION_UPDATE',
            channelName,
            transaction: transactionData,
            timestamp: Date.now()
        };

        this.broadcastToChannel(channelName, message);
    }

    broadcastSystemMessage(message) {
        const systemMessage = {
            type: 'SYSTEM_MESSAGE',
            message,
            timestamp: Date.now()
        };

        this.broadcastToAll(systemMessage);
    }

    getConnectedClients() {
        return this.clients.size;
    }

    getChannelSubscribers(channelName) {
        let count = 0;
        this.clients.forEach(client => {
            if (client.channelSubscription === channelName) {
                count++;
            }
        });
        return count;
    }
}

module.exports = WebSocketManager; 