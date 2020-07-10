import "./Page.module.less";
import React from "react";
import Sidebar from "components/Sidebar";

interface IProps {
  noSider?: boolean;
}

const Page: React.FC<IProps> = (props) => {
  const { noSider } = props;
  return (
    <div styleName="container">
      <div styleName="menu">{!noSider && <Sidebar />}</div>
      <div styleName="content">{props.children}</div>
    </div>
  );
};

export default Page;
