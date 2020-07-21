import './Avatar.module.less';

import defaultAvatar from 'assets/images/avatar.png';
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
  const src = avatar ? (avatar.startsWith('data:image/') ? avatar : `${relativePath}/${avatar}`) : defaultAvatar;

  return <img src={src} alt="avatar" styleName={styleName} />;
};

export default React.memo(Avatar);
