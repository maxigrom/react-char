// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Meow from '../Meow';
import StyleConstants from '../../Consts/StyleConstants';
import * as classnames from 'classnames';
import Button from '@material-ui/core/Button';
import type { TStoreState } from '../../Redux/Store';
import AuthActions from '../../Redux/Auth/AuthActions';
import { connect } from 'react-redux';
import Menu from './Menu';

const mapStateToProps = (state: TStoreState) => ({
  showLogoutButton: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch(AuthActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
