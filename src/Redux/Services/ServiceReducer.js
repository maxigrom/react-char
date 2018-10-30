// @flow
import { combineReducers } from 'redux';
import * as types from '../actionTypes';

export type TServiceReducerState = {
  isFetching: TServiceFetchingState,
  isConnected: boolean,
};

export type TServiceFetchingState = {
  signup: boolean,
  login: boolean,
  logout: boolean,
  receiveAuth: boolean,

  fetchAllChats: boolean,
  fetchMyChats: boolean,
  fetchChat: boolean,
  createChat: boolean,
  joinChat: boolean,
  leaveChat: boolean,
  deleteChat: boolean,

  sockets: boolean,
  editUser: boolean,
};

const intialState: TServiceReducerState = {
  isFetching: {
    signup: false,
    login: false,
    logout: false,
    receiveAuth: false,

    fetchAllChats: false,
    fetchMyChats: false,
    fetchChat: false,
    createChat: false,
    joinChat: false,
    leaveChat: false,
    deleteChat: false,

    sockets: false,
    editUser: false,
  },
  isConnected: false,
};

export const isFetching = (state: TServiceFetchingState = intialState.isFetching, action): TServiceFetchingState => {
  switch (action.type) {
    case types.SIGNUP.REQUEST:
      return { ...state, signup: true };

    case types.LOGIN.REQUEST:
      return { ...state, login: true };

    case types.LOGOUT.REQUEST:
      return { ...state, logout: true };

    case types.RECEIVE_AUTH.REQUEST:
      return { ...state, receiveAuth: true };

    case types.FETCH_ALL_CHATS.REQUEST:
      return { ...state, fetchAllChats: true };

    case types.FETCH_MY_CHATS.REQUEST:
      return { ...state, fetchMyChats: true };

    case types.FETCH_CHAT.REQUEST:
      return { ...state, fetchChat: true };

    case types.CREATE_CHAT.REQUEST:
      return { ...state, createChat: true };

    case types.JOIN_CHAT.REQUEST:
      return { ...state, joinChat: true };

    case types.LEAVE_CHAT.REQUEST:
      return { ...state, leaveChat: true };

    case types.DELETE_CHAT.REQUEST:
      return { ...state, deleteChat: true };

    case types.SOCKETS_CONNECTION.REQUEST:
      return { ...state, sockets: true };

    //case types.EDIT_USER.REQUEST:
    // return { ...state, editUser: true };

    case types.SIGNUP.SUCCESS:
    case types.SIGNUP.FAILURE:
      return { ...state, signup: false };

    case types.LOGIN.SUCCESS:
    case types.LOGIN.FAILURE:
      return { ...state, login: false };

    case types.LOGOUT.SUCCESS:
    case types.LOGOUT.FAILURE:
      return { ...state, logout: false };

    case types.RECEIVE_AUTH.SUCCESS:
    case types.RECEIVE_AUTH.FAILURE:
      return { ...state, receiveAuth: false };

    case types.FETCH_ALL_CHATS.SUCCESS:
    case types.FETCH_ALL_CHATS.FAILURE:
      return { ...state, fetchAllChats: false };

    case types.FETCH_MY_CHATS.SUCCESS:
    case types.FETCH_MY_CHATS.FAILURE:
      return { ...state, fetchMyChats: false };

    case types.FETCH_CHAT.SUCCESS:
    case types.FETCH_CHAT.FAILURE:
      return { ...state, fetchChat: false };

    case types.CREATE_CHAT.SUCCESS:
    case types.CREATE_CHAT.FAILURE:
      return { ...state, createChat: false };

    case types.JOIN_CHAT.SUCCESS:
    case types.JOIN_CHAT.FAILURE:
      return { ...state, joinChat: false };

    case types.LEAVE_CHAT.SUCCESS:
    case types.LEAVE_CHAT.FAILURE:
      return { ...state, leaveChat: false };

    case types.DELETE_CHAT.SUCCESS:
    case types.DELETE_CHAT.FAILURE:
      return { ...state, deleteChat: false };

    case types.SOCKETS_CONNECTION.SUCCESS:
    case types.SOCKETS_CONNECTION.FAILURE:
      return { ...state, sockets: false };

    //case types.EDIT_USER.SUCCESS:
    //case types.EDIT_USER.FAILURE:
    // return { ...state, editUser: false };
    default:
      return state;
  }
};

export const isConnected = (state: boolean = intialState.isConnected, action): boolean => {
  switch (action.type) {
    case types.SOCKETS_CONNECTION_MISSING:
    case types.SOCKETS_CONNECTION.FAILURE:
      console.log('=================================lost connection');
      return false;

    case types.SOCKETS_CONNECTION.SUCCESS:
      console.log('---------------------------------return connection');
      return true;

    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  isConnected,
});
