/**
 * 115开放平台 JS/TS SDK 文件管理模块
 * 115 Open Platform File Management Module
 *
 * @author 尘墨成 (dustink)
 */
import { httpRequest, HttpResult } from './http';

const PRO_API = 'https://proapi.115.com';

export class FileManager {
  private accessToken: string;
  private baseUrl: string;

  constructor(accessToken: string, baseUrl: string = PRO_API) {
    this.accessToken = accessToken;
    this.baseUrl = baseUrl;
  }

  /**
   * 获取上传凭证
   * Get upload token
   */
  async getUploadToken(): Promise<HttpResult> {
    return httpRequest(this.baseUrl + '/open/upload/get_token', 'GET', {}, this.getAuthHeader());
  }

  /**
   * 初始化上传
   * Init upload
   * @param params 参数：
   *   - file_name (string, 必须) 文件名
   *   - file_size (number, 必须) 文件大小(字节)
   *   - target (string, 必须) 文件上传目标约定
   *   - fileid (string, 必须) 文件sha1值
   *   - preid (string, 可选) 文件前128Ksha1
   *   - pick_code (string, 可选) 上传任务key
   *   - topupload (number, 可选) 上传调度文件类型调度标记
   *   - sign_key (string, 可选) 二次认证需要
   *   - sign_val (string, 可选) 二次认证需要(大写)
   */
  async initUpload(params: Record<string, any>): Promise<HttpResult> {
    const required = ['file_name', 'file_size', 'target', 'fileid'];
    for (const field of required) {
      if (!params[field]) {
        return { success: false, code: -10, message: `${field} 为必填`, data: null };
      }
    }
    return httpRequest(this.baseUrl + '/open/upload/init', 'POST', params, this.getAuthHeader());
  }

  /**
   * 断点续传
   * Resume upload
   * @param params 参数：
   *   - file_size (number, 必须) 文件大小(字节)
   *   - target (string, 必须) 文件上传目标约定
   *   - fileid (string, 必须) 文件sha1值
   *   - pick_code (string, 必须) 上传任务key
   */
  async resumeUpload(params: Record<string, any>): Promise<HttpResult> {
    const required = ['file_size', 'target', 'fileid', 'pick_code'];
    for (const field of required) {
      if (!params[field]) {
        return { success: false, code: -10, message: `${field} 为必填`, data: null };
      }
    }
    return httpRequest(this.baseUrl + '/open/upload/resume', 'POST', params, this.getAuthHeader());
  }

  /**
   * 新建文件夹
   * Create folder
   * @param params 参数：
   *   - pid (string, 必须) 新建文件夹所在的父目录ID
   *   - file_name (string, 必须) 新建文件夹名称
   */
  async createFolder(params: Record<string, any>): Promise<HttpResult> {
    if (!params.pid || !params.file_name) {
      return { success: false, code: -10, message: 'pid 和 file_name 为必填', data: null };
    }
    return httpRequest(this.baseUrl + '/open/folder/add', 'POST', params, this.getAuthHeader());
  }

  /**
   * 获取文件列表
   * List files
   * @param params 参数：详见文档
   */
  async listFiles(params: Record<string, any> = {}): Promise<HttpResult> {
    return httpRequest(this.baseUrl + '/open/ufile/files', 'GET', params, this.getAuthHeader());
  }

  /**
   * 获取文件/夹详情
   * Get file/folder info
   * @param params 参数：
   *   - file_id (string, 可选) 文件(夹)ID
   *   - path (string, 可选) 文件路径
   */
  async getFileInfo(params: Record<string, any> = {}): Promise<HttpResult> {
    if (!params.file_id && !params.path) {
      return { success: false, code: -10, message: 'file_id 和 path 至少传一个', data: null };
    }
    return httpRequest(this.baseUrl + '/open/folder/get_info', 'GET', params, this.getAuthHeader());
  }

  /**
   * 文件搜索
   * Search files
   * @param params 参数：
   *   - search_value (string, 必须) 查找关键字
   *   - limit (number, 必须) 单页记录数
   *   - offset (number, 必须) 数据显示偏移量
   */
  async searchFiles(params: Record<string, any>): Promise<HttpResult> {
    const required = ['search_value', 'limit', 'offset'];
    for (const field of required) {
      if (!params[field]) {
        return { success: false, code: -10, message: `${field} 为必填`, data: null };
      }
    }
    return httpRequest(this.baseUrl + '/open/ufile/search', 'GET', params, this.getAuthHeader());
  }

  /**
   * 文件复制
   * Copy files
   * @param params 参数：
   *   - pid (string, 必须) 目标目录ID
   *   - file_id (string, 必须) 所复制的文件和目录ID，多个用逗号隔开
   */
  async copyFiles(params: Record<string, any>): Promise<HttpResult> {
    if (!params.pid || !params.file_id) {
      return { success: false, code: -10, message: 'pid 和 file_id 为必填', data: null };
    }
    return httpRequest(this.baseUrl + '/open/ufile/copy', 'POST', params, this.getAuthHeader());
  }

  /**
   * 文件移动
   * Move files
   * @param params 参数：
   *   - file_ids (string, 必须) 需要移动的文件(夹)ID，多个用逗号隔开
   *   - to_cid (string, 必须) 要移动到的目录ID
   */
  async moveFiles(params: Record<string, any>): Promise<HttpResult> {
    if (!params.file_ids || !params.to_cid) {
      return { success: false, code: -10, message: 'file_ids 和 to_cid 为必填', data: null };
    }
    return httpRequest(this.baseUrl + '/open/ufile/move', 'POST', params, this.getAuthHeader());
  }

  /**
   * 获取文件下载地址
   * Get download url
   * @param params 参数：
   *   - pick_code (string, 必须) 文件提取码
   */
  async getDownloadUrl(params: Record<string, any>): Promise<HttpResult> {
    if (!params.pick_code) {
      return { success: false, code: -10, message: 'pick_code 为必填', data: null };
    }
    return httpRequest(this.baseUrl + '/open/ufile/downurl', 'POST', params, this.getAuthHeader());
  }

  /**
   * 更新文件/夹
   * Update file/folder
   * @param params 参数：
   *   - file_id (string, 必须) 需要更改名字的文件(夹)ID
   *   - file_name (string, 可选) 新的名字
   *   - star (string, 可选) 是否星标
   */
  async updateFile(params: Record<string, any>): Promise<HttpResult> {
    if (!params.file_id) {
      return { success: false, code: -10, message: 'file_id 为必填', data: null };
    }
    return httpRequest(this.baseUrl + '/open/ufile/update', 'POST', params, this.getAuthHeader());
  }

  /**
   * 删除文件/夹
   * Delete files/folders
   * @param params 参数：
   *   - file_ids (string, 必须) 需要删除的文件(夹)ID，多个用逗号隔开
   */
  async deleteFiles(params: Record<string, any>): Promise<HttpResult> {
    if (!params.file_ids) {
      return { success: false, code: -10, message: 'file_ids 为必填', data: null };
    }
    return httpRequest(this.baseUrl + '/open/ufile/delete', 'POST', params, this.getAuthHeader());
  }

  /**
   * 回收站列表
   * List recycle bin
   * @param params 参数：
   *   - limit (number, 必须) 单页记录数
   *   - offset (number, 必须) 数据显示偏移量
   */
  async listRecycleBin(params: Record<string, any>): Promise<HttpResult> {
    if (!params.limit || params.offset === undefined) {
      return { success: false, code: -10, message: 'limit 和 offset 为必填', data: null };
    }
    return httpRequest(this.baseUrl + '/open/rb/list', 'GET', params, this.getAuthHeader());
  }

  /**
   * 回收站还原
   * Revert recycle bin
   * @param params 参数：
   *   - tid (string, 必须) 需要还原的ID，多个用逗号隔开
   */
  async revertRecycleBin(params: Record<string, any>): Promise<HttpResult> {
    if (!params.tid) {
      return { success: false, code: -10, message: 'tid 为必填', data: null };
    }
    return httpRequest(this.baseUrl + '/open/rb/revert', 'POST', params, this.getAuthHeader());
  }

  /**
   * 清空/删除回收站
   * Clear/delete recycle bin
   * @param params 参数：
   *   - tid (string, 可选) 需要删除的文件的Id，不传为清空回收站
   */
  async clearRecycleBin(params: Record<string, any> = {}): Promise<HttpResult> {
    return httpRequest(this.baseUrl + '/open/rb/del', 'POST', params, this.getAuthHeader());
  }

  private getAuthHeader() {
    return {
      Authorization: 'Bearer ' + this.accessToken,
    };
  }
} 