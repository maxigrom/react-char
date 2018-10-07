// @flow
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultTheme from './App/DefaultTheme';
import Typography from '@material-ui/core/Typography';
import Layout from './App/Layout';
import Chat from './App/Chat';

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <>
      <CssBaseline/>
      <MuiThemeProvider theme={DefaultTheme}>
        <Layout>
          <Chat />
        </Layout>
      </MuiThemeProvider>
      </>
    );
  }
}

export default hot(module)(App);
