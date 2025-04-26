import axios from 'axios';

// 创建实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, // 请求超时设置
});

// 请求拦截器：在发送请求前自动带上 token
request.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('auth_token'); // 从本地取出 token
    if (token) {
      config.headers['Authorization'] = `Token ${token}`; // 关键写法
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 响应拦截器：可以统一处理错误
request.interceptors.response.use(
  (response: any) => response.data,
  (error: any) => {
    console.error('请求出错:', error);
    return Promise.reject(error);
  },
);

export default request;
