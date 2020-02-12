import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/theme';
import selectors from '../styles/selectors';
import { maxWidth, is } from '../styles/util';

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

type ContainerProps = {
	animated: boolean;
};

const Container = styled.div<ContainerProps>`
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

	${is('animated')} ${selectors.icon} {
		animation: 0.75s ${upDown} ease-out;
	}
`;

type IconLinkProps = {
	'icon': IconDefinition;
	'href': string;
	'children': React.ReactNode;
	'className'?: string;
	'aria-label'?: string;
};

export default function IconLink(props: IconLinkProps): JSX.Element {
	const { icon, href, children, className, 'aria-label': ariaLabel } = props;
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
			<a href={href} aria-label={ariaLabel}>
				<FontAwesomeIcon icon={icon} />
			</a>{' '}
			<a className='label' href={href}>
				{children}
			</a>
		</Container>
	);
}

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
