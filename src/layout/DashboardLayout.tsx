import { Layout, Menu, MenuProps } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/BreadCrump';
import { UserOutlined } from '@ant-design/icons';

import { useState } from 'react';

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: '课程管理',
    icon: <UserOutlined />,
    children: [{ key: '1', label: '课程列表' }],
  },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate('/course');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={200}>
        <div className="text-white text-l p-5 pl-8 text-xl">AI Edu 工作台</div>
        <Menu
          theme="dark"
          onClick={onClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <div className="h-[60px] bg-white"></div>
        <div className="m-4">
          <Breadcrumb />
        </div>
        <Content className="p-4 bg-white ml-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
