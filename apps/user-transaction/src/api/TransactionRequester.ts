import { BaseApi, AppConfig } from '@shared/utils';

export class TransactionRequester extends BaseApi {
  constructor() {
    super(AppConfig.ApiDomain);
  }

  queryWallet = async (userId: string) => {
    const result = await this.request({
      path: `/wallet/${userId}`,
    });
    return result;
  };

  listStatements = async (userId: string, nextPage: string = '', pageSize: number = 10) => {
    const _nextPage = nextPage ? `&next_page=${nextPage}` : '';
    const result = await this.request({
      path: `/wallet/${userId}/statement?page_size=${pageSize}${_nextPage}`,
    });
    return result;
  };

  listStatementsByCurrency = async (userId: string, currencyName: string, page: number = 1) => {
    const result = await this.request({
      path: `/wallet/${userId}/currency/${currencyName}/statement?page=${page}`,
    });
    return result;
  };
}