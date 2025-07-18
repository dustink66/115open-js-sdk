[中文版 README](./README.zh-CN.md)

# 115 Open Platform JS/TS SDK

A TypeScript/JavaScript SDK for 115 Open Platform, supporting Node.js, Vue, and React. Provides device code auth, QR code login, token management, user info, file management, and offline download. Based on the official 115 Open Platform documentation.

---

## Features
- Device Code Authorization
- QR Code Login
- Token Management
- User Info
- File Management
- Offline Download

---

## Installation

```bash
npm install 115open
# or
yarn add 115open
```

---

## Quick Start

```js
import { Client } from '115open';
const client = new Client('your_client_id');
// Device Code Auth
const authUrl = client.auth.getDeviceCodeUrl();
// Get user info
const user = await client.user.getInfo();
```

---

## Main API Examples

```js
// List files
const files = await client.fileManager.list();

// Offline download
await client.offline.addTask(url);
```

---

## Contributing
Pull requests and issues are welcome!

---

## License
MIT
