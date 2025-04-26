import { useParams } from 'react-router-dom';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import EditCourse from '../components/EditCourse';
import { useEffect, useState } from 'react';
import { getCourseDetail } from '../libs/api';

export default function CourseDetail() {
  const { id } = useParams();

  const [courseDetail, setCourseDetail] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getCourseDetail(id).then((res) => {
        setCourseDetail(res[0].data);
      });
    }
  }, [id]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本信息',
      children: <EditCourse courseDetail={courseDetail} />,
    },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* <Image width={160} height={90} src="/assets/cover.jpg" /> */}
        <section>{courseDetail?.name_simplified}</section>
      </div>
      <div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
}
