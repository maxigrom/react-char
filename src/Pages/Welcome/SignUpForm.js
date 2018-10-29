// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import type { TLoginUser } from '../../Types/TLoginUser';
import type { TValueWithError } from '../../Models/ValueWithError';
import { newValueWithError } from '../../Models/ValueWithError';
import { Redirect } from 'react-router-dom';

type Props = {|
  classes: Object,
  onSignUp: (user: TLoginUser) => void,
  redirectToChat: boolean,
|};

type State = {|
  userName: TValueWithError<string>,
  password: TValueWithError<string>,
  passwordRepeat: TValueWithError<string>,
|};

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
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  submitButton: {
    flex: '1 1 auto',
    margin: theme.spacing.sm,
  },
});

class SignUpForm extends React.Component<Props, State> {
  props: Props;

  state: State = {
    userName: newValueWithError(''),
    password: newValueWithError(''),
    passwordRepeat: newValueWithError(''),
  };

  handleOnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.persist();

    this.setState({
      [e.currentTarget.name]: {
        value: e.currentTarget.value,
      },
    });
  };

  handleOnSignUp = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await this.validateForm();
    if (!isValid) return;

    this.props.onSignUp({
      username: this.state.userName.value,
      password: this.state.password.value,
    });
  };

  validateForm = () => {
    return new Promise(resolve => {
      let isValid = true;

      this.setState(prevState => {
        const newState = { ...prevState };
        if (prevState.userName.value.length === 0) {
          isValid = false;
          newState.userName.error = 'Please enter a user name';
        }

        if (prevState.password.value !== prevState.passwordRepeat.value) {
          isValid = false;
          newState.password.error = 'Passwords aren\'t equal';
          newState.passwordRepeat.error = 'Passwords aren\'t equal';
        } else {
          newState.password.error = null;
          newState.passwordRepeat.error = null;
        }

        if (prevState.password.value.length === 0) {
          isValid = false;
          newState.password.error = 'Please enter a password';
        }

        if (prevState.passwordRepeat.value.length === 0) {
          isValid = false;
          newState.passwordRepeat.error = 'Please enter a password';
        }

        return newState;
      }, () => resolve(isValid));
    });
  };

  render() {
    const { classes, redirectToChat } = this.props;
    const { userName, password, passwordRepeat } = this.state;

    if (redirectToChat) return (<Redirect to='/chat' push />);

    return (
      <form className={classes.container} onSubmit={this.handleOnSignUp} autoComplete='off'>
        <TextField
          name='userName'
          label='User Name'
          className={classes.textField}
          value={userName.value}
          error={!!userName.error}
          helperText={userName.error || ' '}
          onChange={this.handleOnChange}
          margin='normal'
        />
        <div className={classes.passwords}>
          <TextField
            name='password'
            label='Password'
            className={classes.textField}
            value={password.value}
            error={!!password.error}
            helperText={password.error || ' '}
            onChange={this.handleOnChange}
            margin='normal'
            type='password'
          />
          <TextField
            name='passwordRepeat'
            label='Repeat Password'
            className={classes.textField}
            value={passwordRepeat.value}
            error={!!passwordRepeat.error}
            helperText={passwordRepeat.error || ' '}
            onChange={this.handleOnChange}
            margin='normal'
            type='password'
          />
        </div>
        <Button type='submit' variant='contained' color='primary' className={classes.submitButton}>
          Sign up
        </Button>
      </form>
    );
  };
}

export default withStyles(styles)(SignUpForm);
