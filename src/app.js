/* eslint react/jsx-filename-extension: off */

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import Css from './styles';

const App = () => (
	<>
		<Css />
		<AppRouter />
	</>
);

const renderApp = () => {
	const rootElement = document.getElementById('app');

	if (rootElement.hasChildNodes()) {
		ReactDOM.hydrate(<App />, rootElement);
	} else {
		ReactDOM.render(<App />, rootElement);
	}
};

renderApp();
