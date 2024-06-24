# Contents

- backend in Nest.js
  - server-sent events endpoint
  - websockets endpoint
- frontend in React
  - server-sent events implementation
  - websockets implementation

# Setup

1. `pnpm i`
2. `pnpm dev`
3. Go to [localhost:3001](http://localhost:3001/)

# Server-Sent Events (SSE)

- only one way communication (server to client)
- simple to implement and use compared to WebSockets. It’s built on standard HTTP protocols and doesn’t require special handling for connections.

## Example use cases

App needs to receive real-time data, but doesn't send frequent updates to server

- real-time notifications
- news feed
- monitoring dashboards (IoT, sensors, device load, etc.)
- read-only chat

## Resources

- MDN docs: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- Nest.js SSE docs: https://docs.nestjs.com/techniques/server-sent-events
- Nest.js example: https://github.com/nestjs/nest/blob/master/sample/28-sse/src/app.controller.ts

# WebSocket

- bi-directional communication between client and server
- suitable for interactive apps
- low latency
- more complex setup

## Example use cases

App needs to receive and send data in real-time

- collaborative tools (Figma, document editing)
- games
- trading
- chat

## Resources

- MDN docs: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
