import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { CourseStatus } from '../../libs/type';
import { COURSE_STATUS } from '../../libs/constant';
import { Link } from 'react-router-dom';
import { getCourseList } from '../../libs/api';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface DataType {
  id: string;
  name: string;
  status: CourseStatus;
  createTime: string;
}
export default function CourseTable() {
  const [courseList, setCourseList] = useState<DataType[]>([]);

  useEffect(() => {
    getCourseList().then((res) => {
      setCourseList(res);
    });
  }, []);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '课程名称',
      dataIndex: 'name_simplified',
      key: 'name_simplified',
      render: (text: string, record: DataType) => {
        return <Link to={`/b/course/edit/${record.id}`}>{text}</Link>;
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
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link">下架</Button>
        </Space>
      ),
    },
  ];

  return <Table<DataType> columns={columns} dataSource={courseList} />;
}
