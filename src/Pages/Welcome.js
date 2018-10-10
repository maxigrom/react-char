// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Layout from '../Components/Layout';
import LoginForm from './Welcome/LoginForm';
import Paper from '@material-ui/core/Paper';
import SignUpForm from './Welcome/SignUpForm';

type Props = {};
type State = {
  value: number,
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.lg
  },
  appBar: {
    flex: '0 0 500px',
    backgroundColor: theme.palette.background.paper,
  },
});

class Welcome extends React.Component<Props, State> {
  state = {
    tabIndex: 0,
  };

  handleChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  handleChangeIndex = index => {
    this.setState({ tabIndex: index });
  };

  render = () => {
    const { classes, theme } = this.props;
    const { tabIndex } = this.state;

    return (
      <>
      <Layout.Menu />
      <Layout.Body>
        <div className={classes.root}>
          <Paper className={classes.appBar}>
            <AppBar position='static' color='default'>
              <Tabs
                value={tabIndex}
                onChange={this.handleChange}
                indicatorColor='primary'
                textColor='primary'
                fullWidth
              >
                <Tab label='Log in' />
                <Tab label='Sign up' />
              </Tabs>
            </AppBar>
            <SwipeableViews index={tabIndex} onChangeIndex={this.handleChangeIndex}>
              <LoginForm />
              <SignUpForm />
            </SwipeableViews>
          </Paper>
        </div>
      </Layout.Body>
      </>
    );
  };
}

export default withStyles(styles, { withTheme: true })(Welcome);
