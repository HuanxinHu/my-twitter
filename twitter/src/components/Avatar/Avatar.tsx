import './Avatar.module.less';

import defaultAvatar from 'assets/images/avatar.png';
import React from 'react';

interface IProps {
  src?: string;
  size?: 'default' | 'small';
}

const sizeClassMap = {
  default: '',
  small: 'small',
};

const Avatar: React.FC<IProps> = ({ src = defaultAvatar, size = 'default' }) => {
  const styleName = `avatar ${sizeClassMap[size]}`;
  return <img src={src || defaultAvatar} alt="avatar" styleName={styleName} />;
};

export default Avatar;
