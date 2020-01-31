import styled from 'styled-components';
import theme from '../styles/theme';
import { props, maxWidth } from '../styles/util';

const PageContainer = styled.div`
	max-width: ${theme.pageContainerWidth};
	margin: ${theme.pageContainerVertPadding} auto;
	background-color: ${theme.white};
	border-radius: ${theme.borderRound};
	box-shadow: ${theme.shadowDark};

	${props('noPadding')} {
		margin-top: 0;
		margin-bottom: 0;
		border-radius: 0;
	}

	${maxWidth(1000)} {
		margin: 0;
		border-radius: 0;
		box-shadow: none;
	}
`;

export default PageContainer;