// @flow
import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/es/Typography/Typography';
import Paper from '@material-ui/core/es/Paper/Paper';
import withStyles from '@material-ui/core/es/styles/withStyles';

const styles = theme => ({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(192, 192, 192, 0.5)',
    zIndex: 9999,
  },
  wrapperCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    bottom: 0,
    right: 0,
  },
  center: {
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'translate(-50%, -50%)',
  },
  paper: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },
});

const loadingIconStyles = {
  position: 'relative',
  top: '0',
  left: 'calc(50% - 20px)',
};

type Props = {
  width?: number,
  height?: number,
  loading?: boolean,
  message?: string,

  classes?: Object,
};

const Loading = (props: Props) => {
  const {
    width, height, loading, message, classes,
  } = props;
  if (!loading) return null;

  const wrapperStyle = {
    width: width || null,
    right: width ? null : 0,

    height: height || null,
    bottom: height ? null : 0,
  };

  return (
    <div className={classes.wrapper} style={wrapperStyle}>
      <div className={classes.wrapperCenter}>
        <div className={classes.center}>
          <CircularProgress style={loadingIconStyles} color="secondary" />
          {message && (
            <Paper className={classes.paper} elevation={1}>
              <Typography color="secondary" component="p" variant="display1">
                {message}
              </Typography>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Loading);
