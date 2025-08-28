import { Descriptions, Table, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
// TODO: 这里应该通过模块联邦获取举报信息
// import { ReportRemote } from '../api/ReportRemote';

const { Item } = Descriptions;

interface ReportedRecordProps {
  userId: string;
}

const ReportedRecord: React.FC<ReportedRecordProps> = ({ userId }) => {
  const [reportedRecords, setReportedRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: 实现举报记录获取逻辑
    setReportedRecords([]);
  }, [userId]);

  return (
    <Spin spinning={loading}>
      <Descriptions title="被举报记录" column={1}>
        <Item>
          <div>暂无被举报记录（需要集成举报模块）</div>
        </Item>
      </Descriptions>
    </Spin>
  );
};

export default ReportedRecord;