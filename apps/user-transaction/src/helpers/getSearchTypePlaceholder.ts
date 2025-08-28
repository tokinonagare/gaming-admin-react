export const getSearchTypePlaceholder = (searchBy: string): string => {
  switch (searchBy) {
    case 'phoneNumber':
      return '请输入电话号码';
    case 'username':
      return '请输入用户名';
    case 'userId':
      return '请输入用户ID';
    default:
      return '请输入搜索内容';
  }
};