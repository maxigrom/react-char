// @flow
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultTheme from './App/DefaultTheme';
import Chat from './Pages/Chat';

class App extends React.Component {
  render = () => {
    return (
      <>
      <CssBaseline/>
      <MuiThemeProvider theme={DefaultTheme}>
        <Chat/>
      </MuiThemeProvider>
      </>
    );
  }
}

export default hot(module)(App);
