import React from 'react';
import { Card, Row, Col, Statistic, Alert } from 'antd';
import { UserOutlined, GamepadOutlined, DollarCircleOutlined } from '@ant-design/icons';

const DashboardFallback: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message=\"模块加载失败\" 
        description=\"仪表盘模块无法加载，显示本地备用版本\"
        type=\"warning\" 
        style={{ marginBottom: 24 }}
        closable
      />
      <h1>游戏平台管理后台 (本地版本)</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title=\"总用户数\"
              value={11280}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title=\"游戏总数\"
              value={156}
              prefix={<GamepadOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title=\"今日收入\"
              value={93}
              precision={2}
              prefix={<DollarCircleOutlined />}
              suffix=\"万\"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardFallback;