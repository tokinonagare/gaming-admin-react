import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { UserOutlined, PictureOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const AvatarManagement: React.FC = () => {
  return (
    <div>
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
        <Col span={12}>
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
              <div>本周新增头像</div>
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
        <Col span={12}>
          <Card title="头像分类统计">
            <div style={{ marginBottom: 16 }}>
              <Row justify="space-between">
                <span>默认头像</span>
                <span>580 (37%)</span>
              </Row>
              <Progress 
                percent={37} 
                showInfo={false} 
                strokeColor="#1890ff"
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Row justify="space-between">
                <span>自定义头像</span>
                <span>720 (46%)</span>
              </Row>
              <Progress 
                percent={46} 
                showInfo={false} 
                strokeColor="#52c41a"
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Row justify="space-between">
                <span>高级头像</span>
                <span>180 (11%)</span>
              </Row>
              <Progress 
                percent={11} 
                showInfo={false} 
                strokeColor="#faad14"
              />
            </div>
            <div>
              <Row justify="space-between">
                <span>活动头像</span>
                <span>100 (6%)</span>
              </Row>
              <Progress 
                percent={6} 
                showInfo={false} 
                strokeColor="#f50"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AvatarManagement;