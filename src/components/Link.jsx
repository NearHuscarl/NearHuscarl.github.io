import { Link as ReactLink } from 'gatsby';
import styled from 'styled-components';
import theme, { colors } from '../styles/theme';

const getColor = (props) => {
	const { dark, blue } = props;
	if (dark) {
		return theme.primaryColors[700];
	}
	if (blue) {
		return colors.cyan[500];
	}
	return theme.primary;
};

export default styled(ReactLink)`
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
		background-color: ${getColor};
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
		color: ${getColor};
		/* override bs hover */
		text-decoration: none;
	}

	&:active {
		transform: translateY(0.1rem);
	}
`;
