// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper';
import registerServiceWorker from './registerServiceWorker';

const rootNode = document.getElementById('root');
ReactDOM.render(<AppWrapper />, rootNode);

registerServiceWorker();
