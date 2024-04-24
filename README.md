# WebRTC Signaling Server with Bun and Elysia

This repository contains the implementation of a WebRTC signaling server using the Elysia framework on Bun, a modern JavaScript runtime. The server handles key signaling operations necessary for setting up WebRTC connections.

## Features

- **WebSocket Connection**: Supports real-time communication through WebSockets.
- **Dynamic Room Subscription**: Clients can join or leave signaling rooms.
- **WebRTC Signaling**: Manages the exchange of offers, answers, and ICE candidates to establish peer-to-peer connections.

## Getting Started

### Prerequisites

- Bun: The server is designed to run on the Bun runtime, which needs to be installed on your system. Install Bun from [Bun's official website](https://bun.sh).

### Installation

1. Clone the repository:
   ```bash
   git clone webrtc.signaling-server
   cd webrtc.signaling-server
   ```

2. Install dependencies using Bun:
   ```bash
   bun install
   ```

### Running the Server

Launch the server with Bun:
```bash
bun server.js
```

You should see the server running on port 8080 with the output:
```
🐲: Server is running at http://localhost:8080
```

## Usage

Connect to the server via WebSocket at the endpoint `/ws`. Clients can send JSON formatted messages with the following structure:

```json
{
  "type": "join", // or "candidate", "offer", "answer", "unsubscribe"
  "room": "RoomID",
  "payload": {
    "candidate": {},
    "offer": {},
    "answer": {}
  }
}
```

### Supported Operations

- **JOIN**: Subscribe to a room to start receiving messages.
- **UNSUBSCRIBE**: Leave the room.
- **CANDIDATE**: Send ICE candidate data.
- **OFFER**: Send a session description protocol (SDP) offer.
- **ANSWER**: Send an SDP answer.
