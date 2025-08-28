import { BaseApi, AppConfig } from '@shared/utils';

export class UserRemote extends BaseApi {
  constructor() {
    super(AppConfig.ApiDomain);
  }

  getUserIdByPhoneNumber = async (countryCode: string, phoneNumber: string): Promise<string> => {
    const result = await this.request({
      path: `/user/search?phone_number=${countryCode}-${phoneNumber}`,
    });
    return result.user_id;
  };

  getProfile = async (userId: string) => {
    const result = await this.request({
      path: `/profile/${userId}`,
    });
    return result;
  };

  getOtherProfile = async (userId: string) => {
    const result = await this.request({
      path: `/user/${userId}/account`,
    });
    return result;
  };

  getLoginRecord = async (userId: string) => {
    const result = await this.request({
      path: `/user/${userId}/login/record`,
    });
    return result;
  };

  // 获取昵称禁用状态
  isNicknameBanned = async (userId: string) => {
    const response = await this.request({
      path: `/profile/${userId}/ban`,
    });
    return response.is_banned;
  };

  // 获取头像禁用详情
  requestBanAvatarDetail = async (userId: string) => {
    return await this.request({
      path: `/avatar/ban/${userId}`,
    });
  };

  // 获取房间消息禁用状态
  isRoomMessageBanned = async (userId: string) => {
    const response = await this.request({
      path: `/room_message/banned_list/${userId}`,
    });
    return response.status === 'banned';
  };

  deleteAvatar = async (userId: string) => {
    return await this.request({
      path: `/profile/${userId}/avatar_path`,
      method: 'DELETE',
    });
  };

  updateNickname = async (userId: string, nickname: string) => {
    return await this.request({
      path: `/profile/${userId}`,
      method: 'PUT',
      body: { nickname },
    });
  };

  // 禁止修改昵称
  banModifyNickname = async (userId: string) => {
    return await this.request({
      path: `/profile/${userId}/ban`,
      method: 'PUT',
    });
  };

  // 禁止上传头像
  banUploadAvatar = async (userId: string, banSeconds: number) => {
    return await this.request({
      path: `/avatar/ban`,
      method: 'PUT',
      body: {
        user_id: userId,
        ban_seconds: banSeconds,
      },
    });
  };

  // 解禁上传头像
  unBanUploadAvatar = async (userId: string) => {
    return await this.request({
      path: `/avatar/ban/${userId}`,
      method: 'DELETE',
    });
  };

  // 禁止房间发言
  banSendRoomMessage = async (userId: string) => {
    return await this.request({
      path: `/room_message/banned_list/${userId}`,
      method: 'PUT',
      body: {
        duration_seconds: 300,
        memo: '无',
      },
    });
  };

  forceLogout = async (userId: string) => {
    return await this.request({
      path: `/user/${userId}/logout`,
      method: 'DELETE',
    });
  };
}