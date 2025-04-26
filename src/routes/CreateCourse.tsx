import ImageUpload from '../components/ImageUpload';
import { COURSE_STATUS } from '../libs/constant';
import type { FormProps } from 'antd';
import { Button, Form, Input, Radio, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;

type FieldType = {
  simplifiedName?: string;
  traditionalName?: string;
  englishName?: string;
  simplifiedDescription?: string;
  traditionalDescription?: string;
  englishDescription?: string;
  coverImage?: string;
  status?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function CreateCourse() {
  const navigate = useNavigate();
  //@ts-ignore
  const [coverFile, setCoverFile] = useState<string | null>(null);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('🚀 ~ CreateCourse ~ values:', values);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label={null}>
        <Space>
          <Button onClick={() => navigate('/course')}>返回</Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Space>
      </Form.Item>

      <Form.Item<FieldType>
        label="课程名称"
        name="simplifiedName"
        rules={[{ required: true, message: '请输入课程中文简体名称' }]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item<FieldType>
        label="课程名称"
        name="traditionalName"
        rules={[{ required: true, message: '请输入课程中文繁体名称' }]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item<FieldType>
        label="课程名称"
        name="englishName"
        rules={[{ required: true, message: '请输入课程英文名称' }]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item<FieldType>
        label="课程封面"
        name="coverImage"
        rules={[{ required: true, message: '请上传课程封面' }]}
      >
        <ImageUpload onChange={(file) => setCoverFile(file)} />
      </Form.Item>

      <Form.Item<FieldType>
        label="课程简介"
        name="simplifiedDescription"
        rules={[{ required: false, message: '请输入课程简介' }]}
      >
        <TextArea
          rows={4}
          placeholder="请输入300字以内课程简介"
          maxLength={300}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="课程简介"
        name="traditionalDescription"
        rules={[{ required: false, message: '请输入课程简介' }]}
      >
        <TextArea
          rows={4}
          placeholder="请输入300字以内课程简介"
          maxLength={300}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="课程简介"
        name="englishDescription"
        rules={[{ required: false, message: '请输入课程简介' }]}
      >
        <TextArea
          rows={4}
          placeholder="请输入300字以内课程简介"
          maxLength={300}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="课程状态"
        name="status"
        rules={[{ required: true, message: '请选择课程状态' }]}
      >
        <Radio.Group buttonStyle="solid" defaultValue={COURSE_STATUS.ONLINE}>
          <Radio.Button defaultChecked value={COURSE_STATUS.ONLINE}>
            上架
          </Radio.Button>
          <Radio.Button value={COURSE_STATUS.OFFLINE}>下架</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}
