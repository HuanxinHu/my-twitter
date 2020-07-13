import styles from "./Sidebar.module.less";

import { HomeOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { Fragment } from "react";
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
      <Button type="primary" styleName="twt-btn" shape="round">
        Tweet
      </Button>
      <Button
        type="primary"
        styleName="twt-btn-circle"
        shape="circle"
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export default Sidebar;
