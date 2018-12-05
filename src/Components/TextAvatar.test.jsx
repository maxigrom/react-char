/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TextAvatar from './TextAvatar';

describe('<TextAvatar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TextAvatar value="Max Attacks" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<TextAvatar value="Max Attacks" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
