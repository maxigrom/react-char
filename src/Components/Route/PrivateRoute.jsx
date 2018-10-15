// @flow
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import type { TStoreState } from '../../Redux/Store';
import { connect } from 'react-redux';

type Props = {
  component: React.ComponentClass,
  isAuthenticated: boolean,
};

class PrivateRoute extends React.Component<Props> {
  props: Props;

  renderRoute = (routeProps: Object) => {
    if (!this.props.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: routeProps.location },
          }}
        />
      );
    }

    return React.createElement(this.props.component, routeProps, null);
  };

  render = () => {
    return <Route render={this.renderRoute} />;
  };
}

const mapStateToProps = (state: TStoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
