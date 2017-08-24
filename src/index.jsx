import React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';
import 'babel-polyfill';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();


render(
    <Provider store={store}>
        <Routes />
    </Provider>, document.getElementById('app'));

