import PropTypes from 'prop-types';

export const propjectProps = PropTypes.shape({
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	description: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
});

const projects = [
	{
		image: 'logo-onthi247.png',
		title: 'OnThi247',
		technologies: ['React', 'SCSS'],
		tags: ['Web', 'Front-end'],
		description: 'Front-end implementation of an online education webpage',
		date: 'Nov-Dec 2019',
		link: 'https://github.com/NearHuscarl/onthi247',
	},
	{
		image: 'logo-football365.png',
		title: 'Football365',
		technologies: ['React', 'SCSS', 'Webpack', 'Firebase', 'Heroku'],
		tags: ['Web', 'Front-end'],
		description:
			'Football site providing latest news, fixtures, results, standings',
		date: 'Mar-Jun 2019',
		link: 'https://github.com/NearHuscarl/football-site',
	},
	{
		image: 'preview-flutter-login.png',
		title: 'Flutter Login',
		technologies: ['Flutter', 'Dart'],
		tags: ['UI', 'Animation'],
		description: 'Login screen with cool animation effects',
		date: 'Sep-Nov 2019',
		link: 'https://github.com/NearHuscarl/flutter_login',
	},
	{
		image: 'logo-edictionary.png',
		title: 'EDictionary',
		technologies: ['C#', 'WPF', 'MVVM', 'SQLite'],
		tags: ['Desktop'],
		description: 'An english dictionary app written in C# and WPF',
		date: 'May-Jul 2018',
		link: 'https://github.com/NearHuscarl/EDictionary',
	},
	{
		image: 'logo-castlevania.png',
		title: 'Castlevania',
		technologies: ['C++', 'DirectX 9', 'Xml'],
		tags: ['Game'],
		description: 'A remake of Castlevania NES (Block 01)',
		date: 'Oct 2018 - Feb 2019',
		link: 'https://github.com/NearHuscarl/Castlevania',
	},
	{
		image: 'shell-script.jpg',
		title: 'Termite Color Switcher',
		technologies: ['Shell'],
		tags: ['Linux', 'Script'],
		description:
			'Utility script to manage and edit themes in termite terminal',
		date: 'Mar 2018',
		link: 'https://github.com/NearHuscarl/termite-color-switcher',
	},
];

export default projects;
