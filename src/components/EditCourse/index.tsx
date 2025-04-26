import type { FormProps } from 'antd';
import { Button, Form, Input, Radio, Space } from 'antd';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COURSE_STATUS } from '../../libs/constant';
import ImageUpload from '../ImageUpload';
import { createCourse } from '../../libs/api';

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

export default function EditCourse({ id }: { id?: string }) {
  const navigate = useNavigate();
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    createCourse({
      name_simplified: values.simplifiedName,
      name_traditional: values.traditionalName,
      name_english: values.englishName,
      cover_image: coverFile,
      description_simplified: values.simplifiedDescription,
      description_traditional: values.traditionalDescription,
      description_english: values.englishDescription,
      status: values.status,
    });
  };

  useEffect(() => {
    if (id) {
      console.log(id);
    }
  }, [id]);

  const data = {
    simplifiedName: 'AI教育',
    traditionalName: 'AI教育',
    englishName: 'AI Education',
    coverImage:
      'https://img.88tph.com/87/c9/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true',
    simplifiedDescription: 'AI教育',
    status: COURSE_STATUS.OFFLINE,
  };

  return (
    <Form
      name="basic"
      style={{ maxWidth: 500 }}
      initialValues={data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label={null}>
        <Space>
          <Button onClick={() => navigate('/b/course')}>返回</Button>

          <Button type="primary" htmlType="submit">
            保存
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
        <ImageUpload
          //@ts-ignore
          onChange={(file) => setCoverFile(file)}
          coverImage={data.coverImage}
        />
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
