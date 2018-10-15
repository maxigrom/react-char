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
  redirectToChat: boolean,
  onLogin: (user: TLoginUser) => void,
|};

type State = {|
  userName: TValueWithError<string>,
  password: TValueWithError<string>,
|};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  submitButton: {
    width: '100%',
    margin: theme.spacing.sm,
  },
});

class LoginForm extends React.Component<Props, State> {
  props: Props;

  state: State = {
    userName: newValueWithError(''),
    password: newValueWithError(''),
  };

  handleOnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value: value,
      },
    });
  };

  handleOnLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await this.validateForm();
    if (!isValid) return;

    this.props.onLogin({
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

        if (prevState.password.value.length === 0) {
          isValid = false;
          newState.password.error = 'Please enter a password';
        }

        return newState;
      }, () => resolve(isValid));
    });
  };

  render = () => {
    const { classes, redirectToChat } = this.props;
    const { userName, password } = this.state;

    if (redirectToChat) return (<Redirect to='/chat' push />);

    return (
      <form className={classes.container} onSubmit={this.handleOnLogin} autoComplete='off'>
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
        <Button type='submit' variant='contained' color='primary' className={classes.submitButton}>
          Log in
        </Button>
      </form>
    );
  };
}

export default withStyles(styles)(LoginForm);
