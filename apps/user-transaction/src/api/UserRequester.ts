import { BaseApi, AppConfig } from '@shared/utils';

export class UserRequester extends BaseApi {
  constructor() {
    super(AppConfig.ApiDomain);
  }

  getUserByPhoneNumber = async (countryCode: string, phoneNumber: string) => {
    const result = await this.request({
      path: `/user/search?phone_number=${countryCode}-${phoneNumber}`,
    });
    // API 返回的是 { user_id, username }，规范化为 { id, username }
    return {
      id: result.user_id,
      username: result.username
    };
  };

  getUserByUsername = async (username: string) => {
    const result = await this.request({
      path: `/user/username/${username}`,
    });
    return result;
  };
}