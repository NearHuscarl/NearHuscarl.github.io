import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageContainer from '../components/PageContainer';
import HomePage from '../pages/HomePage';
import ResumePage from '../pages/ResumePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import constants from '../constants';

const AppRouter = () => {
	return (
		// TODO: pass props.noPadding when migrating to gatsby
		// https://github.com/gatsbyjs/gatsby/issues/8787#issuecomment-427216043
		<PageContainer>
			<BrowserRouter basename={'/' + constants.repoName}>
				<Route component={Header} />
				<Switch>
					<Route path='/' component={HomePage} exact />
					<Route path='/resume' component={ResumePage} exact />
					<Route path='/resume-full' component={ResumePage} exact />
					<Route path='/about' component={AboutPage} exact />
					<Route component={NotFoundPage} />
				</Switch>
				<Route component={Footer} />
			</BrowserRouter>
		</PageContainer>
	);
};

export default AppRouter;
