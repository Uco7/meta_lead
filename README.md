# Meta Lead Ads + React Native PoC

A proof of concept demonstrating how leads submitted through Meta's Lead Ads testing workflow can appear in a React Native application in real time, without manually refreshing the screen.

## Overview

This project connects Meta Lead Ads to a React Native application through a backend service. When a test lead is submitted, the backend receives the webhook notification, retrieves the lead details from Meta's Graph API, stores the lead in MongoDB, and emits a Socket.IO event to update the open app.

## Features

- Meta Lead Ads webhook integration
- Lead retrieval through the Meta Graph API
- MongoDB lead storage
- Real-time updates using Socket.IO
- React Native application built with Expo
- Automatic lead list updates without manual refresh
- Duplicate lead prevention using the Meta lead ID

## Technology Stack

**Frontend**
- React Native
- Expo
- Expo Router
- Socket.IO Client

**Backend**
- Node.js
- Express.js
- Socket.IO
- MongoDB
- Meta Graph API

## Architecture

1. **Meta Lead Testing Tool:** Simulates a lead submission.
2. **Meta Webhook:** Sends a notification to the backend when a lead is created.
3. **Express Backend:** Receives the webhook and retrieves the full lead details through the Meta Graph API.
4. **MongoDB:** Stores the retrieved lead.
5. **Socket.IO:** Emits the new lead to connected clients.
6. **React Native App:** Receives the event and updates the leads list automatically.

## Prerequisites

Before running the project, install or configure:

- Node.js and npm
- Expo Go or a compatible React Native development environment
- MongoDB or a MongoDB connection URI
- A Meta developer account and Facebook Page with access to lead data
- A Meta app configured for lead retrieval and webhook subscriptions
- A publicly reachable HTTPS webhook endpoint for Meta, such as a development tunnel during local testing

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Replace the placeholders with your repository URL and project directory.

### 2. Install frontend dependencies

From the project root or the directory containing `package.json`:

```bash
npm install
```

If the frontend has its own `package.json`, run the command from the frontend directory instead.

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file in the backend directory using the variables expected by your backend configuration.

Example:

```dotenv
PORT=5000
MONGODB_URI=your_mongodb_connection_string
META_ACCESS_TOKEN=your_meta_access_token
```

Add any additional variables required by your webhook verification or database setup.

**Security:** Never commit your real `.env` file, access tokens, or application secrets. Use `.env.example` with placeholder values to document the required configuration.

### 5. Start the backend

From the backend directory, use the start script defined in its `package.json`. For example:

```bash
npm run dev
```

If your project uses a different script, replace this command with the appropriate one.

### 6. Configure the React Native connection

Ensure the Socket.IO client connects to the backend's reachable address.

For local physical-device testing, use your computer's LAN IP address rather than `localhost`, provided both devices are on the same network.

For remote testing, configure a suitable reachable backend URL.

### 7. Start the Expo application

From the frontend project directory:

```bash
npx expo start
```

Open the application on a simulator or compatible device and navigate to the leads list.

## Meta Webhook Configuration

1. Configure the Meta app's webhook subscription for lead-generation events.
2. Set the callback URL to your publicly reachable HTTPS webhook endpoint.
3. Configure the webhook verification token required by the backend.
4. Subscribe the relevant Facebook Page to the lead-generation webhook field.
5. Ensure the access token has the required permissions to retrieve leads for the selected Page.
6. Use Meta's Lead Testing Tool to generate a test lead.

The exact configuration depends on the Meta app and Page permissions.

## Testing the Real-Time Flow

1. Start the backend and React Native application.
2. Leave the leads list screen open.
3. Open Meta's Lead Testing Tool.
4. Submit a test lead for the configured Page and form.
5. Observe the backend logs as the webhook is received and the lead is retrieved and saved.
6. Confirm that the new lead appears in the open React Native application without manually refreshing the screen.

Use test data only for the proof of concept.

## Assumptions

- Meta's Lead Testing Tool is used instead of running real advertisements.
- The Facebook Page and lead form are configured and accessible to the developer.
- The backend has the necessary Meta permissions and a valid access token.
- MongoDB is available for storing leads.
- The React Native app remains open with an active Socket.IO connection during the demonstration.
- A publicly reachable HTTPS endpoint is available for Meta webhook delivery during local development.
- Environment-specific configuration is supplied separately and is not committed to the repository.

## Security Considerations

- Keep access tokens and credentials out of source control.
- Store sensitive configuration in environment variables.
- Do not commit real lead data or personal information.
- Use appropriate access controls when deploying the backend.
- Review token expiration and permissions before running the demonstration.

## Known Limitations

This is a proof of concept intended to demonstrate the real-time lead-delivery flow. Production deployment may require additional work for token renewal, webhook retries, authentication, monitoring, and error handling.

## Author

Developed as a technical proof of concept for Meta Lead Ads integration with React Native.
