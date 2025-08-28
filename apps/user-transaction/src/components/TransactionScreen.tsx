import {
  Button, Card, Input, message, Select, Space, Table, Radio,
} from 'antd';
import React, { useMemo, useState } from 'react';
import { TransactionRequester } from '../api/TransactionRequester';
import { UserRequester } from '../api/UserRequester';
import { getTransactionStatementsColumns } from '../helpers/getTransactionStatementsColumns';
import { getCurrencyColumns } from '../helpers/getCurrencyColumns';
import { getSearchTypePlaceholder } from '../helpers/getSearchTypePlaceholder';

const { Search } = Input;

const CURRENCY_ALL = 'all';
const CURRENCY_COIN = 'coin';
const CURRENCY_DIAMOND = 'diamond';

const TransactionScreen: React.FC = () => {
  const [searchBy, setSearchBy] = useState('phoneNumber');
  const [searchFor, setSearchFor] = useState('wallet');
  const [searchCurrency, setSearchCurrency] = useState(CURRENCY_ALL);
  const [countryCode, setCountryCode] = useState('86');
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [statements, setStatements] = useState<any[]>([]);
  const [userId, setUserId] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const userRequester = useMemo(() => new UserRequester(), []);
  const transactionRequester = useMemo(() => new TransactionRequester(), []);

  const onSearchByChanged = (value: string) => {
    setSearchBy(value);
  };

  const onSearchForChanged = (event: any) => {
    setSearchFor(event.target.value);
  };

  const onSearchCurrencyChanged = (event: any) => {
    setSearchCurrency(event.target.value);
  };

  const onCountryCodeChanged = (event: any) => {
    setCountryCode(event.target.value);
  };

  const queryWalletByUserId = async (_userId: string) => {
    try {
      setLoading(true);
      const wallet = await transactionRequester.queryWallet(_userId);
      // 映射API返回的字段到组件期望的字段
      const mappedCurrencies = wallet.currencies.map((currency: any) => ({
        code: currency.code,
        available: parseFloat(currency.balance),
        frozen: parseFloat(currency.frozen_amount),
        total: parseFloat(currency.total_amount),
        name: currency.name,
        currency_name: currency.currency_name
      }));
      setCurrencies(mappedCurrencies);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const listTransactionStatementByUserId = async (_userId: string, _nextPage = '') => {
    if (searchCurrency === CURRENCY_ALL) {
      listAllTransactionStatement(_userId, _nextPage);
    } else {
      listTransactionStatementByCurrency(_userId, searchCurrency, _nextPage);
    }
  };

  const listAllTransactionStatement = async (_userId: string, _nextPage = '') => {
    try {
      setLoading(true);
      const statementResult = await transactionRequester.listStatements(_userId, _nextPage);
      setNextPage(statementResult.nextPage);
      setStatements(statementResult.statements);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const listTransactionStatementByCurrency = async (_userId: string, _currencyName: string, _nextPage = '') => {
    try {
      setLoading(true);
      const statementResult = await transactionRequester.listStatementsByCurrency(
        _userId,
        _currencyName,
        _nextPage,
      );
      setNextPage(statementResult.nextPage);
      setStatements(statementResult.statements);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const queryDataByPhoneNumber = async (_phoneNumber: string, _searchFor: string) => {
    try {
      setLoading(true);
      const user = await userRequester.getUserByPhoneNumber(countryCode, _phoneNumber);
      if (!user.id) {
        message.error('没有找到用户, 请输入正确信息!');
        return;
      }
      setUserId(user.id);
      queryDataByUserId(user.id, _searchFor);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const queryDataByUsername = async (username: string, _searchFor: string) => {
    try {
      setLoading(true);
      const user = await userRequester.getUserByUsername(username);
      if (!user.id) {
        message.error('没有找到用户, 请输入正确信息!');
        return;
      }
      setUserId(user.id);
      queryDataByUserId(user.id, _searchFor);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const queryDataByUserId = async (_userId: string, _searchFor: string) => {
    try {
      setUserId(_userId);
      setLoading(true);
      if (_searchFor === 'wallet') {
        queryWalletByUserId(_userId);
      } else if (_searchFor === 'statement') {
        listTransactionStatementByUserId(_userId);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFrozenChanged = (values: any, type: any) => {
    console.log('frozen data ===', values, type);
    message.warning('该功能暂不可用, 等待api开发!');
  };

  const onSearchPressed = (value: string) => {
    if (searchBy === 'phoneNumber') {
      queryDataByPhoneNumber(value, searchFor);
    } else if (searchBy === 'username') {
      queryDataByUsername(value, searchFor);
    } else if (searchBy === 'userId') {
      queryDataByUserId(value, searchFor);
    } else {
      message.error('无效输入!');
    }
  };

  const onClearDataPressed = () => {
    setCurrencies([]);
    setStatements([]);
    setNextPage('');
  };

  const toFirstPage = () => {
    setCurrentPage(1);
    setNextPage('');
    listTransactionStatementByUserId(userId);
  };

  const toNextPage = () => {
    listTransactionStatementByUserId(userId, nextPage);
    setCurrentPage((page) => page + 1);
  };

  return (
    <Card title="玩家交易记录查询">
      <Space size="large" direction="vertical" style={{ width: '100%' }}>
        <Radio.Group
          onChange={onSearchForChanged}
          value={searchFor}
          optionType="button"
          buttonStyle="solid"
          options={[
            { value: 'wallet', label: '钱包' },
            { value: 'statement', label: '流水' },
          ]}
          size="large"
        />
        {searchFor === 'statement' ? (
          <Radio.Group
            onChange={onSearchCurrencyChanged}
            value={searchCurrency}
            optionType="button"
            buttonStyle="solid"
            options={[
              { value: CURRENCY_ALL, label: '全部' },
              { value: CURRENCY_COIN, label: '金币' },
              { value: CURRENCY_DIAMOND, label: '钻石' },
            ]}
            size="large"
          />
        ) : null}
        <Space direction="horizontal" size="middle">
          <Select
            size="large"
            defaultValue="phoneNumber"
            onChange={onSearchByChanged}
            options={[
              { value: 'phoneNumber', label: '电话号码' },
              { value: 'username', label: '用户名' },
              { value: 'userId', label: 'UserID' },
            ]}
          />
          {searchBy === 'phoneNumber' ? (
            <Input
              type="number"
              style={{ width: 100 }}
              defaultValue="86"
              onChange={onCountryCodeChanged}
              size="large"
            />
          ) : null}
          <Search
            style={{ width: 400 }}
            allowClear
            onSearch={onSearchPressed}
            size="large"
            placeholder={getSearchTypePlaceholder(searchBy)}
            enterButton="查询"
            loading={loading}
          />
          <Button type="default" size="large" onClick={onClearDataPressed}>
            清空数据
          </Button>
        </Space>
        {currencies.length > 0 ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <span>钱包信息: </span>
            <Table
              size="large"
              rowKey={({ code }) => code}
              columns={getCurrencyColumns({ onFrozenChanged })}
              dataSource={currencies}
              pagination={{
                position: ['none', 'none'],
              }}
            />
          </Space>
        ) : null}
        {statements.length > 0 ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <span>交易流水: </span>
            <Table
              size="large"
              rowKey={({ id }) => id}
              columns={getTransactionStatementsColumns()}
              dataSource={statements}
              pagination={false}
            />
            <Space size="large" align="center">
              <Button type="primary" onClick={toFirstPage}>
                第一页
              </Button>
              <Button onClick={toNextPage}>下一页</Button>
              <span>当前页数: {currentPage}</span>
            </Space>
          </Space>
        ) : null}
      </Space>
    </Card>
  );
};

export default TransactionScreen;