import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const isValidFormat = (file: File) => {
  const validTypes = ['image/jpeg', 'image/png'];
  return validTypes.includes(file.type);
};

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type="button">
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </button>
);

const customRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

const beforeUpload = (file: File) => {
  const isImage = isValidFormat(file);
  const isLt10M = file.size / 1024 / 1024 < 10;
  const isGt1M = file.size / 1024 / 1024 > 1;

  if (!isImage) {
    message.error('图片格式非JPG/PNG，请重新上传');
    return Upload.LIST_IGNORE;
  }

  // if (!isGt1M) {
  //   message.error('图片过小（≤1MB），请重新上传');
  //   return Upload.LIST_IGNORE;
  // }

  if (!isLt10M) {
    message.error('图片过大（≥10MB），请重新上传');
    return Upload.LIST_IGNORE;
  }

  return true;
};

export default function ImageUpload({
  onChange,
  coverImage,
}: {
  onChange: (file: string | null) => void;
  coverImage?: string;
}) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [coverImageSrc, setCoverImageSrc] = useState<string | undefined>();

  const handleChange = (info: any) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // 只保留一个
    setFileList(newFileList);

    if (info.file.status === 'done' && info.file.originFileObj) {
      getBase64(info.file.originFileObj)
        .then((base64) => {
          onChange(base64);
        })
        .catch((err) => {
          message.error('文件读取失败，请重新上传');
          onChange(null);
        });
    } else if (info.file.status === 'removed') {
      onChange(null);
    }
  };

  useEffect(() => {
    if (coverImage) {
      setCoverImageSrc(coverImage);
    }
  }, [coverImage]);

  const handleRemove = () => {
    setFileList([]);
    setCoverImageSrc(undefined);
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        maxCount={1}
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        onRemove={handleRemove}
        showUploadList={{ showPreviewIcon: false }}
      >
        {coverImageSrc && fileList.length === 0 ? (
          <Image src={coverImageSrc} width={100} height={100} preview={false} />
        ) : fileList.length === 1 ? null : (
          uploadButton
        )}
      </Upload>
    </>
  );
}
