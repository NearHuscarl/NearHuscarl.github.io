import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../styles/theme';
import selectors from '../styles/selectors';
import { maxWidth, props } from '../styles/util';

// Make icon moving up and down eagerly
const upDown = keyframes`
	0%,
	50%,
	100% {
		transform: translateY(0);
	}
	25%,
	75% {
		transform: translateY(-0.6rem);
	}
`;

const Container = styled.div`
	transition: color 0.2s;

	a {
		color: inherit;
	}

	&:hover,
	&:focus,
	&:active {
		color: ${theme.primary};
	}

	${selectors.icon} {
		margin-right: 0.2rem;

		&.fa-envelope {
			margin-bottom: -0.07rem; /* fix mail icon not perfectly vertical-aligned */
		}
	}

	.label {
		position: relative;
		display: inline-flex;
		justify-content: center;
		color: inherit;
		font-weight: inherit;
	}

	.label::before {
		content: '';
		position: absolute;
		display: block;
		background-color: ${theme.primary};
		width: 0;
		height: 1px;
		margin: 0 auto;

		bottom: 0;
		transition: width 0.2s;
	}

	&:hover .label:before,
	&:focus .label:before,
	&:active .label:before {
		width: 100%;
	}

	${props('animated')} ${selectors.icon} {
		animation: 0.75s ${upDown} ease-out;
	}
`;

export default function IconLink({ icon, href, children, className }) {
	const [animated, setAnimated] = React.useState(false);

	return (
		<Container
			className={className}
			// Detect hover to add and remove animation css class manually
			// instead of using :hover in css because the animation duration is
			// pretty long, and it will exit abruptly if the user suddenly stop
			// hovering in the middle of the animation
			onMouseEnter={() => setAnimated(() => true)}
			onAnimationEnd={() => setAnimated(() => false)}
			animated={animated}
		>
			<a href={href}>
				<FontAwesomeIcon icon={icon} />
			</a>{' '}
			<a className='label' href={href}>
				{children}
			</a>
		</Container>
	);
}

IconLink.propTypes = {
	icon: PropTypes.shape().isRequired,
	href: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.node,
};

IconLink.defaultProps = {
	className: null,
};

export const CollapsableIconLink = styled(IconLink)`
	${maxWidth(490)} {
		.label {
			display: none;
		}
		/* enlarge icon and collapsing text on small devices */
		& ${selectors.icon} {
			width: 2.5rem;
			height: 2.5rem;
		}
	}
`;
