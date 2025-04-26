import ImageUpload from '../components/ImageUpload';
import { COURSE_STATUS } from '../libs/constant';
import type { FormProps } from 'antd';
import { Button, Form, Input, Radio, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../libs/api';
import { Course } from '../libs/type';
const { TextArea } = Input;

const onFinishFailed: FormProps<Course>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function CreateCourse() {
  const navigate = useNavigate();
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const onFinish: FormProps<Course>['onFinish'] = (values) => {
    createCourse({
      name_simplified: values.name_simplified,
      name_traditional: values.name_traditional,
      name_english: values.name_english,
      cover_image: coverFile,
      description_simplified: values.description_simplified,
      description_traditional: values.description_traditional,
      description_english: values.description_english,
      status: values.status,
    }).then(() => {
      navigate('/b/course');
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ status: COURSE_STATUS.ONLINE }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label={null}>
        <Space>
          <Button onClick={() => navigate('/b/course')}>返回</Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Space>
      </Form.Item>

      <Form.Item<Course>
        label="课程名称"
        name="name_simplified"
        rules={[{ required: true, message: '请输入课程中文简体名称' }]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item<Course>
        label="课程名称"
        name="name_traditional"
        rules={[{ required: true, message: '请输入课程中文繁体名称' }]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item<Course>
        label="课程名称"
        name="name_english"
        rules={[{ required: true, message: '请输入课程英文名称' }]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item<Course>
        label="课程封面"
        name="cover_image"
        rules={[{ required: true, message: '请上传课程封面' }]}
      >
        <ImageUpload onChange={(file) => setCoverFile(file)} />
      </Form.Item>

      <Form.Item<Course>
        label="课程简介"
        name="description_simplified"
        rules={[{ required: false, message: '请输入课程简介' }]}
      >
        <TextArea
          rows={4}
          placeholder="请输入300字以内课程简介"
          maxLength={300}
        />
      </Form.Item>

      <Form.Item<Course>
        label="课程简介"
        name="description_traditional"
        rules={[{ required: false, message: '请输入课程简介' }]}
      >
        <TextArea
          rows={4}
          placeholder="请输入300字以内课程简介"
          maxLength={300}
        />
      </Form.Item>

      <Form.Item<Course>
        label="课程简介"
        name="description_english"
        rules={[{ required: false, message: '请输入课程简介' }]}
      >
        <TextArea
          rows={4}
          placeholder="请输入300字以内课程简介"
          maxLength={300}
        />
      </Form.Item>

      <Form.Item<Course>
        label="课程状态"
        name="status"
        rules={[{ required: true, message: '请选择课程状态' }]}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button defaultChecked value={COURSE_STATUS.ONLINE}>
            上架
          </Radio.Button>
          <Radio.Button value={COURSE_STATUS.OFFLINE}>下架</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}
