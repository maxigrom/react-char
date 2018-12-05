// @flow
import { connect } from 'react-redux';
import type { TStore } from '../../Redux/RootReducer';
import Menu from './Menu';
import { logout } from '../../Redux/Auth/AuthActions';

const mapStateToProps = (state: TStore) => ({
  showLogoutButton: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
