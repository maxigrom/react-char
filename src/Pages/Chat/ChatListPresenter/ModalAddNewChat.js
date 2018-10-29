// @flow
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modal: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    width: `50%`,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onCreate: () => void,
};

type State = {
  title: string;
}

class ModalAddNewChat extends React.Component<Props, State> {
  props: Props;

  state = {
    title: '',
  };

  handleOnClickCreate = () => {
    this.props.onCreate(this.state.title);
  };

  handleOnChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleOnCloseModal = () => {
    this.setState({
      title: '',
    });

    this.props.onClose();
  };

  render() {
    const { title } = this.state;
    const { isOpen, classes } = this.props;

    return (
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={isOpen}
        onClose={this.handleOnCloseModal}
      >
        <div className={`${classes.paper} ${classes.modal}`}>
          <Typography variant='title' id='modal-title'>
            Create new chat
          </Typography>
          <Grid container direction='column'>
            <Grid item xs>
              <Input fullWidth placeholder='Enter the title...' value={title} onChange={this.handleOnChangeTitle} />
            </Grid>
            <Grid item xs>
              <Button variant='contained' color='primary' className={classes.button} onClick={this.handleOnClickCreate}>
                Create
              </Button>
              <Button variant='contained' className={classes.button} onClick={this.handleOnCloseModal}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  };
}

export default withStyles(styles)(ModalAddNewChat);
