import { describe, it, expect } from '@jest/globals';
import { Client } from '../src/index';

describe('Client', () => {
  const clientId = 'your_client_id';
  const accessToken = 'your_access_token';
  const client = new Client(clientId, accessToken);

  it('should instantiate all modules', () => {
    expect(client.auth).toBeDefined();
    expect(client.user).toBeDefined();
    expect(client.file).toBeDefined();
    expect(client.video).toBeDefined();
    expect(client.offline).toBeDefined();
  });

  it('should get user info (mock)', async () => {
    // 这里只做结构测试，实际需替换 accessToken
    if (client.user) {
      const res = await client.user.getUserInfo();
      expect(res).toHaveProperty('success');
      expect(res).toHaveProperty('code');
      expect(res).toHaveProperty('message');
      expect(res).toHaveProperty('data');
    }
  });

  // 可继续添加其它模块的接口测试
}); 