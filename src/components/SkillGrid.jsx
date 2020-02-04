import styled from 'styled-components';
import { maxWidth } from '../styles/util';

const SkillGrid = styled.div`
	display: grid;
	grid-template-columns: max-content 1fr;
	align-items: center;
	gap: 2rem 6rem;

	${maxWidth(490)} {
		grid-template-columns: 1fr;
	}

	.language,
	.framework {
		grid-column: 1 / -1;
	}

	h3 {
		margin-bottom: 1rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		margin: -1rem;

		& > * {
			margin: 0.75rem 0;
		}

		& > :not(:last-child) {
			margin-right: 1rem;
		}

		${maxWidth(490)} {
			justify-content: center;
		}
	}

	${maxWidth(590)} {
		.database {
			grid-column: 1 / -1;
		}
	}
`;

export default SkillGrid;