import request from './request';

// 登录接口
export function login(username: string, password: string) {
  return request
    .post('/api-token-auth/', {
      username,
      password,
    })
    .then((res: any) => {
      localStorage.setItem('auth_token', res.token); // 保存 token
      return res;
    });
}

// 获取课程列表
export function getCourseList(): Promise<any[]> {
  return request.get('/api/courses/', {
    headers: {
      Authorization: `Token ${localStorage.getItem('auth_token')}`,
    },
  });
}

// 课程详情
export function getCourseDetail(id: string): Promise<any[]> {
  return request.get(`/api/courses/${id}/logs/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('auth_token')}`,
    },
  });
}
// 创建课程
export function createCourse(data: any) {
  console.log('🚀 ~ createCourse ~ data:', data);

  return request.post('/api/courses/', data, {
    headers: {
      Authorization: `Token ${localStorage.getItem('auth_token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}
