import { Button, message } from 'antd';
import React, { useState } from 'react';
import { ReportRemote } from '../api/ReportRemote';
import { Report } from '../types/Report';

interface ActionCellProps {
  report: Report;
  onHandle?: () => void;
}

const ActionCell: React.FC<ActionCellProps> = ({ report, onHandle }) => {
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    try {
      setLoading(true);
      const reportRemote = new ReportRemote();
      await reportRemote.handle(report.id);
      onHandle?.();
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (report.status === 'processed') {
    return <span>无</span>;
  }

  return (
    <Button
      type="link"
      onClick={handleReport}
      loading={loading}
    >
      标记为已处理
    </Button>
  );
};

export default ActionCell;