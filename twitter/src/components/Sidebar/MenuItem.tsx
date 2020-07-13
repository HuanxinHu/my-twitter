import styles from "./Sidebar.module.less";

import React from "react";
import { useHistory } from "react-router-dom";

interface IProps {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const MenuItem: React.FC<IProps> = (props) => {
  const history = useHistory();
  const handleClick = () => history.push(props.path);

  return (
    <div className={styles["menu-item"]} onClick={handleClick}>
      <span className={styles["menu-icon"]}>{props.icon}</span>
      <span className={styles["menu-title"]}>{props.title}</span>
    </div>
  );
};

export default MenuItem;
