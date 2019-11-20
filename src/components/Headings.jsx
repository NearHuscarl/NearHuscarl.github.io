import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const headingProps = {
	id: PropTypes.string,
	children: PropTypes.node.isRequired,
	linebreak: PropTypes.bool,
	anchor: PropTypes.string,
	light: PropTypes.bool,
};

const headingDefaultProps = {
	id: null,
	anchor: '',
	linebreak: false,
	light: false,
};

function createHeading(Level) {
	switch (Level) {
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6': {
			const Heading = ({ id, children, linebreak, anchor, light }) => (
				<Level
					className={classNames({
						[Level]: true,
						[Level + '--lighter']: light,
					})}
					id={classNames(id)}
				>
					{anchor && (
						<Link className='h-anchor' to={anchor} smooth>
							<FontAwesomeIcon icon={faLink} />
						</Link>
					)}
					{children}
					{linebreak && <div className='linebreak' />}
				</Level>
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
