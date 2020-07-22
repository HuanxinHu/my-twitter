import './Avatar.module.less';

import React from 'react';

interface IProps {
  avatar?: string;
  size?: 'default' | 'small';
}

const sizeClassMap = {
  default: '',
  small: 'small',
};

const Avatar: React.FC<IProps> = ({ avatar, size = 'default' }) => {
  const styleName = `avatar ${sizeClassMap[size]}`;
  const relativePath = process.env.NODE_ENV === 'production' ? 'uploads' : 'http://localhost:5001/uploads';

  if (avatar) {
    const src = avatar.startsWith('data:image/') ? avatar : `${relativePath}/${avatar}`;
    return <img src={src} alt="avatar" styleName={styleName} />;
  } else {
    return <div styleName="avatar"></div>;
  }
};

export default React.memo(Avatar);
