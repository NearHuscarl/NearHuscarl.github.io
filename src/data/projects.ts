export type Project = {
	image: string;
	title: string;
	technologies: Array<string>;
	tags: Array<string>;
	description: string;
	date: string;
	link: string;
};

const projects: Array<Project> = [
	{
		image: 'logo-sfd-profile-editor.png',
		title: 'SFD Profile Editor',
		technologies: ['React', 'Redux', 'Typescript', 'Material-UI'],
		tags: ['Web Application', 'Front-end'],
		description:
			'An internal tool to generate C# code for my game script when editing the character profile in SFD',
		date: '02/2021 - 03/2021',
		link: 'https://github.com/NearHuscarl/SFD_Profile_Editor',
	},
	{
		image: 'logo-nearacademy.png',
		title: 'NearAcademy',
		technologies: ['React', 'SCSS'],
		tags: ['Web', 'Front-end'],
		description: 'Front-end implementation of an online education webpage',
		date: '11/2019 - 01/2020',
		link: 'https://github.com/NearHuscarl/nearacademy',
	},
	{
		image: 'preview-flutter-login.png',
		title: 'Flutter Login',
		technologies: ['Flutter', 'Dart'],
		tags: ['UI', 'Animation'],
		description: 'Login screen with cool animation effects',
		date: '09/2019 - 11/2019',
		link: 'https://github.com/NearHuscarl/flutter_login',
	},
	{
		image: 'logo-edictionary.png',
		title: 'EDictionary',
		technologies: ['C#', 'WPF', 'MVVM', 'SQLite'],
		tags: ['Desktop'],
		description: 'An english dictionary app written in C# and WPF',
		date: '05/2018 - 07/2018',
		link: 'https://github.com/NearHuscarl/EDictionary',
	},
	{
		image: 'logo-castlevania.png',
		title: 'Castlevania',
		technologies: ['C++', 'DirectX', 'XML'],
		tags: ['Game'],
		description: 'A remake of Castlevania NES (Block 01)',
		date: '10/2018 - 02/2019',
		link: 'https://github.com/NearHuscarl/Castlevania',
	},
	{
		image: 'shell-script.jpg',
		title: 'Termite Color Switcher',
		technologies: ['Shell'],
		tags: ['Linux', 'Script'],
		description:
			'Utility script to manage and edit themes in termite terminal',
		date: '03/2018',
		link: 'https://github.com/NearHuscarl/termite-color-switcher',
	},
];

export default projects;
