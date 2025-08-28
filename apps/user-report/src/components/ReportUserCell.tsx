import { message, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserAvatar } from '@shared/ui';
// TODO: 这里应该通过模块联邦或API调用获取用户信息
// import { UserRemote } from '../api/UserRemote';
// import styles from './ReportUserCell.module.css';

interface ReportUserCellProps {
  userId: string;
}

const ReportUserCell: React.FC<ReportUserCellProps> = ({ userId }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // TODO: 实现用户信息获取逻辑
    setProfile({
      nickname: `用户${userId}`,
      avatarSource: '/images/default_avatar.png'
    });
  }, [userId]);

  const showModal = () => {
    if (!profile) {
      return;
    }
    setModalVisible(true);
  };

  const hiddenModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {loading ? (
        <Spin size="small" spinning={loading} />
      ) : (
        <div 
          onClick={showModal}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer', 
            padding: '4px 8px',
            borderRadius: '4px' 
          }}
        >
          <UserAvatar
            src={profile?.avatarSource}
            size="large"
            style={{ marginRight: 8 }}
          />
          <span>{profile?.nickname || 'unknown'}</span>
        </div>
      )}
      <Modal
        title="用户信息"
        open={modalVisible}
        onCancel={hiddenModal}
        footer={null}
        width={600}
      >
        {/* TODO: 这些组件需要从user-profile微前端导入 */}
        <div>用户详细信息展示（待实现）</div>
      </Modal>
    </>
  );
};

export default ReportUserCell;