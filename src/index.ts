/**
 * 115开放平台 JS/TS SDK 统一入口
 * 115 Open Platform SDK Main Client
 *
 * @author 尘墨成 (dustink)
 */
import { Auth } from './auth';
import { User } from './user';
import { FileManager } from './fileManager';
import { Video } from './video';
import { Offline } from './offline';

export class Client {
  /**
   * 授权相关
   */
  public auth: Auth;
  /**
   * 用户相关
   */
  public user: User | null;
  /**
   * 文件管理
   */
  public file: FileManager | null;
  /**
   * 视频播放
   */
  public video: Video | null;
  /**
   * 云下载
   */
  public offline: Offline | null;

  /**
   * 构造函数
   * @param clientId APP ID
   * @param accessToken 可选，access_token
   */
  constructor(clientId: string, accessToken?: string) {
    this.auth = new Auth(clientId);
    this.user = accessToken ? new User(accessToken) : null;
    this.file = accessToken ? new FileManager(accessToken) : null;
    this.video = accessToken ? new Video(accessToken) : null;
    this.offline = accessToken ? new Offline(accessToken) : null;
  }
}
