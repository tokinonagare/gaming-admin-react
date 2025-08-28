import { Button, Space } from 'antd';
import { formatCurrency } from '@shared/utils';

interface GetCurrencyColumnsProps {
  onFrozenChanged: (values: any, type: any) => void;
}

export const getCurrencyColumns = ({ onFrozenChanged }: GetCurrencyColumnsProps) => {
  return [
    {
      title: '货币类型',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '可用余额',
      dataIndex: 'available',
      key: 'available',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: '冻结余额',
      dataIndex: 'frozen',
      key: 'frozen',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: '总余额',
      dataIndex: 'total',
      key: 'total',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => onFrozenChanged(record, 'freeze')}
          >
            冻结
          </Button>
          <Button
            type="link"
            onClick={() => onFrozenChanged(record, 'unfreeze')}
          >
            解冻
          </Button>
        </Space>
      ),
    },
  ];
};