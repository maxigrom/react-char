// @flow
require('es6-promise').polyfill();
require('isomorphic-fetch');
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultTheme from './App/DefaultTheme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Chat from './Pages/Chat';
import Welcome from './Pages/Welcome';
import Redirect from 'react-router-dom/es/Redirect';
import { SnackbarProvider } from 'notistack';

class App extends React.Component {
  render = () => {
    return (
      <SnackbarProvider maxSnack={5}>
        <CssBaseline />
        <MuiThemeProvider theme={DefaultTheme}>
          <Router>
            <React.Fragment>
              <Switch>
                <Route exact path='/' component={Welcome} />
                <Route path='/chat' component={Chat} />
                <Redirect to='/' />
              </Switch>
            </React.Fragment>
          </Router>
        </MuiThemeProvider>
      </SnackbarProvider>
    );
  };
}

export default hot(module)(App);
