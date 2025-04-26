import { Table, Button, Modal } from 'antd';
import type { TableProps } from 'antd';
import { Course, CourseStatus } from '../../libs/type';
import { COURSE_STATUS } from '../../libs/constant';
import { Link } from 'react-router-dom';
import { getCourseList, updateCourse } from '../../libs/api';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function CourseTable() {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState<Course>();

  useEffect(() => {
    getCourseList().then((res) => {
      setCourseList(res);
    });
  }, []);

  const handleUnpublish = (record: Course) => {
    setIsModalOpen(true);
    setRecord(record);
  };

  const handleOk = () => {
    async function urlToFile(url?: string): Promise<File> {
      const filename =
        url?.split('course_covers/').pop() || record?.id.toString() || '';
      const mimeType = filename?.split('.').pop();
      const response = await fetch(url || '');
      const blob = await response.blob();
      return new File([blob], filename, { type: mimeType });
    }
    if (record?.id) {
      urlToFile(record?.cover_image).then((file) => {
        updateCourse(record?.id, {
          ...record,
          status: COURSE_STATUS.OFFLINE,
          cover_image: file,
        }).then(() => {
          getCourseList().then((res) => {
            setCourseList(res);
          });
        });
      });
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<Course>['columns'] = [
    {
      title: '课程名称',
      dataIndex: 'name_simplified',
      key: 'name_simplified',
      render: (text: string, record: Course) => {
        return <Link to={`/b/course/edit/${record.id}`}>{text}</Link>;
      },
    },
    {
      title: '课程状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: CourseStatus) => {
        return (
          <div
            style={{
              color: status === COURSE_STATUS.ONLINE ? 'green' : 'red',
              border:
                status === COURSE_STATUS.ONLINE
                  ? '1px solid green'
                  : '1px solid red',
              padding: '2px 6px',
              borderRadius: '4px',
              width: 'fit-content',
              textAlign: 'center',
              backgroundColor:
                status === COURSE_STATUS.ONLINE
                  ? 'rgba(0, 128, 0, 0.1)'
                  : 'rgba(255, 0, 0, 0.1)',
            }}
          >
            {status === COURSE_STATUS.ONLINE ? '已上线' : '已下线'}
          </div>
        );
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
      render: (record: Course) => (
        <Button
          onClick={() => handleUnpublish(record)}
          style={{
            padding: 0,
          }}
          type="link"
        >
          下架
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table<Course> columns={columns} dataSource={courseList} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确定下架该课程吗？</p>
      </Modal>
    </>
  );
}
