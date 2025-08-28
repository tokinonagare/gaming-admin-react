import { Button, Descriptions, message, Space, Tag } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { UserRemote } from '../api/UserRemote';

const { Item } = Descriptions;

interface UserBannedStatusProps {
  userId: string;
}

const UserBannedStatus: React.FC<UserBannedStatusProps> = ({ userId }) => {
  const userRemote = useMemo(() => new UserRemote(), []);
  const [bannedStatus, setBannedStatus] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    queryBannedStatus();
  }, [userId]);

  const queryBannedStatus = async () => {
    try {
      setLoading(true);
      const status = await userRemote.getBannedStatus(userId);
      setBannedStatus(status);
    } catch (error: any) {
      setBannedStatus({});
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async () => {
    try {
      await userRemote.banUser(userId);
      message.success('用户已被封禁');
      queryBannedStatus();
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const handleUnbanUser = async () => {
    try {
      await userRemote.unbanUser(userId);
      message.success('用户已被解封');
      queryBannedStatus();
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const getStatusTag = () => {
    if (bannedStatus.isBanned) {
      return <Tag color="red">已封禁</Tag>;
    }
    return <Tag color="green">正常</Tag>;
  };

  return (
    <Descriptions title="封禁状态" column={1}>
      <Item label="当前状态">{getStatusTag()}</Item>
      {bannedStatus.bannedAt && (
        <Item label="封禁时间">
          {moment(bannedStatus.bannedAt).format('YYYY-MM-DD HH:mm:ss')}
        </Item>
      )}
      {bannedStatus.bannedReason && (
        <Item label="封禁原因">{bannedStatus.bannedReason}</Item>
      )}
      {bannedStatus.bannedUntil && (
        <Item label="解封时间">
          {moment(bannedStatus.bannedUntil).format('YYYY-MM-DD HH:mm:ss')}
        </Item>
      )}
      <Item label="操作">
        <Space>
          {!bannedStatus.isBanned ? (
            <Button danger onClick={handleBanUser}>
              封禁用户
            </Button>
          ) : (
            <Button type="primary" onClick={handleUnbanUser}>
              解封用户
            </Button>
          )}
        </Space>
      </Item>
    </Descriptions>
  );
};

export default UserBannedStatus;