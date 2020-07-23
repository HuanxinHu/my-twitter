import { Button, Input, Modal } from 'antd';
import api from 'api';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCommentModalVisible } from 'redux/Comment/comment.actions';
import { getUserProfile } from 'redux/User/user.actions';
import { useSelector } from 'store';
import { splitPathname } from 'utils/util';

import styles from './CommentModal.module.less';

interface IProps {
  afterClose?: Function;
}

const CommentModal: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [content, setContent] = useState('');
  const commentForTweet = useSelector((state) => state.comment.commentForTweet);
  const me = useSelector((state) => state.user.me);

  function handleCancle() {
    setVisible(false);
  }

  function handleOk() {
    setVisible(false);
  }

  function handleAfterClose() {
    dispatch(setCommentModalVisible(false));
    props.afterClose && props.afterClose();
  }

  function handleReply() {
    const { isMyProfilePath, paths } = splitPathname();
    const username = isMyProfilePath ? me.username : paths[1];

    api.commentTweetById(commentForTweet.id, content).then(() => {
      setVisible(false);
      if (isMyProfilePath) {
        dispatch(getUserProfile(username));
      }
    });
  }

  return (
    <Modal
      className={styles['create-comment']}
      visible={visible}
      onCancel={handleCancle}
      onOk={handleOk}
      afterClose={handleAfterClose}
      footer={[
        <Button key="ok" type="primary" shape="round" onClick={handleReply}>
          Reply
        </Button>,
      ]}
    >
      <div>{commentForTweet.content}</div>
      <Input.TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoSize={{ maxRows: 24, minRows: 4 }}
        placeholder="Tweet your reply"
      />
    </Modal>
  );
};

export default CommentModal;
