/**
 * 115开放平台 JS/TS SDK 用户模块
 * 115 Open Platform User Module
 *
 * @author 尘墨成 (dustink)
 */
import { httpRequest, HttpResult } from './http';

const PRO_API = 'https://proapi.115.com';

export class User {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * 获取用户信息
   * Get user info
   * @param params 参数：无（只需 access_token）
   */
  async getUserInfo(params: Record<string, any> = {}): Promise<HttpResult> {
    if (!this.accessToken) {
      return { success: false, code: -10, message: 'access_token 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/user/info', 'GET', params, {
      Authorization: 'Bearer ' + this.accessToken,
    });
  }
} 