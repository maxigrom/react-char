// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  buttonAdd: {
    position: 'absolute',
    bottom: theme.mixins.toolbar.minHeight + theme.spacing.sm,
    right: theme.spacing.md,
  },
});

type Props = {
  onClick: () => void,

  classes?: Object,
};

const ButtonAddChat = (props: Props) => {
  const { classes } = props;

  return (
    <Button variant="fab" color="primary" aria-label="Add" className={classes.buttonAdd} onClick={props.onClick}>
      <AddIcon />
    </Button>
  );
};

export default withStyles(styles)(ButtonAddChat);
