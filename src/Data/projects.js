import PropTypes from 'prop-types';
import onThi247Logo from '../../public/images/logo-onthi247.png';
import football365Logo from '../../public/images/logo-football365.png';
import flutterLoginLogo from '../../public/images/preview-flutter-login.png';
import edictionaryLogo from '../../public/images/logo-edictionary.png';
import castlevaniaLogo from '../../public/images/logo-castlevania.png';
import shellScriptLogo from '../../public/images/shell-script.jpg';

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
		image: onThi247Logo,
		title: 'OnThi247',
		technologies: ['React', 'SCSS'],
		tags: ['Web', 'Front-end'],
		description: 'Front-end implementation of an online education webpage',
		date: 'Nov-Dec 2019',
		link: 'https://github.com/NearHuscarl/onthi247',
	},
	{
		image: football365Logo,
		title: 'Football365',
		technologies: ['React', 'SCSS', 'Webpack', 'Firebase', 'Heroku'],
		tags: ['Web', 'Front-end'],
		description:
			'Football site providing latest news, fixtures, results, standings',
		date: 'Mar-Jun 2019',
		link: 'https://github.com/NearHuscarl/football-site',
	},
	{
		image: flutterLoginLogo,
		title: 'Flutter Login',
		technologies: ['Flutter', 'Dart'],
		tags: ['UI', 'Animation'],
		description: 'Login screen with cool animation effects',
		date: 'Sep-Nov 2019',
		link: 'https://github.com/NearHuscarl/flutter_login',
	},
	{
		image: edictionaryLogo,
		title: 'EDictionary',
		technologies: ['C#', 'WPF', 'MVVM', 'SQLite'],
		tags: ['Desktop'],
		description: 'An english dictionary app written in C# and WPF',
		date: 'May-Jul 2018',
		link: 'https://github.com/NearHuscarl/EDictionary',
	},
	{
		image: castlevaniaLogo,
		title: 'Castlevania',
		technologies: ['C++', 'DirectX 9', 'Xml'],
		tags: ['Game'],
		description: 'A remake of Castlevania NES (Block 01)',
		date: 'Oct 2018 - Feb 2019',
		link: 'https://github.com/NearHuscarl/Castlevania',
	},
	{
		image: shellScriptLogo,
		title: 'Termite Color Switcher',
		technologies: ['Shell'],
		tags: ['Linux', 'Script'],
		description:
			'Utility script to manage and edit theme in termite terminal',
		date: 'Mar 2018',
		link: 'https://github.com/NearHuscarl/termite-color-switcher',
	},
];

export default projects;
