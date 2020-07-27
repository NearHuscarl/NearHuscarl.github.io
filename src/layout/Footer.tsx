import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import faGithub from '@fortawesome/free-brands-svg-icons/faGithub';
import faHtml5 from '@fortawesome/free-brands-svg-icons/faHtml5';
import faBalanceScale from '@fortawesome/free-solid-svg-icons/faBalanceScale';
import faFilePdf from '@fortawesome/free-solid-svg-icons/faFilePdf';
import { ResumeFileQuery } from '../../graphql-types';
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

type RowProps = {
	gap: number;
};
const Row = styled.div<RowProps>`
	display: flex;

	& > :not(:last-child) {
		margin-right: ${(props) => props.gap}rem;
	}

	${maxWidth(490)} {
		margin-right: 1.2rem;
	}
`;

const useResumePdfUrl = (): string => {
	const data: ResumeFileQuery = useStaticQuery(graphql`
		query ResumeFile {
			file(name: { eq: "resume" }, extension: { eq: "pdf" }) {
				publicURL
			}
		}
	`);
	return data.file?.publicURL || '';
};

function Footer(): JSX.Element {
	return (
		<Container className='--hide-from-pdf'>
			<Row gap={0.8}>
				<Link to='/resume-full'>
					<ExpandableIcon icon={faHtml5} text='Resumé in HTML' />
				</Link>
				<a
					rel='noopener noreferrer'
					target='_blank'
					href={useResumePdfUrl()}
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
