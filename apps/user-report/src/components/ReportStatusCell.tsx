import {
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';

const PROCESSED = 'processed';
const UNPROCESSED = 'unprocessed';

interface ReportStatusCellProps {
  status: string;
}

const ReportStatusCell: React.FC<ReportStatusCellProps> = ({ status }) => {
  if (status === PROCESSED) {
    return (
      <Space style={{ color: '#52c41a' }}>
        <CheckCircleOutlined />已处理
      </Space>
    );
  }

  if (status === UNPROCESSED) {
    return (
      <Space style={{ color: '#faad14' }}>
        <ExclamationCircleOutlined />未处理
      </Space>
    );
  }

  return <span>{status}</span>;
};

export default ReportStatusCell;