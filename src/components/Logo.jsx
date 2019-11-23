import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Logo({ size }) {
	return (
		<div
			className={classNames({
				logo: true,
				'logo--small': size === 'small',
				'logo--tiny': size === 'tiny',
			})}
		/>
	);
}

Logo.propTypes = {
	size: PropTypes.string,
};

Logo.defaultProps = {
	size: '',
};
