import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faLink from '@fortawesome/free-solid-svg-icons/faLink';
import { Linebreak } from './Toolkit';
import theme from '../styles/theme';

const Anchor = styled(Link).attrs(() => ({ 'aria-label': 'anchor' }))`
	float: left;
	margin-top: 0.5rem;

	/* change those values carefully as it may push the header to the right */
	font-size: 1.75rem;
	margin-left: -3.25rem;
	padding-right: 1.45rem;

	opacity: 0;
	transform: translateX(2rem) rotate(60deg);
	transition: opacity 0.2s, transform 0.2s, color 0.2s;

	&:hover,
	&:focus,
	&:active {
		color: ${theme.secondary};
		outline: none;
	}
`;

const Container = styled.div`
	&:hover .anchor {
		opacity: 1;
		transform: translateX(0) rotate(0);
	}

	&:hover .linebreak::before {
		width: 100%;
	}

	h3,
	h4 {
		margin-bottom: 1rem;
	}
`;

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = {
	className?: string;
	id?: string;
	children: React.ReactNode;
	linebreak?: boolean;
};

function createHeading(
	Level: HeadingType,
): React.FunctionComponent<HeadingProps> {
	return (props: HeadingProps): JSX.Element => {
		const { id, className, children, linebreak = false } = props;
		const anchor = kebabCase(id);
		return (
			<Container id={anchor} className={className}>
				{anchor && (
					<Location>
						{({ location }) => (
							<Anchor
								className='anchor'
								to={location.pathname + '/#' + anchor}
							>
								<FontAwesomeIcon icon={faLink} />
							</Anchor>
						)}
					</Location>
				)}
				<Level>{children}</Level>
				{linebreak && <Linebreak className='linebreak' />}
			</Container>
		);
	};
}

export const H1 = createHeading('h1');
export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
export const H4 = createHeading('h4');
export const H5 = createHeading('h5');
export const H6 = createHeading('h6');
