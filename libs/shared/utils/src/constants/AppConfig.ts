interface AppConfigType {
    AppName: string;
    Stage: string;
    ApiDomain: string;
    Version: string;
}

// 这里使用环境变量或配置文件来管理不同环境的配置
const AppConfig: AppConfigType = {
    AppName: process.env.REACT_APP_NAME || 'Gaming Admin',
    Stage: process.env.REACT_APP_STAGE || 'development',
    ApiDomain: process.env.REACT_APP_API_DOMAIN || 'http://localhost:3000/api',
    Version: process.env.REACT_APP_VERSION || '1.0.0',
};

export default AppConfig;