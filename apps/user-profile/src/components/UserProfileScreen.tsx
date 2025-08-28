import { Card, Empty, message } from 'antd';
import React, { useState, useMemo } from 'react';
import { UserRemote } from '../api/UserRemote';
import BasicUserProfile from './BasicUserProfile';
import ReportedRecord from './ReportedRecord';
import SearchForm from './SearchForm';
import UserBannedStatus from './UserBannedStatus';
import LoginRecord from './LoginRecord';

const UserProfileScreen: React.FC = () => {
  const userRemote = useMemo(() => new UserRemote(), []);
  const [isSearching, setIsSearching] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const onSearch = async (values: any) => {
    try {
      setIsSearching(true);
      let userId = '';
      const { searchType } = values;
      if (searchType === 'phoneNumber') {
        // 如果是通过手机号码查询 需要先查到 userId
        const { countryCode, phoneNumber } = values;
        userId = await userRemote.getUserIdByPhoneNumber(countryCode, phoneNumber);
      } else {
        userId = values.userId;
      }
      if (!userId) {
        throw new Error('用户不存在');
      }
      setUserId(userId);
    } catch (error: any) {
      setUserId(undefined);
      message.error(error?.message);
    } finally {
      setIsSearching(false);
    }
  };

  const extra = (
    <SearchForm
      onSubmit={onSearch}
      buttonLoading={isSearching}
    />
  );

  return (
    <Card title="用户信息" extra={extra}>
      {userId ? (
        <>
          <BasicUserProfile userId={userId} />
          <LoginRecord userId={userId} />
          <ReportedRecord userId={userId} />
          <UserBannedStatus userId={userId} />
        </>
      ) : (
        <Empty description={<span>请先查询</span>} />
      )}
    </Card>
  );
};

export default UserProfileScreen;