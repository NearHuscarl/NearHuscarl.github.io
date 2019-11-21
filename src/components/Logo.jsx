import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Logo({ small }) {
	return (
		<div
			className={classNames({
				logo: true,
				'logo--small': small,
			})}
		/>
	);
}

Logo.propTypes = {
	small: PropTypes.bool,
};

Logo.defaultProps = {
	small: false,
};
