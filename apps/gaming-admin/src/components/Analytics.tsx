import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const Analytics: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>数据分析</h1>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="活跃用户"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="万"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="游戏下载量"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="万"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;