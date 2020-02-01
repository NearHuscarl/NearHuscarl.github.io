import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Linebreak } from './Toolkit';
import theme from '../styles/theme';

const Anchor = styled(Link)`
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

const headingProps = {
	className: PropTypes.string,
	id: PropTypes.string,
	children: PropTypes.node.isRequired,
	linebreak: PropTypes.bool,
	anchor: PropTypes.string,
};

const headingDefaultProps = {
	className: null,
	id: null,
	anchor: '',
	linebreak: false,
};

const Container = styled.div`
	&:hover .anchor {
		opacity: 1;
		transform: translateX(0) rotate(0);
	}

	&:hover .linebreak::before {
		width: 100%;
	}
`;

function createHeading(Level) {
	switch (Level) {
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6': {
			const Heading = ({ id, className, children, linebreak, anchor }) => (
				<Container id={id} className={className}>
					{anchor && (
						<Location>
							{({ location }) => (
								<Anchor
									className='anchor'
									to={location.pathname + '/' + anchor}
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

			Heading.propTypes = headingProps;
			Heading.defaultProps = headingDefaultProps;

			return Heading;
		}
		default:
			throw Error(
				"Level must be one of the following values: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'",
			);
	}
}

export const H1 = createHeading('h1');
export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
export const H4 = createHeading('h4');
export const H5 = createHeading('h5');
export const H6 = createHeading('h6');
