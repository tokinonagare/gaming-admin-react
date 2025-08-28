import { BaseApi, AppConfig } from '@shared/utils';

export class AvatarRemote extends BaseApi {
  constructor() {
    super(AppConfig.ApiDomain);
  }

  // 获取头像列表
  getAvatarList = async (searchType?: string, searchValue?: string) => {
    let path = '/avatar/list';
    if (searchType && searchValue) {
      path += `?${searchType}=${encodeURIComponent(searchValue)}`;
    }
    
    const result = await this.request({
      path,
    });
    return result.avatars || [];
  };

  // 获取头像统计
  getAvatarStats = async () => {
    const result = await this.request({
      path: '/avatar/stats',
    });
    return result;
  };

  // 获取用户头像禁用详情 (参考UserRemote.js:89)
  getUserAvatarBanDetail = async (userId: string) => {
    return await this.request({
      path: `/avatar/ban/${userId}`,
    });
  };

  // 禁止用户上传头像 (参考UserRemote.js:133)
  banUserUploadAvatar = async (userId: string, banSeconds: number) => {
    return await this.request({
      path: `/avatar/ban`,
      method: 'PUT',
      body: {
        user_id: userId,
        ban_seconds: banSeconds,
      },
    });
  };

  // 解禁用户上传头像 (参考UserRemote.js:148)
  unBanUserUploadAvatar = async (userId: string) => {
    return await this.request({
      path: `/avatar/ban/${userId}`,
      method: 'DELETE',
    });
  };

  // 删除用户头像 (参考UserRemote.js:175)
  deleteUserAvatar = async (userId: string) => {
    return await this.request({
      path: `/profile/${userId}/avatar_path`,
      method: 'DELETE',
    });
  };

  // 以下是可能的头像审核相关API (需要根据实际API确认)
  approveAvatar = async (avatarId: string) => {
    return await this.request({
      path: `/avatar/${avatarId}/approve`,
      method: 'POST',
    });
  };

  rejectAvatar = async (avatarId: string, reason: string) => {
    return await this.request({
      path: `/avatar/${avatarId}/reject`,
      method: 'POST',
      body: { reason },
    });
  };

  deleteAvatar = async (avatarId: string) => {
    return await this.request({
      path: `/avatar/${avatarId}`,
      method: 'DELETE',
    });
  };

  getUserAvatarHistory = async (userId: string) => {
    const result = await this.request({
      path: `/avatar/user/${userId}/history`,
    });
    return result.avatars || [];
  };

  batchApprove = async (avatarIds: string[]) => {
    return await this.request({
      path: '/avatar/batch-approve',
      method: 'POST',
      body: { avatarIds },
    });
  };

  batchReject = async (avatarIds: string[], reason: string) => {
    return await this.request({
      path: '/avatar/batch-reject',
      method: 'POST',
      body: { avatarIds, reason },
    });
  };
}