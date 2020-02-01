import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { faGithub, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faBalanceScale, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import ExpandableIcon from '../components/ExpandableIcon';
import Logo from '../components/Logo';
import theme, { colors } from '../styles/theme';
import { centerAbsolute, maxWidth } from '../styles/util';

const Container = styled.footer`
	border-bottom-left-radius: inherit;
	border-bottom-right-radius: inherit;

	padding: 3rem;
	background-color: ${colors.blueGrey[900]};
	color: ${theme.greyLight2};
	display: flex;
	justify-content: space-between;
	align-items: center;

	position: relative;

	a {
		color: inherit;
	}

	a:hover,
	a:focus,
	a:active {
		outline: none;
		color: ${theme.primary};
	}

	${maxWidth(490)} {
		justify-content: center;
		flex-wrap: wrap;
	}
`;

const Copyright = styled.div`
	${centerAbsolute}
	display: flex;
	/* align-items: center; */

	& > :not(:last-child) {
		margin-right: 0.5rem;
	}

	${maxWidth(490)} {
		flex: 0 0 100%;

		justify-content: center;
		margin-top: 2rem;

		/* reset from centerAbsolute() */
		position: unset;
		top: unset;
		left: unset;
		transform: unset;
	}
`;

const Row = styled.div`
	display: flex;

	& > :not(:last-child) {
		margin-right: ${(props) => props.gap}rem;
	}

	${maxWidth(490)} {
		margin-right: 1.2rem;
	}
`;

const getResumePdfUrl = () => {
	const data = useStaticQuery(graphql`
		{
			file(name: { eq: "resume" }, extension: { eq: "pdf" }) {
				publicURL
			}
		}
	`);
	return data.file.publicURL;
};

function Footer() {
	return (
		<Container className='--hide-from-pdf'>
			<Row gap={0.8}>
				<Link to='/resume-full'>
					<ExpandableIcon icon={faHtml5} text='Resumé in HTML' />
				</Link>
				<a
					rel='noopener noreferrer'
					target='_blank'
					href={getResumePdfUrl()}
				>
					<ExpandableIcon icon={faFilePdf} text='Resumé in PDF' />
				</a>
			</Row>
			<Row gap={1.2}>
				<a href='https://github.com/NearHuscarl/portfolio/blob/master/LICENSE.md'>
					<ExpandableIcon icon={faBalanceScale} text='MIT License' />
				</a>
				<a href='https://github.com/nearhuscarl/portfolio'>
					<ExpandableIcon icon={faGithub} text='Source Code' rotate />
				</a>
			</Row>
			<Copyright>
				<Logo small />
				<span>{`Near Huscarl © ${new Date().getFullYear()}`}</span>
			</Copyright>
		</Container>
	);
}

export default Footer;
