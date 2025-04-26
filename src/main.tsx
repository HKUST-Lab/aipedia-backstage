import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { ConfigProvider } from 'antd';

import DashboardLayout from './layout/DashboardLayout.tsx';
import CourseList from './routes/CourseList.tsx';
import CourseDetail from './routes/CouresDetail.tsx';
import CreateCourse from './routes/CreateCourse.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/b" replace />,
  },
  {
    path: '/b',
    element: <DashboardLayout />,
    handle: { breadcrumb: '课程管理' },
    children: [
      {
        index: true,
        element: <Navigate to="course" replace />,
      },
      {
        path: 'course',
        element: <CourseList />,
        handle: { breadcrumb: '课程列表' },
      },
      {
        path: 'course/create',
        element: <CreateCourse />,
        handle: { breadcrumb: '创建课程' },
      },
      {
        path: 'course/edit/:id',
        element: <CourseDetail />,
        handle: { breadcrumb: '课程详情' },
      },
    ],
  },
]);

const themeConfig = {
  token: {
    // colorTextBase: '#fff', // 文字颜色
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
);
