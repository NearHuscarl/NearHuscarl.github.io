import React from 'react';
import { createGlobalStyle } from 'styled-components';
import theme, { colors } from './theme';
import { maxWidth, opacity, darken } from './util';

const sbTrackColor = colors.blueGrey[300];
const sbThumbColor = theme.white;
const CustomScrollbar = createGlobalStyle`
	/* Currently there is no cross-platform support for custom css scrollbar */
	* {
		/* Firefox */
		/* https://stackoverflow.com/a/54101063/9449426 */
		scrollbar-width: thin;
		scrollbar-color: ${sbThumbColor} ${sbTrackColor};

		/* Chromium */
		/* https://stackoverflow.com/a/53739309/9449426 */
		::-webkit-scrollbar {
			width: .8rem;
		}
		::-webkit-scrollbar-track-piece  {
			background-color: ${sbTrackColor};
		}
		::-webkit-scrollbar-thumb:vertical {
			background-color: ${sbThumbColor};
		}
	}
`;

const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: inherit;
	}

	html {
		box-sizing: border-box;
		font-size: 62.5%; /* 10px/16px -> 1rem = 10px */
	}

	body {
		background-image: linear-gradient(
			to bottom right,
            ${colors.blueGrey[100]},
            ${colors.blueGrey[300]}
		);
		min-height: 100vh;
	}

	::selection {
		background-color: ${theme.primary};
		color: ${theme.white};
	}

	ul {
		list-style: none;
	}

	a {
		color: ${darken(theme.secondaryColors[700], 5)};
		/* text-shadow: 0.1rem 0.1rem 0.3rem ${opacity(theme.secondaryColors[700], 0.3)}; */
		text-decoration: none;
		transition: color .2s;

		&:hover,
		&:focus,
		&:active {
			color: ${theme.primary};
			/* text-shadow: 0.1rem 0.1rem 0.3rem ${opacity(theme.primary, 0.3)}; */
			outline: none;
		}
	}

	code {
		font-family: ${theme.fontCode};
		font-size: 1.25rem;
		background-image: linear-gradient(
			to right,
			${theme.greyLight1},
			${theme.greyLight2}
		);
		/* background-color: ${theme.greyLight1}; */
		padding: 0.25rem 0.55rem;
		border-radius: 0.5rem;
		/* border: 0.1rem solid ${theme.greyLight3}; */
		color: ${colors.red[400]};
	}

	p {
		font-size: 1.5rem;

		&:not(:last-child) {
			margin-bottom: 2rem;
		}
	}

	/* typography */
	body {
		color: ${theme.greyDark2};
		font-family: ${theme.fontDisplay};
		line-height: 1.6;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: ${theme.fontDisplay};
		font-weight: 700;
		color: ${theme.greyDark3};

		margin-top: 0;
	}

	h1 {
		font-size: 4rem;

		${maxWidth(490)} {
			font-size: 3rem;
		}
	}
	h2 {
		font-size: 2.5rem;

		${maxWidth(490)} {
			font-size: 2rem;
		}
	}
	h3 {
		font-weight: 600;
		font-size: 1.75rem;
	}
	h4 {
		font-weight: 500;
		font-size: 1.5rem;
	}
`;

// TODO: make this jsx syntax work in .ts files
function CSS(): JSX.Element {
	return (
		<>
			<GlobalStyle />
			<CustomScrollbar />
		</>
	);
}

export default CSS;
