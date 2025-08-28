import { formatCurrency } from '@shared/utils';

export const getTransactionStatementsColumns = () => {
  return [
    {
      title: '交易ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '货币',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: number) => formatCurrency(balance),
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];
};