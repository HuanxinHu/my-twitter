import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import styles from './CreateTweet.module.less';
import { useDispatch } from 'react-redux';
import { getTweetsByUserId } from 'redux/User/user.actions';
import { useSelector } from 'store';
import api from 'api';

interface IProps {
  afterClose: Function;
}

const CreateTweetModal: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.user.user);

  const handleCancle = () => setVisible(false);

  const handleOk = () => {
    setVisible(false);
  };

  const handleTweet = () => {
    api.createTweet(user.id, { content }).then(() => {
      setVisible(false);
      dispatch(getTweetsByUserId());
    });
  };

  return (
    <Modal
      className={styles['create-tweet']}
      visible={visible}
      onCancel={handleCancle}
      onOk={handleOk}
      afterClose={() => props.afterClose()}
      footer={[
        <Button key="ok" type="primary" shape="round" onClick={handleTweet}>
          Tweet
        </Button>,
      ]}
    >
      <Input.TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoSize={{ maxRows: 24, minRows: 4 }}
        placeholder="What's happening?"
      />
    </Modal>
  );
};

export default CreateTweetModal;
