// eslint base
// yarn add -D eslint eslint-config-airbnb eslint-plugin-import
//
// eslint-config-airbnb
//   This package provides Airbnb's .eslintrc as an extensible shared config.
//   https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
//
// eslint-plugin-import
//   Lint ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names
//   https://github.com/benmosher/eslint-plugin-import

// eslint + prettier
// prettier eslint-config-prettier eslint-plugin-prettier
//
// eslint-config-prettier
//   Disables ESLint rules that might conflict with prettier
//   https://github.com/prettier/eslint-config-prettier
// eslint-plugin-prettier
//   Runs prettier as an ESLint rule
//   https://github.com/prettier/eslint-plugin-prettier

// eslint + react
// eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-jest
//
// eslint-plugin-react
//   React specific linting rules for ESLint
//   https://github.com/yannickcr/eslint-plugin-react
// eslint-plugin-jsx-a11y
//   Provide accessibility rules on JSX elements
//   https://github.com/evcohen/eslint-plugin-jsx-a11y

// eslint + typescript:
// typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
//
// @typescript-eslint/eslint-plugin
//   A plugin that contains a bunch of ESLint rules that are TypeScript specific
//   https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
// @typescript-eslint/parser
//   The parser that will allow ESLint to lint TypeScript code

// Reference(s)
// https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb

const IGNORE = 0;
const WARNING = 1;
const ERROR = 2;

const extensions = [
	'airbnb',
	// enables the linting rules for React hooks (requires v16.8+)
	'airbnb/hooks',
	// Make import/export rules from eslint-plugin-import work with typescript
	'plugin:import/typescript',
	// A configuration which disables a few of the recommended rules from the previous set that are already covered by TypeScript's typechecker.
	'plugin:@typescript-eslint/eslint-recommended',
	// Uses the recommended rules from the @typescript-eslint/eslint-plugin
	'plugin:@typescript-eslint/recommended',
	// Disable rules that may conflict with prettier. Make sure to put it last, so it gets the chance to override other configs.
	'prettier',
	// Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
	'prettier/@typescript-eslint',
	// Uses eslint-config-prettier to disable ESLint rules from eslint-plugin-react that would conflict with prettier
	'prettier/react',
	// Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last
	// configuration in the extends array.
	'plugin:prettier/recommended',
];
const plugins = [
	// tells ESLint to load the plugin package you installed @typescript-eslint/eslint-plugin
	'@typescript-eslint',
	'prettier',
	'react',
	'jsx-a11y',
	'import',
];

// Use this file as a starting point for your project's .eslintrc.
// Copy this file, and add rule overrides as needed.
module.exports = {
	// This allows ESLint to understand TypeScript syntax.
	// Without this line, ESLint will throw errors as it tries to parse TypeScript code as if it were regular JavaScript
	'parser': '@typescript-eslint/parser',
	'extends': extensions,
	'plugins': plugins,
	// make eslint knows about variables like 'document' or 'window'
	'env': {
		'browser': true,
		'node': true,
		'jest': true,
	},
	'rules': {
		'prettier/prettier': ERROR,

		// Requires or disallows a whitespace. Exception is triple slash (///) for doc-comment or ts compiler directive
		// https://eslint.org/docs/rules/spaced-comment
		'spaced-comment': [ERROR, 'always', { 'markers': ['/'] }],

		// This rule disallows dangling underscores in identifiers.
		// https://github.com/rauchg/eslint-es6/blob/master/docs/rules/no-underscore-dangle.md
		'no-underscore-dangle': IGNORE,

		'no-return-assign': [ERROR, 'except-parens'],
		// deprecated
		'jsx-a11y/label-has-for': IGNORE,
		'jsx-a11y/label-has-associated-control': [
			ERROR,
			{
				'assert': 'either', // 'htmlFor', 'nesting', 'both', 'either'
			},
		],
		// "linebreak-style": [WARNING, "unix"]
		'linebreak-style': [WARNING, 'windows'],
		'indent': [ERROR, 'tab', { 'SwitchCase': 1 }],
		'prefer-template': IGNORE,
		'react/destructuring-assignment': [IGNORE],
		'react/jsx-indent': [WARNING, 'tab'],
		'react/jsx-one-expression-per-line': IGNORE,
		'react/jsx-filename-extension': [
			WARNING,
			{ 'extensions': ['.js', '.jsx', 'ts', 'tsx'] },
		],
		'react/prop-types': [IGNORE],
		'no-tabs': IGNORE, // Use spaces, override airbnb config
		'import/no-extraneous-dependencies': [
			ERROR,
			{
				'devDependencies': [
					'./scripts/*.js',
					'./src/tests/**',
					'./webpack.config.js',
					'./gatsby-*.js',
				],
				'optionalDependencies': false,
				'peerDependencies': false,
			},
		],

		// Exclude typescript extensions in import part. Airbnb only exclude extensions for javascript files by default
		// https://github.com/benmosher/eslint-plugin-import/issues/1615#issuecomment-577500405
		// enforce or disallow the use of certain file extensions when importing
		// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
		'import/extensions': [
			ERROR,
			'ignorePackages',
			{
				'ts': 'never',
				'tsx': 'never',
				'js': 'never',
				'jsx': 'never',
			},
		],

		// Require explicit return types on functions and class methods
		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
		'@typescript-eslint/explicit-function-return-type': [
			ERROR,
			{
				// do not check inline functions.
				'allowExpressions': true,
			},
		],
	},
	'overrides': [
		{
			// disable typechecking in js files
			'files': ['**/*.js'],
			'extends': extensions.filter((e) => !e.includes('typescript'))
			'plugins': plugins.filter((e) => !e.includes('typescript'))
		},
	],
	'settings': {
		'import/resolver': {
			'node': {
				'extensions': ['.js', '.jsx', '.ts', '.tsx'],
				'moduleDirectory': ['node_modules', 'src/'],
			},
		},
	},
};
