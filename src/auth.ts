/**
 * 115开放平台 JS/TS SDK 授权模块
 * 115 Open Platform Auth Module
 *
 * @author 尘墨成 (dustink)
 */
import { httpRequest, HttpResult } from './http';

const PASSPORT_API = 'https://passportapi.115.com';
const QRCODE_API = 'https://qrcodeapi.115.com';

export class Auth {
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * 获取设备码和二维码内容
   * Get device code and QR content
   * @param params 参数：
   *   - code_challenge (string, 必须) PKCE code_challenge
   *   - code_challenge_method (string, 必须) PKCE code_challenge_method，推荐 sha256
   */
  async getDeviceCode(params: { code_challenge: string; code_challenge_method: string }): Promise<HttpResult> {
    if (!params.code_challenge || !params.code_challenge_method) {
      return { success: false, code: -10, message: 'code_challenge 和 code_challenge_method 为必填', data: null };
    }
    return httpRequest(PASSPORT_API + '/open/authDeviceCode', 'POST', {
      client_id: this.clientId,
      code_challenge: params.code_challenge,
      code_challenge_method: params.code_challenge_method,
    });
  }

  /**
   * 轮询二维码状态
   * Poll QR code status
   * @param params 参数：
   *   - uid (string, 必须) 设备码
   *   - time (number, 必须) 校验时间戳
   *   - sign (string, 必须) 校验签名
   */
  async pollDeviceStatus(params: { uid: string; time: number; sign: string }): Promise<HttpResult> {
    if (!params.uid || !params.time || !params.sign) {
      return { success: false, code: -10, message: 'uid、time、sign 为必填', data: null };
    }
    return httpRequest(QRCODE_API + '/get/status/', 'GET', params);
  }

  /**
   * 用设备码换取 access_token
   * Exchange device code for access_token
   * @param params 参数：
   *   - uid (string, 必须) 设备码
   *   - code_verifier (string, 必须) PKCE code_verifier
   */
  async getAccessTokenByDeviceCode(params: { uid: string; code_verifier: string }): Promise<HttpResult> {
    if (!params.uid || !params.code_verifier) {
      return { success: false, code: -10, message: 'uid 和 code_verifier 为必填', data: null };
    }
    return httpRequest(PASSPORT_API + '/open/deviceCodeToToken', 'POST', params);
  }

  /**
   * 获取授权码模式授权URL
   * Get authorize URL for authorization code flow
   * @param params 参数：
   *   - redirect_uri (string, 必须) 回调地址
   *   - state (string, 可选) 防CSRF随机串
   */
  getAuthorizeUrl(params: { redirect_uri: string; state?: string }): string {
    if (!params.redirect_uri) return '';
    const query: any = {
      client_id: this.clientId,
      redirect_uri: params.redirect_uri,
      response_type: 'code',
    };
    if (params.state) query.state = params.state;
    return PASSPORT_API + '/open/authorize?' + new URLSearchParams(query).toString();
  }

  /**
   * 用授权码换取 access_token
   * Exchange auth code for access_token
   * @param params 参数：
   *   - client_secret (string, 必须) APP Secret
   *   - code (string, 必须) 授权码
   *   - redirect_uri (string, 必须) 回调地址
   */
  async getAccessTokenByAuthCode(params: { client_secret: string; code: string; redirect_uri: string }): Promise<HttpResult> {
    if (!params.client_secret || !params.code || !params.redirect_uri) {
      return { success: false, code: -10, message: 'client_secret、code、redirect_uri 为必填', data: null };
    }
    return httpRequest(PASSPORT_API + '/open/authCodeToToken', 'POST', {
      client_id: this.clientId,
      client_secret: params.client_secret,
      code: params.code,
      redirect_uri: params.redirect_uri,
      grant_type: 'authorization_code',
    });
  }

  /**
   * 刷新 access_token
   * Refresh access_token
   * @param params 参数：
   *   - refresh_token (string, 必须) 刷新令牌
   */
  async refreshToken(params: { refresh_token: string }): Promise<HttpResult> {
    if (!params.refresh_token) {
      return { success: false, code: -10, message: 'refresh_token 为必填', data: null };
    }
    return httpRequest(PASSPORT_API + '/open/refreshToken', 'POST', params);
  }
} 