import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { CourseStatus } from '../../libs/type';
import { COURSE_STATUS } from '../../libs/constant';
import { Link } from 'react-router-dom';
interface DataType {
  id: string;
  name: string;
  status: CourseStatus;
  createTime: string;
}
export default function CourseTable() {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: DataType) => {
        return <Link to={`/course/edit/${record.id}`}>{text}</Link>;
      },
    },
    {
      title: '课程状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: CourseStatus) => {
        return status === COURSE_STATUS.ONLINE ? '已上线' : '已下线';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">下架</Button>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      id: '1',
      name: '课程1',
      status: 1,
      createTime: '2021-01-01',
    },
    {
      id: '2',
      name: '课程2',
      status: 2,
      createTime: '2021-01-01',
    },
  ];
  return <Table<DataType> columns={columns} dataSource={data} />;
}
