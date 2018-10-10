// @flow

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getColor } from '../utils/getColor';

type Props = {
  className?: string,
  value: string,
}

const TextAvatar = (props: Props) => (
  <Avatar alt={props.value} className={props.className} style={{ backgroundColor: getColor(props.value)}}>
    {props.value.substring(0, 2)}
  </Avatar>
);

export default TextAvatar
