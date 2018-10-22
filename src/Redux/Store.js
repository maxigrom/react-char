// @flow
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { RootReducer } from './RootReducer';

const DEFAULT_MIDDLEWARES = [thunkMiddleware];

function getMiddlewares() {
  if (process.env.NODE_ENV === 'production') return DEFAULT_MIDDLEWARES;

  const reduxLogger = createLogger();
  return [...DEFAULT_MIDDLEWARES, reduxLogger];
}

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    serialize: true,
  }) : compose;

const store = createStore(
  RootReducer, {},
  composeEnhancers(
    applyMiddleware(
      ...getMiddlewares()
    ),
  ),
);

if (module.hot) {
  module.hot.accept('./RootReducer', () => {
    store.replaceReducer(RootReducer);
  });
}

export default store;
