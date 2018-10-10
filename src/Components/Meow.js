// @flow

import React from 'react';
import Avatar from '@material-ui/core/Avatar';

type Props = {
  className?: string,
}

const Meow = (props: Props) => (
  <Avatar alt="Meow!" className={props.className} src="./assets/favicon.jpg"/>
);

export default Meow;
