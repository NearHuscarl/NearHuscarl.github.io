import styled from 'styled-components';
import { maxWidth } from '../styles/util';
import theme from '../styles/theme';
import curves from '../styles/curves';

const Linebreak = styled.div`
	height: 0.1rem;
	background-color: ${theme.greyLight2};
	margin-bottom: 2rem;
	position: relative;

	${maxWidth(900)} {
		margin-bottom: 1.5rem;
	}

	/* secondary line which will overlap the primary line
	if width: 100%. Used in animation. See Headings.jsx */
	&::before {
		content: '';
		position: absolute;
		height: 0.1rem;
		width: 0;
		background-color: ${theme.primary};
		transition: width 0.5s ${curves.easeOutExpo};
	}
`;

export default Linebreak;
