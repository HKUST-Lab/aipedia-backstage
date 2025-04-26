import { Layout, Menu, MenuProps } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/BreadCrump';
import { UserOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { login } from '../libs/api';

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

  useEffect(() => {
    login('test', '123');
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={200}>
        <div
          style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
        >
          AI Edu 工作台
        </div>
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
        <div style={{ height: '60px', backgroundColor: 'white' }}></div>
        <div style={{ margin: '16px' }}>
          <Breadcrumb />
        </div>
        <Content style={{ padding: '16px', backgroundColor: 'white' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
