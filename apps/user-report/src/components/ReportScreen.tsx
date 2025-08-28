import { Button, Card, message, Radio, Space, Table } from 'antd';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ReportRemote } from '../api/ReportRemote';
import { ReportTable } from '../models/ReportTable';
import { Report } from '../types/Report';

const DEFAULT_PAGE = 1;
const DEFAULT_SLUG = 'laiwan';

const ReportScreen: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [slug, setSlug] = useState(DEFAULT_SLUG);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchReports() {
      if (loading) return;

      try {
        setLoading(true);
        
        // 调试：打印API域名
        console.log('Current API Domain:', process.env.REACT_APP_API_DOMAIN);

        // 在 effect 内部创建实例，避免依赖问题
        const reportRemote = new ReportRemote();
        const result = await reportRemote.list(slug, page);

        if (!isCancelled) {
          setReports(result.reports);
          setNextButtonDisabled(result.reports.length < 10);
        }
      } catch (error: any) {
        if (!isCancelled) {
          console.error('API Error:', error);
          setReports([]);
          message.error(error?.message || 'API请求失败');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchReports();

    return () => {
      isCancelled = true;
    };
  }, [slug, page]); // 只依赖真正影响数据的变量

  const toFirstPage = () => {
    setPage(1);
  };

  const toNextPage = () => {
    setPage((page) => page + 1);
  };

  const onSlugChanged = (event: any) => {
    toFirstPage();
    setSlug(event.target.value);
  };

  const refreshReports = useCallback(async () => {
    try {
      setLoading(true);

      // 在回调内部创建实例，避免依赖问题
      const reportRemote = new ReportRemote();
      const result = await reportRemote.list(slug, page);

      setReports(result.reports);
      setNextButtonDisabled(result.reports.length < 10);
    } catch (error: any) {
      console.error('API Error:', error);
      setReports([]);
      message.error(error?.message || 'API请求失败');
    } finally {
      setLoading(false);
    }
  }, [slug, page]);

  const columns = useMemo(() =>
    ReportTable.listColumns({ onHandle: refreshReports }),
    [refreshReports]
  );

  return (
    <Card title="举报管理">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Radio.Group
          options={[
            { value: 'laiwan', label: '来玩' },
            { value: 'texas_holdem', label: '德州' },
            { value: 'zhajinhua', label: '拼三张' },
          ]}
          value={slug}
          onChange={onSlugChanged}
          optionType="button"
          buttonStyle="solid"
        />
        <Table
          rowKey={(report) => report.id}
          columns={columns}
          dataSource={reports}
          loading={loading}
          pagination={{
            position: ['none'],
          }}
        />
        <Space size="large">
          <Button type="primary" onClick={toFirstPage}>
            第一页
          </Button>
          <Button disabled={nextButtonDisabled} onClick={toNextPage}>
            下一页
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default ReportScreen;
