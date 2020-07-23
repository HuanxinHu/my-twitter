import { Button, Input, Modal } from 'antd';
import api from 'api';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from 'redux/User/user.actions';
import { useSelector } from 'store';
import { splitPathname } from 'utils/util';

import styles from './CreateTweet.module.less';

interface IProps {
  afterClose: Function;
}

const CreateTweetModal: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [content, setContent] = useState('');
  const me = useSelector((state) => state.user.me);

  function handleCancle() {
    setVisible(false);
  }

  function handleAfterClose() {
    props.afterClose();
  }

  function handleOk() {
    setVisible(false);
  }

  function handleTweet() {
    const { isMyProfilePath } = splitPathname();
    api.createTweet(me.id, { content }).then(() => {
      setVisible(false);
      if (isMyProfilePath) {
        dispatch(getUserProfile(me.username));
      }
    });
  }

  return (
    <Modal
      className={styles['create-tweet']}
      visible={visible}
      onCancel={handleCancle}
      onOk={handleOk}
      afterClose={handleAfterClose}
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
