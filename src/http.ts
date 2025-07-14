/**
 * HTTP 工具类
 * HTTP Utility Class
 *
 * @author 尘墨成 (dustink)
 */
import axios, { AxiosRequestConfig } from 'axios';

// 115开放平台错误码映射
const errorMap: Record<number, string> = {
  40100000: '参数缺失',
  40101017: '用户验证失败',
  40110000: '请求异常需要重试',
  40140100: 'client_id 错误',
  40140101: 'code_challenge 必填',
  40140102: 'code_challenge_method 必须是 sha256、sha1、md5 之一',
  40140103: 'sign 必填',
  40140104: 'sign 签名失败',
  40140105: '生成二维码失败',
  40140106: 'APP ID 无效',
  40140107: '应用不存在',
  40140108: '应用未审核通过',
  40140109: '应用已被停用',
  40140110: '应用已过期',
  40140111: 'APP Secret 错误',
  40140112: 'code_verifier 长度要求43~128位',
  40140113: 'code_verifier 验证失败',
  40140114: 'refresh_token 格式错误（防篡改）',
  40140115: 'refresh_token 签名校验失败（防篡改）',
  40140116: 'refresh_token 无效（已解除授权），需重新授权',
  40140117: 'access_token 刷新太频繁',
  40140118: '开发者认证已过期',
  40140119: 'refresh_token 已过期，需重新授权',
  40140120: 'refresh_token 检验失败（防篡改），请检查本地 refresh_token 是否已更新',
  40140121: 'access_token 刷新失败，重试',
  40140122: '超出授权应用个数上限',
  40140123: 'access_token 格式错误（防篡改）',
  40140124: 'access_token 签名校验失败（防篡改）',
  40140125: 'access_token 无效（已过期或者已解除授权），请刷新 token',
  40140126: 'access_token 校验失败（防篡改）',
  40140127: 'response_type 错误',
  40140128: 'redirect_uri 缺少协议',
  40140129: 'redirect_uri 缺少域名',
  40140130: '没有配置重定向域名，请到应用管理中配置域名',
  40140131: 'redirect_uri 非法域名，需要与应用管理应用配置的域名一致',
  40140132: 'grant_type 错误',
  40140133: 'client_secret 验证失败',
  40140134: '授权码 code 验证失败',
  40140135: 'client_id 验证失败',
  40140136: 'redirect_uri 验证失败（防MITM）',
};

export interface HttpResult<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
}

/**
 * 通用 HTTP 请求
 * General HTTP request
 */
export async function httpRequest(
  url: string,
  method: 'GET' | 'POST',
  data: Record<string, any> = {},
  headers: Record<string, string> = {}
): Promise<HttpResult> {
  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    timeout: 15000,
  };
  if (method === 'GET') {
    config.params = data;
  } else {
    config.data = new URLSearchParams(data).toString();
    config.headers = {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }
  try {
    const resp = await axios(config);
    const json = resp.data;
    const code = json.code ?? json.errno ?? 0;
    const state = json.state;
    if ((code && code !== 200) || state === false) {
      const msg = json.message || json.error || errorMap[code] || '接口返回错误';
      return { success: false, code, message: msg, data: json.data ?? null };
    }
    return {
      success: true,
      code,
      message: json.message || 'ok',
      data: json.data ?? json,
    };
  } catch (e: any) {
    if (e.response && e.response.data) {
      const code = e.response.data.code ?? -1;
      const msg = e.response.data.message || errorMap[code] || e.message;
      return { success: false, code, message: msg, data: null };
    }
    return { success: false, code: -500, message: e.message || '网络异常', data: null };
  }
} 