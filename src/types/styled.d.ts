import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		primary: string;
		primaryColors: Color;
		primaryDark: string;
		primaryLight: string;
		secondary: string;
		secondaryColors: Color;
		tertiary: string;
		greyLight0: string;
		greyLight1: string;
		greyLight2: string;
		greyLight3: string;
		greyDark1: string;
		greyDark2: string;
		greyDark3: string;
		white: string;
		black: string;

		// general
		pageContainerWidth: string;
		pageContainerVertPadding: string;
		shadowDark: string;
		shadowLight: string;
		borderRound: string;

		// fonts
		fontPrimary: string;
		fontDisplay: string;
		fontCode: string;
	}

	type Color = {
		'50': string;
		'100': string;
		'200': string;
		'300': string;
		'400': string;
		'500': string;
		'600': string;
		'700': string;
		'800': string;
		'900': string;
		'A100'?: string;
		'A200'?: string;
		'A400'?: string;
		'A700'?: string;
	};
}
