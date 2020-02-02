import React from 'react';
import { Location } from '@reach/router';
import PropTypes from 'prop-types';
import firaCodeFont from 'typeface-fira-code';
import notoSansFont from 'typeface-noto-sans';
import quicksandFont from 'typeface-quicksand';
import CSS from '../styles/index';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageContainer from './PageContainer';
import SEO from './SEO';

const Layout = ({ title, children }) => {
	return (
		// TODO: pass props.noPadding when migrating to gatsby
		// https://github.com/gatsbyjs/gatsby/issues/8787#issuecomment-427216043
		<Location>
			{({ location }) => {
				const { pathname } = location;
				const isResumeFullPage = pathname === '/resume-full';

				return (
					<>
						<SEO title={title} />
						<CSS />
						<PageContainer>
							{!isResumeFullPage && <Header />}
							{children}
							{!isResumeFullPage && <Footer />}
						</PageContainer>
					</>
				);
			}}
		</Location>
	);
};

Layout.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
	title: '',
};

export default Layout;
