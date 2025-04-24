import CourseTable from '../components/CourseTable';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function CourseList() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('/course/create')} type="primary">
        新建课程
      </Button>
      <CourseTable />
    </div>
  );
}
