import React, { useState } from 'react';
import styles from './EditProfile.module.less';
import Avatar from 'components/Avatar';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/User/user.actions';
import { Modal, Button, Input, Upload, message, Form } from 'antd';
import api from 'api';

interface IProps {
  afterClose: Function;
}

const EditProfileModal: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [visible, setVisible] = useState(true);
  const [imageUrl, setImageUrl] = useState(user.avatar);
  const [form] = Form.useForm();

  const getBase64 = (img: any, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: File) => {
    const imgTypes = ['image/jpeg', 'image/png', 'image/vnd.microsoft.icon'];
    const isValidImg = imgTypes.includes(file.type);
    if (!isValidImg) {
      message.error('You can only upload JPG/PNG/ICO file!');
    }

    const isInSizeLimit = file.size / 1024 / 1024 < 0.5;
    if (!isInSizeLimit) {
      message.error('Image must smaller than 100 KB!');
    }
    return isValidImg && isInSizeLimit;
  };

  const onRequest = (info: any) => {
    getBase64(info.file, (imageUrl: string) => {
      setImageUrl(imageUrl);
    });
  };

  const handleCancle = () => setVisible(false);
  const saveProfile = () => {
    const userData = { ...form.getFieldsValue(), avatar: imageUrl };
    api.updateUserById(user.id, userData).then((res) => {
      dispatch(updateUser(res.data.user));
      setVisible(false);
    });
  };

  return (
    <Modal
      className={styles['edit-profile']}
      title="Edit profile"
      visible={visible}
      onCancel={handleCancle}
      afterClose={() => props.afterClose()}
      footer={[
        <Button type="primary" shape="round" key="save" onClick={saveProfile}>
          Save
        </Button>,
      ]}
    >
      <div styleName="avatar-container">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={onRequest}
          beforeUpload={beforeUpload}
        >
          <Avatar src={imageUrl} />
        </Upload>
      </div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          name: user.name,
          bio: user.bio,
          location: user.location,
          website: user.website,
        }}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Bio" name="bio">
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
