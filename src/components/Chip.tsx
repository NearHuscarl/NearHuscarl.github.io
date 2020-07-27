import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import theme, { colors } from '../styles/theme';

const radialOutAnimation = (
	backgroundColor: string,
	color: string,
	duration = '0.3s',
): FlattenSimpleInterpolation => {
	const borderDuration = parseFloat(duration) / 3 + 's';

	return css`
		position: relative;
		overflow: hidden;
		transition: color ${duration} ease-out;
		z-index: 0;

		&::before {
			content: '';
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: ${backgroundColor};
			border-radius: 50%;
			transform: scale(0);
			transition: transform ${duration} ease-out,
				border-radius ${borderDuration};
		}

		&:hover,
		&:focus,
		&:active {
			color: ${color};

			&::before {
				transform: scale(1.5);
				border-radius: 1em;
			}
		}
	`;
};

const getColor = (text: React.ReactNode): FlattenSimpleInterpolation => {
	switch (text) {
		case 'JavaScript':
			return radialOutAnimation(colors.yellow['400'], colors.grey['900']);
		case 'TypeScript':
			return radialOutAnimation(colors.lightBlue['800'], theme.white);
		case 'SCSS':
			return radialOutAnimation(colors.pink['700'], theme.white);
		case 'Dart':
			return radialOutAnimation(colors.lightBlue['400'], colors.blue['900']);
		case 'CSS':
			return radialOutAnimation(colors.deepPurple['500'], theme.white);
		case 'C#':
			return radialOutAnimation(colors.purple['500'], theme.white);
		case 'Python':
			return radialOutAnimation(colors.indigo['500'], theme.white);
		case 'Bash':
			return radialOutAnimation(colors.blueGrey['900'], theme.white);
		default:
			return radialOutAnimation(theme.primary, theme.white);
	}
};

export default styled.div`
	background-color: ${theme.greyLight2};
	color: hsla(0, 0%, 42%, 1);
	font-size: 1.4rem;
	font-weight: 600;
	padding: 0.3rem 2rem;
	border-radius: 2rem;
	transition: all 0.3s;
	cursor: pointer;

	${({ children }) => getColor(children)}
`;
