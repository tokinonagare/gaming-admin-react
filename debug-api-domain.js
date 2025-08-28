// 临时调试脚本来检查API域名
console.log('Environment Variables:');
console.log('REACT_APP_API_DOMAIN:', process.env.REACT_APP_API_DOMAIN);
console.log('REACT_APP_STAGE:', process.env.REACT_APP_STAGE);

// 导入AppConfig来检查
try {
  const { AppConfig } = require('./libs/shared/utils/src/constants/AppConfig.ts');
  console.log('AppConfig.ApiDomain:', AppConfig?.ApiDomain);
} catch (e) {
  console.log('Cannot load AppConfig:', e.message);
}