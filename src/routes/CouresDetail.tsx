import { useParams } from 'react-router-dom';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import EditCourse from '../components/EditCourse';

export default function CourseDetail() {
  const { id } = useParams();
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本信息',
      children: <EditCourse id={id} />,
    },
  ];
  return (
    <div>
      <div className="flex gap-2">
        {/* <Image width={160} height={90} src="/assets/cover.jpg" /> */}
        <section>daddsjndsk</section>
      </div>
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
}
