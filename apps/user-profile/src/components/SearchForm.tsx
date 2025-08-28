import {
  Button, Form, Input, Select,
} from 'antd';
import React, { useState } from 'react';

const { Item } = Form;
const { Option } = Select;

interface SearchFormProps {
  onSubmit: (values: any) => void;
  buttonLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, buttonLoading }) => {
  const [searchType, setSearchType] = useState('phoneNumber');

  const phoneNumberSearch = (
    <Item>
      <Input.Group compact>
        <Item name="countryCode">
          <Input style={{ width: 60 }} />
        </Item>
        <Item name="phoneNumber" style={{ margin: 0 }}>
          <Input placeholder="请输入手机号" />
        </Item>
      </Input.Group>
    </Item>
  );

  const userIdSearch = (
    <Item name="userId">
      <Input
        style={{ width: 325 }}
        placeholder="请输入用户ID"
      />
    </Item>
  );

  return (
    <Form
      layout="inline"
      onFinish={onSubmit}
      initialValues={{ searchType, countryCode: '86' }}
    >
      <Item name="searchType">
        <Select onChange={setSearchType}>
          <Option value="phoneNumber">手机号</Option>
          <Option value="userId">用户ID</Option>
        </Select>
      </Item>
      {searchType === 'phoneNumber' ? phoneNumberSearch : userIdSearch}
      <Item>
        <Button htmlType="submit" loading={buttonLoading}>
          查询
        </Button>
      </Item>
    </Form>
  );
};

export default SearchForm;