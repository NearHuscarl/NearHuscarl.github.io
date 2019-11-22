import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import NotFoundPage from '../pages/NotFoundPage';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import HomePage from '../pages/HomePage';
import ResumePage from '../pages/ResumePage';
import AboutPage from '../pages/AboutPage';
import constants from '../constants';

function notResumeFull(props, Component) {
	// eslint-disable-next-line react/prop-types
	return props.location.pathname !== '/resume-full' ? <Component /> : null;
}

function savePath(props, Component, setFullPage) {
	// eslint-disable-next-line react/prop-types
	const path = props.location.pathname;

	if (path === '/resume-full') {
		setFullPage(() => true);
	} else {
		setFullPage(() => false);
	}

	return <Component />;
}

const AppRouter = () => {
	const [fullPage, setFullPage] = useState(false);

	return (
		<div
			className={classNames({
				'page-container': true,
				'page-container--no-vert-margin': fullPage,
			})}
		>
			<BrowserRouter basename={'/' + constants.repoName}>
				<Route
					render={(props) => notResumeFull(props, Header)}
				/>
				<Switch>
					<Route
						path='/'
						render={(props) => savePath(props, HomePage, setFullPage)}
						exact
					/>
					<Route
						path='/resume'
						render={(props) => savePath(props, ResumePage, setFullPage)}
						exact
					/>
					<Route
						path='/resume-full'
						render={(props) => savePath(props, ResumePage, setFullPage)}
						exact
					/>
					<Route
						path='/about'
						render={(props) => savePath(props, AboutPage, setFullPage)}
						exact
					/>
					<Route
						render={(props) => savePath(props, NotFoundPage, setFullPage)}
					/>
				</Switch>
				<Route render={(props) => notResumeFull(props, Footer)} />
			</BrowserRouter>
		</div>
	);
};

export default AppRouter;
