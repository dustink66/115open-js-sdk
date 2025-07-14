/**
 * 115开放平台 JS/TS SDK 视频播放模块
 * 115 Open Platform Video Module
 *
 * @author 尘墨成 (dustink)
 */
import { httpRequest, HttpResult } from './http';

const PRO_API = 'https://proapi.115.com';

export class Video {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * 记忆视频播放进度
   * Save video play history
   * @param params 参数：
   *   - pick_code (string, 必须) 文件提取码
   *   - time (number, 可选) 视频播放进度时长(秒)
   *   - watch_end (number, 可选) 是否播放完毕，0未完毕，1完毕
   */
  async saveHistory(params: Record<string, any>): Promise<HttpResult> {
    if (!params.pick_code) {
      return { success: false, code: -10, message: 'pick_code 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/video/history', 'POST', params, this.getAuthHeader());
  }

  /**
   * 获取视频播放进度
   * Get video play history
   * @param params 参数：
   *   - pick_code (string, 必须) 文件提取码
   */
  async getHistory(params: Record<string, any>): Promise<HttpResult> {
    if (!params.pick_code) {
      return { success: false, code: -10, message: 'pick_code 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/video/history', 'GET', params, this.getAuthHeader());
  }

  /**
   * 获取视频字幕列表
   * Get video subtitle list
   * @param params 参数：
   *   - pick_code (string, 必须) 视频文件提取码
   */
  async getSubtitle(params: Record<string, any>): Promise<HttpResult> {
    if (!params.pick_code) {
      return { success: false, code: -10, message: 'pick_code 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/video/subtitle', 'GET', params, this.getAuthHeader());
  }

  /**
   * 获取视频在线播放地址
   * Get video play url
   * @param params 参数：
   *   - pick_code (string, 必须) 视频文件提取码
   */
  async getPlayUrl(params: Record<string, any>): Promise<HttpResult> {
    if (!params.pick_code) {
      return { success: false, code: -10, message: 'pick_code 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/video/play', 'GET', params, this.getAuthHeader());
  }

  /**
   * 提交视频转码
   * Push video transcode
   * @param params 参数：
   *   - pick_code (string, 必须) 文件提取码
   *   - op (string, 必须) 提交方式：vip_push、pay_push
   */
  async pushTranscode(params: Record<string, any>): Promise<HttpResult> {
    if (!params.pick_code || !params.op) {
      return { success: false, code: -10, message: 'pick_code 和 op 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/video/video_push', 'POST', params, this.getAuthHeader());
  }

  private getAuthHeader() {
    return {
      Authorization: 'Bearer ' + this.accessToken,
    };
  }
} 