[English README](./README.md)

# 115开放平台 JS/TS SDK

115开放平台 JS/TS SDK，支持 Node.js、Vue、React。支持设备码授权、二维码登录、Token 管理、用户信息、文件管理、离线下载等功能。基于官方开发文档实现。

---

## 特性
- 设备码授权
- 二维码登录
- Token 获取与刷新
- 用户信息获取
- 文件管理
- 离线下载

---

## 安装

```bash
npm install 115open
# 或
yarn add 115open
```

---

## 快速上手

```js
import { Client } from '115open';
const client = new Client('your_client_id');
// 设备码授权
const authUrl = client.auth.getDeviceCodeUrl();
// 获取用户信息
const user = await client.user.getInfo();
```

---

## 主要API示例

```js
// 文件列表
const files = await client.fileManager.list();

// 离线下载
await client.offline.addTask(url);
```

---

## 贡献
欢迎提交 issue 和 PR！

---

## 许可证
MIT 