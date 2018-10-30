// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(192, 192, 192, 0.5)',
    zIndex: 9999,
  },
};

const loadingIconStyles = {
  position: 'absolute',
  top: 'calc(50% - 20px)',
  left: 'calc(50% - 20px)',
};

type Props = {
  width?: number,
  height?: number,
  loading?: boolean,
};

const Loading = (props: Props) => {
  const { width, height, loading, classes } = props;
  if (!loading) return null;

  const wrapperStyle = {
    width: width || null,
    right: width ? null : 0,

    height: height || null,
    bottom: height ? null : 0,
  };

  return (
    <div className={classes.wrapper} style={wrapperStyle}>
      <CircularProgress style={loadingIconStyles} color='secondary' />
    </div>
  );
};

export default withStyles(styles)(Loading);
