import request from './request';

// 登录接口
export function login(username: string, password: string) {
  return request
    .post('/api-token-auth/', {
      username,
      password,
    })
    .then((res: any) => {
      localStorage.setItem('auth_token', res.data.token); // 保存 token
      return res;
    });
}
