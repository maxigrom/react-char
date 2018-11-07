// @flow
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultTheme from './Components/DefaultTheme';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Welcome from './Pages/Welcome';
import { SnackbarProvider } from 'notistack';
import store from './Redux/Store';
import Notifications from './Components/Notifications';
import PrivateRoute from './Components/Route/PrivateRoute';
import { ConnectedRouter } from 'connected-react-router';
import history from './Helpers/HistoryHelper';
import ChatContainer from './Pages/ChatContainer';
import { receiveAuth } from './Redux/Auth/AuthActions';
import { Redirect } from 'react-router';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {
  componentDidMount = () => {
    store.dispatch(receiveAuth());
  };

  render() {
    return (
      <>
      <CssBaseline />
      <MuiThemeProvider theme={DefaultTheme}>
        <SnackbarProvider maxSnack={5}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <React.Fragment>
                <Switch>
                  <Route exact path='/' component={Welcome} />
                  <PrivateRoute path='/chat/:id' component={ChatContainer} />
                  <PrivateRoute path='/chat' component={ChatContainer} />
                  <Redirect to='/' />
                </Switch>
                <Notifications />
              </React.Fragment>
            </ConnectedRouter>
          </Provider>
        </SnackbarProvider>
      </MuiThemeProvider>
      </>
    );
  };
}

export default hot(module)(App);
