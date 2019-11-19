/* eslint react/jsx-filename-extension: off */

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/main.scss';

const renderApp = () => {
	const rootElement = document.getElementById('app');

	if (rootElement.hasChildNodes()) {
		ReactDOM.hydrate(<AppRouter />, rootElement);
	} else {
		ReactDOM.render(<AppRouter />, rootElement);
	}
};

renderApp();
