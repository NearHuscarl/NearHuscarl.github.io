import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export default function IconLink({
	icon,
	href,
	children,
	className,
	canCollapse,
}) {
	const [animated, setAnimated] = useState(false);

	return (
		<div
			className={classNames('icon-link', className)}
			// Detect hover to add and remove animation css class manually
			// instead of using :hover in css because the animation duration is
			// pretty long, and it will exit abruptly if the user suddenly stop
			// hovering in the middle of the animation
			onMouseEnter={() => setAnimated(() => true)}
			onAnimationEnd={() => setAnimated(() => false)}
		>
			<a href={href}>
				<FontAwesomeIcon
					icon={icon}
					className={classNames({
						'icon-link__icon': true,
						'icon-link__icon--mail':
							icon.prefix === 'fas' && icon.iconName === 'envelope',
						'icon-link__icon--can-collapse': canCollapse,
						'animation-icon-up': animated,
					})}
				/>
			</a>{' '}
			<a
				className={classNames({
					'icon-link__link': true,
					'icon-link__link--can-collapse': canCollapse,
				})}
				href={href}
			>
				{children}
			</a>
		</div>
	);
}

IconLink.propTypes = {
	icon: PropTypes.shape().isRequired,
	href: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.node,
	canCollapse: PropTypes.bool,
};

IconLink.defaultProps = {
	className: '',
	canCollapse: false,
};
