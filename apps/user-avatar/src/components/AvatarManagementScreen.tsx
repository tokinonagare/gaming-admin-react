import { Card, Row, Col, Statistic, Table, Avatar, Tag, Progress, Space, Button, Input, Select, message } from 'antd';
import { PictureOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useMemo } from 'react';
import { AvatarRemote } from '../api/AvatarRemote';

const { Search } = Input;
const { Option } = Select;

interface AvatarRecord {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  uploadTime: string;
  status: 'approved' | 'pending' | 'rejected';
  reason?: string;
}

const AvatarManagementScreen: React.FC = () => {
  const [avatars, setAvatars] = useState<AvatarRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('username');
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const avatarRemote = useMemo(() => new AvatarRemote(), []);

  useEffect(() => {
    loadAvatars();
    loadStats();
  }, []);

  const loadAvatars = async (searchValue?: string) => {
    try {
      setLoading(true);
      const result = await avatarRemote.getAvatarList(searchType, searchValue);
      setAvatars(result);
    } catch (error: any) {
      message.error(error?.message || '加载头像列表失败');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await avatarRemote.getAvatarStats();
      setStats(result);
    } catch (error: any) {
      console.error('加载统计数据失败:', error);
    }
  };

  const handleApprove = async (record: AvatarRecord) => {
    try {
      await avatarRemote.approveAvatar(record.id);
      message.success('头像已审核通过');
      loadAvatars();
      loadStats();
    } catch (error: any) {
      message.error(error?.message || '审核失败');
    }
  };

  const handleReject = async (record: AvatarRecord) => {
    try {
      await avatarRemote.rejectAvatar(record.id, '不符合规范');
      message.success('头像已拒绝');
      loadAvatars();
      loadStats();
    } catch (error: any) {
      message.error(error?.message || '拒绝失败');
    }
  };

  const handleDelete = async (record: AvatarRecord) => {
    try {
      await avatarRemote.deleteAvatar(record.id);
      message.success('头像已删除');
      loadAvatars();
      loadStats();
    } catch (error: any) {
      message.error(error?.message || '删除失败');
    }
  };

  const columns = [
    {
      title: '头像预览',
      dataIndex: 'avatarUrl',
      key: 'avatar',
      render: (avatarUrl: string) => (
        <Avatar size={64} src={avatarUrl} icon={<UserOutlined />} />
      ),
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          'approved': 'green',
          'pending': 'orange',
          'rejected': 'red',
        };
        const textMap: Record<string, string> = {
          'approved': '已审核',
          'pending': '待审核',
          'rejected': '已拒绝',
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record: AvatarRecord) => (
        <Space>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => handleApprove(record)}
              >
                通过
              </Button>
              <Button
                danger
                size="small"
                onClick={() => handleReject(record)}
              >
                拒绝
              </Button>
            </>
          )}
          <Button
            danger
            size="small"
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const onSearch = (value: string) => {
    loadAvatars(value);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总头像数"
              value={stats.total}
              prefix={<PictureOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已审核"
              value={stats.approved}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待审核"
              value={stats.pending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已拒绝"
              value={stats.rejected}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="头像管理">
        <Space style={{ marginBottom: 16 }}>
          <Select
            value={searchType}
            onChange={setSearchType}
            style={{ width: 120 }}
          >
            <Option value="username">用户名</Option>
            <Option value="userId">用户ID</Option>
          </Select>
          <Search
            placeholder={`请输入${searchType === 'username' ? '用户名' : '用户ID'}`}
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
            enterButton={<SearchOutlined />}
          />
          <Button onClick={() => loadAvatars()}>刷新</Button>
        </Space>
        
        <Table
          columns={columns}
          dataSource={avatars}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
        />

        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card title="审核进度">
              <div style={{ marginBottom: 16 }}>
                <div>审核完成率</div>
                <Progress 
                  percent={stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0} 
                  status="active"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AvatarManagementScreen;