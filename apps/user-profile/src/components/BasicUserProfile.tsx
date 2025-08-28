import {
  DisconnectOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  Button,
  Descriptions,
  Image,
  Input,
  message,
  Space,
  Spin,
} from 'antd';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import moment from 'moment';
import { UserRemote } from '../api/UserRemote';

const { Item } = Descriptions;

interface BasicUserProfileProps {
  userId: string;
}

const BasicUserProfile: React.FC<BasicUserProfileProps> = ({ userId }) => {
  const userRemote = useMemo(() => new UserRemote(), []);
  const [profile, setProfile] = useState<any>({});
  const [otherProfile, setOtherProfile] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [deletingAvatar, setDeletingAvatar] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const nicknameInputRef = useRef<any>(null);

  useEffect(() => {
    queryBasicProfile();
    queryOtherProfile();
  }, [userId]);

  const queryBasicProfile = async () => {
    try {
      setLoading(true);
      const profile = await userRemote.getProfile(userId);
      setProfile(profile);
    } catch (error: any) {
      setProfile({});
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const queryOtherProfile = async () => {
    try {
      setLoading(true);
      const otherProfile = await userRemote.getOtherProfile(userId);
      setOtherProfile(otherProfile);
    } catch (error: any) {
      setOtherProfile({});
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteAvatarClick = async () => {
    try {
      setDeletingAvatar(true);
      await userRemote.deleteAvatar(userId);
      queryBasicProfile();
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      setDeletingAvatar(false);
    }
  };

  const updateUserNickname = async () => {
    try {
      const { state: { value } } = nicknameInputRef.current;
      await userRemote.updateNickname(userId, value);
      setIsEditingNickname(false);
      queryBasicProfile();
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const forceLogout = async () => {
    try {
      await userRemote.forceLogout(userId);
      message.success('已将该用户踢下线');
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const nicknameItem = (
    <>
      {profile.nickname}
      <Button
        type="link"
        icon={<EditOutlined />}
        onClick={() => setIsEditingNickname(true)}
      >
        编辑
      </Button>
    </>
  );

  const nicknameInput = (
    <>
      <Input
        ref={nicknameInputRef}
        style={{ width: 160 }}
        defaultValue={profile.nickname}
      />
      <Button
        type="link"
        onClick={updateUserNickname}
      >
        确认
      </Button>
      <Button
        type="link"
        onClick={() => setIsEditingNickname(false)}
        danger
      >
        取消
      </Button>
    </>
  );

  return (
    <Spin spinning={loading}>
      <Descriptions
        title="基础资料"
        labelStyle={{ alignItems: 'center' }}
        column={1}
      >
        <Item label="头像">
          <Space>
            <Image
              width={80}
              src={profile.avatarSource}
            />
            <Button
              size="small"
              onClick={onDeleteAvatarClick}
              loading={deletingAvatar}
              danger
            >
              删除头像
            </Button>
          </Space>
        </Item>
        <Item label="用户ID">{profile.userId}</Item>
        <Item label="昵称">
          {isEditingNickname ? nicknameInput : nicknameItem}
        </Item>
        <Item label="生日">{profile.birthday}</Item>
        <Item label="注册时间">
          {moment(profile.createAt).format('YYYY-MM-DD HH:mm:ss')}
        </Item>
        <Item label="个性签名">{profile.bio || '未知'}</Item>
        <Item label="国家代码">{otherProfile.countryCode || '未知'}</Item>
        <Item label="设备ID">{otherProfile.deviceId || '未知'}</Item>
        <Item label="Email">{otherProfile.email || '未知'}</Item>
        <Item label="是否有密码">{otherProfile.hasPassword}</Item>
        <Item label="是否为Device账号">{otherProfile.isDeviceAccount}</Item>
        <Item label="是否验证邮箱">{otherProfile.isEmailVerify}</Item>
        <Item label="电话号码">{otherProfile.phoneNumber}</Item>
        <Item label="用户名">{otherProfile.userName || '未知'}</Item>
        <Item label="将要删除在">{otherProfile.willDeleteAt || '未知'}</Item>
        <Item>
          <Button
            onClick={forceLogout}
            icon={<DisconnectOutlined />}
            danger
          >
            强制下线
          </Button>
        </Item>
      </Descriptions>
    </Spin>
  );
};

export default BasicUserProfile;