import { BaseApi, AppConfig, ApiHeaderFactory } from '@shared/utils';
import { ReportDeserialize } from '../models/ReportDeserialize';

export class ReportRemote extends BaseApi {
  private static instance: ReportRemote;

  constructor() {
    super(AppConfig.ApiDomain);
  }

  static getInstance(): ReportRemote {
    if (!ReportRemote.instance) {
      ReportRemote.instance = new ReportRemote();
    }
    return ReportRemote.instance;
  }

  list = async (slug: string, nextPage: number, pageSize: number = 10) => {
    const { items, quantity } = await this.request({
      path: `/user_report/application_slug/${slug}?page_size=${pageSize}&next_page=${nextPage}`,
    });
    return { 
      reports: items.map((item: any) => new ReportDeserialize(item)), 
      total: quantity 
    };
  };

  handle = (reportId: string) => this.request({
    path: `/user_report/report/${reportId}/handle`,
    method: 'PUT',
    body: {
      reply: '',
    },
  });

  listUserReportedRecords = async (userId: string, nextPage: number = 1, pageSize: number = 10) => {
    const { items } = await this.request({
      path: `/user_report/reported_user/${userId}?next_page=${nextPage}&page_size=${pageSize}`,
    });
    return items.map((item: any) => new ReportDeserialize(item));
  };
}