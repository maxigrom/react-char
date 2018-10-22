// @flow
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultTheme from './Components/DefaultTheme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Chat from './Pages/Chat';
import Welcome from './Pages/Welcome';
import Redirect from 'react-router-dom/es/Redirect';
import { SnackbarProvider } from 'notistack';
import Store from './Redux/Store';
import Notifications from './Components/Notifications';
import PrivateRoute from './Components/Route/PrivateRoute';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {
  render = () => {
    return (
      <>
      <CssBaseline />
      <MuiThemeProvider theme={DefaultTheme}>
        <SnackbarProvider maxSnack={5}>
          <Provider store={Store}>
            <Router>
              <React.Fragment>
                <Switch>
                  <Route exact path='/' component={Welcome} />
                  <PrivateRoute path='/chat' component={Chat} />
                  <Redirect to='/' />
                </Switch>
                <Notifications />
              </React.Fragment>
            </Router>
          </Provider>
        </SnackbarProvider>
      </MuiThemeProvider>
      </>
    );
  };
}

export default hot(module)(App);
