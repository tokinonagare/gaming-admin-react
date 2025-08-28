import { Tag, Tooltip } from 'antd';
import ActionCell from '../components/ActionCell';
import ReportUserCell from '../components/ReportUserCell';
import ReportStatusCell from '../components/ReportStatusCell';
import { Report } from '../types/Report';

interface ReportTableProps {
  onHandle: () => void;
}

export class ReportTable {
  static listColumns = ({ onHandle }: ReportTableProps) => {
    return [
      {
        title: '被举报人',
        dataIndex: 'reportedUserId',
        render: (id: string) => <ReportUserCell userId={id} />,
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status: string) => <ReportStatusCell status={status} />,
      },
      {
        title: '被举报类型',
        dataIndex: 'tag',
        ellipsis: { showTitle: false },
        render: (tags: string[]) => (
          <Tooltip placement="topLeft" title={tags.join('、')}>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tooltip>
        ),
      },
      {
        title: '被举报原因',
        dataIndex: 'content',
        ellipsis: { showTitle: false },
        render: (content: string) => (
          <Tooltip placement="topLeft" title={content}>
            {content}
          </Tooltip>
        ),
      },
      {
        title: '举报人',
        dataIndex: 'reportUserId',
        render: (id: string) => <ReportUserCell userId={id} />,
      },
      {
        title: '处理人',
        dataIndex: 'processUsername',
        render: (username: string) => <span>{username || '暂无'}</span>,
      },
      {
        title: '举报时间',
        dataIndex: 'createdAt',
      },
      {
        title: '处理时间',
        dataIndex: 'processAt',
      },
      {
        key: 'action',
        title: '操作',
        render: (report: Report) => <ActionCell report={report} onHandle={onHandle} />,
      },
    ];
  };
}