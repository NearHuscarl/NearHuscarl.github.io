import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import HomePage from '../pages/HomePage';
import ResumePage from '../pages/ResumePage';
import AboutPage from '../pages/AboutPage';
import constants from '../constants';

const AppRouter = () => (
	<div className='page-container'>
		{
			// path='/' would match https://nearhuscarl.github.io
			// but the gh-page is at https://nearhuscarl.github.io/<repoName>
		}
		<BrowserRouter basename={'/' + constants.repoName}>
			<Route path='/' component={Header} />
			<Switch>
				<Route path='/' component={HomePage} exact />
				<Route path='/resume' component={ResumePage} exact />
				<Route path='/about' component={AboutPage} exact />
				<Route component={NotFoundPage} />
			</Switch>
			<Footer />
		</BrowserRouter>
	</div>
);

export default AppRouter;
