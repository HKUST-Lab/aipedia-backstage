import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useMatches, Link, useMatch, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
  const location = useLocation();

  const isList = useMatch('/course');
  const isCreate = useMatch('/course/create');
  const isEdit = useMatch('/course/edit/:id');

  const items = [{ title: '课程管理' }] as { title: string; href?: string }[];

  if (isList || isCreate || isEdit) {
    items.push({ title: '课程列表' });
  }

  if (isCreate) {
    items.push({ title: '创建课程' });
  }

  if (isEdit) {
    items.push({ title: '课程详情' });
  }

  return <AntdBreadcrumb items={items} />;
}
