import Tinycolor from 'tinycolor2';
import { css } from 'styled-components';

export const centerAbsolute = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

//
// misc helper
//

const pxToEm = (pixel) => (pixel / 16) /* px */ * 1; /* em */

/**
 * 
 * @param {*} size 
 * Usage:
 * ```
 * ${maxWidth(850)} {
      font-size: 18px;
    }
 * ```
 */
// eslint-disable-next-line import/prefer-default-export
export const maxWidth = (size) =>
	`@media only screen and (max-width: ${pxToEm(size)}em)`;

export const props = (property, selector = '&') => (p) =>
	p[property] ? selector : '_____';

//
// Color helper methods
//

/**
 *
 * @param {*} color color to lighten
 * @param {*} amount amount from 0 to 100
 */
function lighten(color, amount = 10) {
	return Tinycolor(color)
		.lighten(amount)
		.toString();
}

/**
 *
 * @param {*} color color to darken
 * @param {*} amount amount from 0 to 100
 */
function darken(color, amount = 10) {
	return Tinycolor(color)
		.darken(amount)
		.toString();
}

/**
 *
 * @param {*} color color to transparentize
 * @param {*} amount amount from 0 to 1
 */
function transparentize(color, value) {
	const tnColor = Tinycolor(color);
	tnColor.setAlpha(1 - value);
	return tnColor.toString();
}

/**
 *
 * @param {*} color color to modify
 * @param {*} amount alpha value from 0 to 1
 */
function opacity(color, value) {
	const tnColor = Tinycolor(color);
	tnColor.setAlpha(value);
	return tnColor.toString();
}

/**
 *
 * @param {*} color1 first color to mix
 * @param {*} color2 second color to mix
 * @param {*} amount weight factor between 2 colors
 */
function mix(color1, color2, amount = 50) {
	return Tinycolor
		.mix(color1, color2, amount)
		.toString();
}

export { lighten, darken, transparentize, opacity, mix };
