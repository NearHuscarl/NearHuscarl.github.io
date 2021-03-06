import styled from 'styled-components';
import { maxWidth, is } from '../styles/util';
import theme from '../styles/theme';

type LogoProps = {
	small: boolean;
};
const Logo = styled.div<LogoProps>`
	width: 7rem;
	height: 7rem;
	background-color: ${theme.secondaryColors[400]};

	&::before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background-color: ${theme.secondaryColors[500]};
		clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%);
	}

	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background-color: ${theme.secondaryColors[600]};
		transform: translateY(-100%);
		clip-path: polygon(50% 50%, 50% 50%, 100% 100%, 0 100%);
	}

	${maxWidth(590)} {
		width: 4rem;
		height: 4rem;
	}

	${is('small')} {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

export default Logo;
