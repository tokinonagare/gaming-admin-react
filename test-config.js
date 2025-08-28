// 测试当前 webpack 配置中的环境变量
console.log('Testing environment variables from webpack DefinePlugin:');

// 这些值应该在 webpack DefinePlugin 中被定义
const config = {
    API_DOMAIN: process.env.REACT_APP_API_DOMAIN || 'NOT_DEFINED',
    STAGE: process.env.REACT_APP_STAGE || 'NOT_DEFINED',
    NAME: process.env.REACT_APP_NAME || 'NOT_DEFINED',
    VERSION: process.env.REACT_APP_VERSION || 'NOT_DEFINED',
};

console.log('Environment Configuration:');
Object.entries(config).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});

// 测试 API URL 构建
const testEndpoints = [
    '/avatar/stats',
    '/avatar/list',
    '/avatar/1/approve'
];

console.log('\nTest API URLs:');
testEndpoints.forEach(endpoint => {
    const fullUrl = `${config.API_DOMAIN}${endpoint}`;
    console.log(`  ${endpoint} -> ${fullUrl}`);
});

export default config;