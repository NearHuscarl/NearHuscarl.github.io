import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export function H2({ id, children, linebreak, anchor }) {
	return (
		<React.Fragment>
			<h2 className='h2' id={classNames(id)}>
				{anchor && (
					<Link className='h-anchor' to={anchor} smooth>
						<FontAwesomeIcon icon={faLink} />
					</Link>
				)}
				{children}
				{linebreak && <div className='linebreak' />}
			</h2>
		</React.Fragment>
	);
}

H2.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node.isRequired,
	linebreak: PropTypes.bool,
	anchor: PropTypes.string,
};

H2.defaultProps = {
	id: null,
	anchor: '',
	linebreak: false,
};

export function H1({ children, linebreak, anchor }) {
	return <h1 />;
}
