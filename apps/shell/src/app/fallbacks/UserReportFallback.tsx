import React from 'react';
import { Card, Row, Col, Statistic, Alert, Table } from 'antd';
import { FileTextOutlined, BarChartOutlined, UserOutlined } from '@ant-design/icons';

const UserReportFallback: React.FC = () => {
  const columns = [
    {
      title: '报告名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '生成时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      name: '用户行为分析报告',
      createdAt: '2024-01-15 10:30',
      status: '已完成',
    },
    {
      key: '2',
      name: '用户活跃度报告',
      createdAt: '2024-01-14 15:20',
      status: '已完成',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message="模块加载失败" 
        description="用户报告模块无法加载，显示本地备用版本"
        type="warning" 
        style={{ marginBottom: 24 }}
        closable
      />
      <h1>用户报告管理 (本地版本)</h1>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总报告数"
              value={156}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="本月新增"
              value={23}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="涉及用户"
              value={8420}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="最新报告">
        <Table columns={columns} dataSource={data} size="small" />
      </Card>
    </div>
  );
};

export default UserReportFallback;