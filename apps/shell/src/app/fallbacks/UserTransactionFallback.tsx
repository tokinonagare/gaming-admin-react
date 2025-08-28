import React from 'react';
import { Card, Row, Col, Statistic, Alert, Table, Tag } from 'antd';
import { DollarOutlined, TransactionOutlined, TrophyOutlined } from '@ant-design/icons';

const UserTransactionFallback: React.FC = () => {
  const columns = [
    { title: '交易ID', dataIndex: 'id', key: 'id' },
    { title: '用户', dataIndex: 'user', key: 'user' },
    { title: '金额', dataIndex: 'amount', key: 'amount' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status', 
      render: (status: string) => (
        <Tag color={status === '成功' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    { title: '时间', dataIndex: 'time', key: 'time' },
  ];

  const data = [
    { key: '1', id: 'TXN001', user: '用户A', amount: '¥299', status: '成功', time: '2024-01-15 14:30' },
    { key: '2', id: 'TXN002', user: '用户B', amount: '¥158', status: '成功', time: '2024-01-15 13:20' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message="模块加载失败" 
        description="用户交易模块无法加载，显示本地备用版本" 
        type="warning" 
        style={{ marginBottom: 24 }} 
        closable 
      />
      <h1>用户交易管理 (本地版本)</h1>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="总交易额" value={285420} prefix={<DollarOutlined />} suffix="元" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="交易笔数" value={1205} prefix={<TransactionOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="成功率" value={98.5} prefix={<TrophyOutlined />} suffix="%" />
          </Card>
        </Col>
      </Row>
      <Card title="最新交易">
        <Table columns={columns} dataSource={data} size="small" />
      </Card>
    </div>
  );
};

export default UserTransactionFallback;