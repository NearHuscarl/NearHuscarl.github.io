import colors from './colors';

export { colors };

const theme = {
	// colors
	primary: colors.amber[500],
	primaryColors: colors.amber,
	primaryDark: colors.amber[900],
	primaryLight: colors.amber[200],
	secondary: colors.cyan[500],
	secondaryColors: colors.cyan,
	tertiary: colors.green[500],
	greyLight1: colors.grey[100],
	greyLight2: colors.grey[200],
	greyLight3: colors.grey[300],
	greyDark1: colors.grey[500],
	greyDark2: colors.grey[600],
	greyDark3: colors.grey[700],
	white: '#ffffff',
	black: colors.grey[900],

	// general
	pageContainerWidth: '100rem',
	pageContainerVertPadding: '6rem',
	shadowDark: '0 2rem 4rem rgba(0, 0, 0, 0.3)',
	shadowLight: '0 2rem 5rem rgba(0, 0, 0, 0.06)',
	borderRound: '0.6rem',

	// fonts
	fontPrimary: "'Noto Sans', sans-serif",
	fontDisplay: "'Quicksand', 'Noto Sans', Helvetica, sans-serif",
	fontCode: "'Fira Code', monospace",
};

export default theme;
