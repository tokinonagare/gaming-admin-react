import { Descriptions, Spin } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { UserRemote } from '../api/UserRemote';

const { Item } = Descriptions;

interface LoginRecordProps {
  userId: string;
}

const LoginRecord: React.FC<LoginRecordProps> = ({ userId }) => {
  const userRemote = useMemo(() => new UserRemote(), []);
  const [loginRecord, setLoginRecord] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryLoginRecord = async () => {
      try {
        setLoading(true);
        const record = await userRemote.getLoginRecord(userId);
        setLoginRecord(record);
      } catch (error: any) {
        setLoginRecord({});
      } finally {
        setLoading(false);
      }
    };
    
    queryLoginRecord();
  }, [userId]);

  return (
    <Spin spinning={loading}>
      <Descriptions title="登录记录" column={1}>
        <Item label="最后登录时间">
          {loginRecord.lastLoginAt 
            ? moment(loginRecord.lastLoginAt).format('YYYY-MM-DD HH:mm:ss')
            : '未知'
          }
        </Item>
        <Item label="最后登录IP">{loginRecord.lastLoginIp || '未知'}</Item>
        <Item label="登录次数">{loginRecord.loginCount || 0}</Item>
        <Item label="注册IP">{loginRecord.registerIp || '未知'}</Item>
      </Descriptions>
    </Spin>
  );
};

export default LoginRecord;