import { Button, Form, Input, message, Modal, Upload } from 'antd';
import api from 'api';
import Avatar from 'components/Avatar';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/User/user.actions';
import { useSelector } from 'store';

import styles from './EditProfile.module.less';

interface IProps {
  afterClose: Function;
}

let avatarForm: FormData | null = null;

const EditProfileModal: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
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

    avatarForm = new FormData();
    avatarForm.append('file', info.file);
  };

  const handleCancle = () => setVisible(false);

  const saveProfile = () => {
    const formValues = form.getFieldsValue();
    setLoading(true);
    api
      .updateUserById(user.id, formValues)
      .then((res) => {
        dispatch(updateUser(res.data.user));
        setVisible(false);
      })
      .finally(() => setLoading(false));

    if (avatarForm) {
      api.uploadUserAvatar(user.id, avatarForm);
    }
  };

  return (
    <Modal
      className={styles['edit-profile']}
      title="Edit profile"
      visible={visible}
      onCancel={handleCancle}
      afterClose={() => props.afterClose()}
      footer={[
        <Button type="primary" shape="round" key="save" onClick={saveProfile} loading={loading}>
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
          // onChange={() => setAvatarChanged(true)}
        >
          <Avatar avatar={imageUrl} />
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
