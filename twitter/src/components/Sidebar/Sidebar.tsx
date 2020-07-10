import styles from "./Sidebar.module.less";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
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
    </div>
  );
};

export default Sidebar;
