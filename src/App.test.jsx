/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('./Components/Route/PrivateRoute', () => () => 'PrivateRoute');
jest.mock('./Pages/Welcome', () => () => 'Welcome');
jest.mock('./Pages/ChatContainer', () => () => 'ChatContainer');

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
