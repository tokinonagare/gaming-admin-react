import React from 'react';
import { Card, Row, Col, Statistic, Alert, Table, Avatar, Tag, Progress } from 'antd';
import { PictureOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const UserAvatarFallback: React.FC = () => {
  const columns = [
    {
      title: '头像预览',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar size={48} src={avatar} />,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
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
          '已审核': 'green',
          '待审核': 'orange',
          '已拒绝': 'red',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
  ];

  const data = [
    {
      key: '1',
      username: '张三',
      avatar: 'https://joeschmoe.io/api/v1/male/1',
      uploadTime: '2024-01-15 10:30',
      status: '已审核',
    },
    {
      key: '2',
      username: '李四',
      avatar: 'https://joeschmoe.io/api/v1/female/2',
      uploadTime: '2024-01-14 15:20',
      status: '待审核',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message="模块加载失败" 
        description="用户头像模块无法加载，显示本地备用版本"
        type="warning" 
        style={{ marginBottom: 24 }}
        closable
      />
      <h1>用户头像管理 (本地版本)</h1>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总头像数"
              value={1580}
              prefix={<PictureOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已审核"
              value={1245}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待审核"
              value={235}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={892}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="最新头像">
            <Table columns={columns} dataSource={data} size="small" pagination={false} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="审核进度">
            <div style={{ marginBottom: 16 }}>
              <div>审核完成率</div>
              <Progress 
                percent={Math.round((1245 / 1580) * 100)} 
                status="active"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div>本周新增</div>
              <Progress 
                percent={65} 
                strokeColor="#52c41a"
              />
            </div>
            <div>
              <div>用户满意度</div>
              <Progress 
                percent={92} 
                strokeColor="#1890ff"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserAvatarFallback;