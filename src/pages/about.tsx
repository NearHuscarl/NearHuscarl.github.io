import React from 'react';
import styled from 'styled-components';
import ShinyBox from '../components/ShinyBox';
import theme from '../styles/theme';
import { maxWidth } from '../styles/util';
import Layout from '../components/Layout';
import MDXProvider from '../components/MDXProvider';
import About from '../content/about.mdx';

const IntroBox = styled(ShinyBox)`
	/* override h1's normalize.css */
	h1 {
		margin: 0;
	}

	h2 {
		font-weight: 400;
	}
`;

const Container = styled.main`
	position: relative;
`;
const HeaderBackground = styled.div`
	height: 15rem;
	background-image: linear-gradient(
		to right,
		${theme.secondaryColors[400]},
		${theme.secondaryColors[500]}
	);
`;
const Header = styled.header`
	width: 50%;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${theme.white};
	text-align: center;
	border-radius: ${theme.borderRound};

	${maxWidth(705)} {
		width: 75%;
		margin: 1rem auto;
	}
	${maxWidth(490)} {
		width: 90%;
	}
`;
const Body = styled.div`
	padding: 8rem 5rem;
	padding-top: 12rem;
	margin-top: -1rem;

	${maxWidth(590)} {
		padding-left: 3rem;
		padding-right: 3rem;
	}

	${maxWidth(490)} {
		padding-left: 2rem;
		padding-right: 2rem;
	}
`;

export default function AboutPage(): JSX.Element {
	return (
		<Layout title='About'>
			<Container>
				<HeaderBackground />
				<Header>
					<IntroBox>
						<h1>Near Huscarl</h1>
						<h2>Front-end developer in the making</h2>
					</IntroBox>
				</Header>
				<MDXProvider>
					<Body>
						<About />
					</Body>
				</MDXProvider>
			</Container>
		</Layout>
	);
}
