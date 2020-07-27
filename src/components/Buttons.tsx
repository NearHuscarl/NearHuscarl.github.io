import styled from 'styled-components';
import theme from '../styles/theme';
import { maxWidth, is } from '../styles/util';
import selectors from '../styles/selectors';

export const IconButton = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;

	& > ${selectors.icon} {
		width: 2rem;
		height: 2rem;
		color: ${theme.greyDark3};
		transition: color 0.2s;
	}

	&:hover
		${selectors.icon},
		&:focus
		${selectors.icon},
		&:active
		${selectors.icon} {
		color: ${theme.primary};
	}

	&:focus {
		outline: none;
	}
`;

interface MenuButtonProps {
	readonly showMenu: boolean;
}

export const MenuButton = styled(IconButton)<MenuButtonProps>`
	display: none;
	position: relative;
	width: 2rem;
	height: 2rem;

	${maxWidth(490)} {
		display: block;
	}

	& ${selectors.icon} {
		position: absolute;
		margin-left: -1rem;
		margin-top: -1rem;
		transform: rotate(0deg);

		opacity: 1;
		transition: opacity 0.4s, transform 0.4s;
	}

	& ${selectors.icon}.close {
		opacity: 0;

		width: 100%;
		height: 2rem;
		color: ${theme.greyDark3};
		transition: opacity 0.4s, transform 0.4s;
	}

	${is('showMenu')} ${selectors.icon} {
		opacity: 0;
		transform: rotate(360deg);
	}

	${is('showMenu')} ${selectors.icon}.close {
		opacity: 1;
		transform: rotate(360deg);
	}
`;
