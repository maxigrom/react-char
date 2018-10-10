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
    flexDirection: 'column',
  },
  passwords: {
    display: 'flex',
    flexDirection: 'row',
  },
  textField: {
    flex: '1 1 auto',
    margin: theme.spacing.sm,
  },
  submitButton: {
    flex: '1 1 auto',
    margin: theme.spacing.sm,
  },
});

class SignUpForm extends React.Component<Props, State> {
  props: Props;

  state: State = {
    userName: '',
    password: '',
    passwordRepeat: '',
  };

  handleOnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render = () => {
    const { classes } = this.props;
    const { userName, password, passwordRepeat } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          name='userName'
          label='User Name'
          className={classes.textField}
          value={userName}
          onChange={this.handleOnChange}
          margin='normal'
        />
        <div className={classes.passwords}>
          <TextField
            name='password'
            label='Password'
            className={classes.textField}
            value={password}
            onChange={this.handleOnChange}
            margin='normal'
            type='password'
          />
          <TextField
            name='passwordRepeat'
            label='Repeat Password'
            className={classes.textField}
            value={passwordRepeat}
            onChange={this.handleOnChange}
            margin='normal'
            type='password'
          />
        </div>
        <Button variant='contained' color='primary' className={classes.submitButton}>
          Sign up
        </Button>
      </form>
    );
  };
}

export default withStyles(styles)(SignUpForm);
