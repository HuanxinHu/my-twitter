import { HomeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import logo from "assets/images/logo.png";
import CommentModal from "components/CommentModal";
import CreateTweetModal from "components/CreateTweetModal";
import EditProfileModal from "components/EditProfileModal";
import React, { Fragment, useState } from "react";
import { useSelector } from "store";

import MenuItem from "./MenuItem";
import styles from "./Sidebar.module.less";

const Sidebar: React.FC = () => {
  const menu = [
    {
      icon: <HomeOutlined />,
      title: "Home",
      path: "/",
    },
    {
      icon: <UserOutlined />,
      title: "Profile",
      path: "/profile",
    },
  ];
  const [tweetModalVisible, setTweetModalVisible] = useState(false);
  const commentModalVisible = useSelector(
    (state) => state.comment.commentModalVisible
  );
  const editProfileModalVisible = useSelector(
    (state) => state.user.editProfileModalVisible
  );

  function handleCreateTweet() {
    setTweetModalVisible(true);
  }

  return (
    <div styleName="sidebar">
      <div className={styles["logo"]}>
        <img src={logo} alt="logo" />
      </div>
      <Fragment>
        {menu.map((item) => (
          <MenuItem key={item.title} {...item} />
        ))}
      </Fragment>
      <Button
        type="primary"
        styleName="twt-btn"
        shape="round"
        onClick={handleCreateTweet}
      >
        Tweet
      </Button>
      <Button
        onClick={handleCreateTweet}
        type="primary"
        styleName="twt-btn-circle"
        shape="circle"
        icon={<PlusOutlined />}
      />
      {tweetModalVisible && (
        <CreateTweetModal
          afterClose={() => {
            setTweetModalVisible(false);
          }}
        />
      )}

      {commentModalVisible && <CommentModal />}

      {editProfileModalVisible && <EditProfileModal />}
    </div>
  );
};

export default Sidebar;
