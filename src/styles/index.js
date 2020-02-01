import React from 'react';
import { createGlobalStyle } from 'styled-components';
import theme, { colors } from './theme';
import { maxWidth } from './util';

const Global = createGlobalStyle`
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

		background-image: linear-gradient(
			to bottom right,
            ${theme.primary},
            ${theme.primaryDark}
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
		color: ${theme.secondary};
		text-decoration: none;
		transition: color .2s;

		&:hover,
		&:focus,
		&:active {
			color: ${theme.primary};
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

export default function CSS() {
	return (
		<>
			<Global />
		</>
	);
}
