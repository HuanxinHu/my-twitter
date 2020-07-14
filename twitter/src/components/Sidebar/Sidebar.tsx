import styles from "./Sidebar.module.less";

import { HomeOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { Fragment, useState } from "react";
import CreateTweetModal from "components/CreateTweetModal/CreateTweet.modal";
import logo from "assets/images/logo.png";
import MenuItem from "./MenuItem";

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
  const handleCreateTweet = () => setTweetModalVisible(true);

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
    </div>
  );
};

export default Sidebar;
