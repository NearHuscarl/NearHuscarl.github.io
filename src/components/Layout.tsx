import React from 'react';
import { Location } from '@reach/router';
import 'typeface-fira-code';
import 'typeface-noto-sans';
import 'typeface-quicksand';
import CSS from '../styles/index';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageContainer from './PageContainer';
import SEO from './SEO';

type LayoutProps = {
	title?: string;
	children: React.ReactNode;
};

const Layout = (props: LayoutProps): JSX.Element => {
	const { title = '', children } = props;
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

export default Layout;
