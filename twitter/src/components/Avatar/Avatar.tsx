import './Avatar.module.less';
import React from 'react';
import defaultAvatar from 'assets/images/avatar.png';

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
