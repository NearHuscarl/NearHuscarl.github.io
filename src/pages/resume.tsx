import React, { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Link, Chip } from '../components/Toolkit';
import Layout from '../components/Layout';
import theme from '../styles/theme';
import { maxWidth, opacity, darken } from '../styles/util';
import ResumeHeader from '../components/ResumeHeader';
import MDXProvider from '../components/MDXProvider';
import Resume from '../content/resume.mdx';

const TechChip: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => (
	<Chip as='li'>{children}</Chip>
);
TechChip.propTypes = Chip.propTypes;

const Container = styled.main`
	/* A4 size: 210 x 297 mm */
	/* 0.70707070707070707070707070707071‬ */
	height: calc(${theme.pageContainerWidth} / 0.707070707);

	border-radius: inherit;
	overflow: hidden;

	${maxWidth(1000)} {
		height: auto;
	}
`;
const Line = styled.div`
	height: 0.75rem;
	width: 100%;
	background-image: linear-gradient(
		to right,
		${theme.primary},
		${theme.primaryColors[600]}
	);
`;
const Body = styled.div`
	padding: 4rem 5rem;
	padding-top: 2rem;

	${maxWidth(775)} {
		padding: 2rem 3.5rem;
	}

	${maxWidth(490)} {
		padding: 2rem;
	}
`;
const Strong = styled.strong`
	color: ${darken(theme.secondaryColors[700], 5)};
	font-size: 1.4rem;
	font-weight: 600;
`;
const SkillList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	margin: -1rem;
	margin-bottom: 1rem;

	& > * {
		margin: 0.75rem 0;
	}

	& > :not(:last-child) {
		margin-right: 1rem;
	}

	${maxWidth(490)} {
		justify-content: center;
	}
`;
const Paragraph = styled.p`
	&:not(:last-child) {
		margin-bottom: 0;
	}
`;
const resumeComponents = {
	li: TechChip,
	ul: SkillList,
	strong: Strong,
	// eslint-disable-next-line react/prop-types
	a: ({ href, children }) => (
		<Link as='a' href={href}>
			{children}
		</Link>
	),
	p: Paragraph,
};

export const ResumeContent = (): JSX.Element => {
	return (
		<MDXProvider components={resumeComponents}>
			<Container>
				<ResumeHeader />
				<Line />
				<Body>
					<Resume />
				</Body>
			</Container>
		</MDXProvider>
	);
};

const ResumePage = (): JSX.Element => {
	return (
		<Layout title='Resumé'>
			<ResumeContent />
		</Layout>
	);
};

export default ResumePage;
