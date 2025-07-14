/**
 * 115开放平台 JS/TS SDK 云下载模块
 * 115 Open Platform Offline Download Module
 *
 * @author 尘墨成 (dustink)
 */
import { httpRequest, HttpResult } from './http';

const PRO_API = 'https://proapi.115.com';

export class Offline {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * 解析BT种子
   * Parse BT torrent
   * @param params 参数：
   *   - torrent_sha1 (string, 必须) BT种子文件sha1
   *   - pick_code (string, 必须) BT种子文件提取码
   */
  async parseTorrent(params: Record<string, any>): Promise<HttpResult> {
    if (!params.torrent_sha1 || !params.pick_code) {
      return { success: false, code: -10, message: 'torrent_sha1 和 pick_code 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/offline/torrent', 'POST', params, this.getAuthHeader());
  }

  /**
   * 获取云下载任务列表
   * Get offline task list
   * @param params 参数：
   *   - page (number, 可选) 获取第几页，默认1
   */
  async getTaskList(params: Record<string, any> = {}): Promise<HttpResult> {
    return httpRequest(PRO_API + '/open/offline/get_task_list', 'GET', params, this.getAuthHeader());
  }

  /**
   * 获取云下载配额信息
   * Get offline quota info
   */
  async getQuotaInfo(): Promise<HttpResult> {
    return httpRequest(PRO_API + '/open/offline/get_quota_info', 'GET', {}, this.getAuthHeader());
  }

  /**
   * 清空云下载任务
   * Clear offline tasks
   * @param params 参数：
   *   - flag (number, 必须) 清除任务类型：1清空全部、2清空失败、3清空进行中、4清空已完成、5清空全部任务并清空对应源文件
   */
  async clearTask(params: Record<string, any>): Promise<HttpResult> {
    if (!params.flag) {
      return { success: false, code: -10, message: 'flag 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/offline/clear_task', 'POST', params, this.getAuthHeader());
  }

  /**
   * 添加云下载链接任务
   * Add offline url tasks
   * @param params 参数：
   *   - urls (string, 必须) 多个链接url,换行符分隔
   *   - wp_path_id (string, 可选) 保存目标文件夹id，默认根目录
   */
  async addTaskUrls(params: Record<string, any>): Promise<HttpResult> {
    if (!params.urls) {
      return { success: false, code: -10, message: 'urls 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/offline/add_task_urls', 'POST', params, this.getAuthHeader());
  }

  /**
   * 删除云下载任务
   * Delete offline task
   * @param params 参数：
   *   - info_hash (string, 必须) 需删除的任务hash
   *   - del_source_file (number, 可选) 是否删除源文件：1删除；0不删除
   */
  async delTask(params: Record<string, any>): Promise<HttpResult> {
    if (!params.info_hash) {
      return { success: false, code: -10, message: 'info_hash 为必填', data: null };
    }
    return httpRequest(PRO_API + '/open/offline/del_task', 'POST', params, this.getAuthHeader());
  }

  /**
   * 添加云下载BT任务
   * Add offline BT task
   * @param params 参数：
   *   - info_hash (string, 必须) BT任务hash
   *   - wanted (string, 必须) BT任务选中下载文件索引，半角逗号隔开
   *   - save_path (string, 必须) BT任务文件保存路径
   *   - torrent_sha1 (string, 必须) BT种子sha1
   *   - pick_code (string, 必须) BT种子的提取码
   *   - wp_path_id (string, 可选) 保存目标文件夹id，默认根目录
   */
  async addTaskBt(params: Record<string, any>): Promise<HttpResult> {
    const required = ['info_hash', 'wanted', 'save_path', 'torrent_sha1', 'pick_code'];
    for (const field of required) {
      if (!params[field]) {
        return { success: false, code: -10, message: `${field} 为必填`, data: null };
      }
    }
    return httpRequest(PRO_API + '/open/offline/add_task_bt', 'POST', params, this.getAuthHeader());
  }

  private getAuthHeader() {
    return {
      Authorization: 'Bearer ' + this.accessToken,
    };
  }
} 