import './Page.module.less';

import { Spin } from 'antd';
import Sidebar from 'components/Sidebar';
import React from 'react';

interface IProps {
  noSider?: boolean;
  loading?: boolean;
}

const Page: React.FC<IProps> = (props) => {
  const { noSider, loading = false } = props;
  return (
    <div styleName="container">
      <div styleName="menu">{!noSider && <Sidebar />}</div>
      <div styleName="content">
        <Spin spinning={loading}>{props.children}</Spin>
      </div>
    </div>
  );
};

export default Page;
