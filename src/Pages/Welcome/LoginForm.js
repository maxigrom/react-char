// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type Props = {};
type State = {
  userName: string,
  password: string,
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing.sm,
    width: '100%',
  },
  submitButton: {
    margin: theme.spacing.sm,
    width: '100%',
  }
});

class LoginForm extends React.Component<Props, State> {
  props: Props;

  state: State = {
    userName: '',
    password: '',
  };

  handleOnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  };

  render = () => {
    const { classes } = this.props;
    const { userName, password } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          name="userName"
          label="User Name"
          className={classes.textField}
          value={userName}
          onChange={this.handleOnChange}
          margin="normal"
        />
        <TextField
          name="password"
          label="Password"
          className={classes.textField}
          value={password}
          onChange={this.handleOnChange}
          margin="normal"
          type="password"
        />
        <Button variant="contained" color="primary" className={classes.submitButton}>
          Log in
        </Button>
      </form>
    );
  };
}

export default withStyles(styles)(LoginForm);
