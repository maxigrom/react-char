// @flow
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultTheme from './Components/DefaultTheme';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Welcome from './Pages/Welcome';
import Redirect from 'react-router-dom/es/Redirect';
import { SnackbarProvider } from 'notistack';
import store from './Redux/Store';
import Notifications from './Components/Notifications';
import PrivateRoute from './Components/Route/PrivateRoute';
import { receiveAuth } from './Redux/Auth/AuthActions';
import history from './Helpers/HistoryHelper';
import { ConnectedRouter } from 'connected-react-router';
import ChatContainer from './Pages/ChatContainer';
import { fetchChat } from './Redux/Chat/ChatActions';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {
  componentDidMount() {
    history.listen(this.handleOnLocationChange);
    store.dispatch(receiveAuth()).then(() => {
      history.push(history.defaultLocation);
    });
  };

  handleOnLocationChange = (location, action) => {
    const params = location.pathname.toLowerCase()
      .split('/')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    switch (params[0]) {
      case 'chat':
        if (params[1] === undefined || params[1] === null || params[1].length === 0) return;

        store.dispatch(fetchChat(params[1]));
        break;
    }
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
