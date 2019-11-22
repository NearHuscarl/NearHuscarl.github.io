import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export default function ExpandableIcon({ icon, text, rotate, noPadding }) {
	return (
		<div
			className={classNames({
				'expd-icon': true,
				'expd-icon--rotate': rotate,
				'expd-icon--no-padding': noPadding,
			})}
		>
			<div className='expd-icon__icon-background'>
				<FontAwesomeIcon
					className={classNames({
						'expd-icon__icon': true,
						'expd-icon--rotate__icon': rotate,
					})}
					size='1x'
					icon={icon}
				/>
			</div>
			<span>{text}</span>
		</div>
	);
}

ExpandableIcon.propTypes = {
	icon: PropTypes.shape().isRequired,
	text: PropTypes.string.isRequired,
	rotate: PropTypes.bool,
	noPadding: PropTypes.bool,
};

ExpandableIcon.defaultProps = {
	rotate: false,
	noPadding: false,
};
