import React from "react";
import ImgCrop from "antd-img-crop";
import { Form, Upload, Button } from "antd";

function beforeUpload(file) {
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error("File size must be smaller than 5 MB");
  }
  return file.size / 1024 / 1024 < 5 ? true : Upload.LIST_IGNORE;
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function dummyRequest({ file, onSuccess }) {
  onSuccess("ok");
  console.log(file);
}

const ImageCrop = () => {
  return (
    <div>
      <Form style={{ marginTop: "100px" }} onFinish={(e) => console.log(e)}>
        <Form.Item name="announcementImage" label="Image">
          <ImgCrop aspect={278 / 278} quality={0.994}>
            <Upload beforeUpload={beforeUpload} maxCount={1} customRequest={dummyRequest} accept=".jpg, .jpeg, .png">
              <Button type="primary">Select File</Button>
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ImageCrop;
