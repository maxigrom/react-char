// @flow
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { RootReducer } from './RootReducer';
import history from '../Helpers/HistoryHelper';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const DEFAULT_MIDDLEWARES = [
  thunkMiddleware,
  routerMiddleware(history)
];

function getMiddlewares() {
  if (process.env.NODE_ENV === 'production') return DEFAULT_MIDDLEWARES;

  const reduxLogger = createLogger();
  return [...DEFAULT_MIDDLEWARES, reduxLogger];
}

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    serialize: true,
  }) : compose;

const rootReducerWithHistory = connectRouter(history)(RootReducer);

const store = createStore(
  rootReducerWithHistory, {},
  composeEnhancers(
    applyMiddleware(
      ...getMiddlewares()
    ),
  ),
);

if (module.hot) {
  module.hot.accept('./RootReducer', () => {
    store.replaceReducer(rootReducerWithHistory);
  });
}

export default store;
