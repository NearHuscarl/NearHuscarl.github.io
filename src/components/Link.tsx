import { Link as ReactLink } from 'gatsby';
import styled from 'styled-components';
import theme, { colors } from '../styles/theme';

const getColor = (color: LinkColor): string => {
	if (color === 'dark') {
		return theme.primaryColors[700];
	}
	if (color === 'blue') {
		return colors.cyan[500];
	}
	return theme.primary;
};

type LinkColor = 'dark' | 'blue';

type LinkProps = {
	color?: LinkColor;
};

export default styled(ReactLink)<LinkProps>`
	border: none;
	background-color: transparent;
	color: inherit;
	font-size: inherit;
	transition: all 0.2s;

	display: inline-flex;
	justify-content: center;

	position: relative;

	&::before {
		content: '';
		position: absolute;
		display: block;
		background-color: ${(p) => getColor(p.color)};
		width: 0;
		height: 0.1rem;
		margin: 0 auto;

		bottom: 0;
		transition: width 0.3s;
	}

	&:hover:before,
	&:focus:before,
	&:active:before {
		width: 100%;
	}

	&:hover,
	&:focus,
	&:active {
		outline: none;
		color: ${(p) => getColor(p.color)};
		/* override bs hover */
		text-decoration: none;
	}

	&:active {
		transform: translateY(0.1rem);
	}
`;
