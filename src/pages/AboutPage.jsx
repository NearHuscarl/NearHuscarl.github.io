import React from 'react';

const links = {
	'University of Information Technology': 'https://en.uit.edu.vn',
	Castlevania: 'https://github.com/nearhuscarl/castlevania',
	'wizard hat': 'https://waitbutwhy.com/2017/04/neuralink.html',
};

function componentize(paragraph) {
	return paragraph
		.replace(/\[/g, '[<a>')
		.replace(/\]/g, '<a>]')
		.split(/[[\]]/)
		.map((p, index) => {
			const i1 = index + 1;

			if (p.startsWith('<a>')) {
				const text = p.replace(/<a>/g, '');
				return (
					<a key={i1} href={links[text]} className='btn-link btn-link--blue'>
						{text}
					</a>
				);
			}
			return <span key={i1}>{p}</span>;
		});
}

export default function AboutPage() {
	return (
		<main className='about'>
			<div className='about-header' />
			<header className='about-intro'>
				<div className='about-intro__shadow-tl-wrap'>
					<div className='about-intro__shadow-tl' />
				</div>
				<div className='about-intro__shadow-br-wrap'>
					<div className='about-intro__shadow-br' />
				</div>
				<div className='about-intro__shadow-mask'>
					<h1 className='h1'>Near Huscarl</h1>
					<h2 className='h2'>Front-end developer in the making</h2>
				</div>
			</header>
			<div className='about-body'>
				<p className='mb-md'>
					{componentize(`My name is Nguyen. I am currently a senior at
					[University of Information Technology]. In my four-year at uni,
					I have written a lot of small and medium projects using various
					programming languages and frameworks, ranging from terminal
					utility scripts, web scrapers, libraries, UI mockups, some niché
					android apps to desktop app, video games and web app.`)}
				</p>
				<p className='mb-md'>
					{componentize(`My largest project, [Castlevania] is a 2D game remake of the same
					title. It is one of the only 2 projects (need citation) to achieve
					the absolute score in Introduction to Game Development in 2018,
					one of the most challenging courses in Software Engineering major
					where I am taking.`)}
				</p>
				<p className='mb-md'>
					{`I care a lot about creating beautiful, intuitive,
					high-performance web apps using latest technologies and
					frameworks. Coding is not easy, that is why I always try my best
					to make my code as clean and readable as possible whenever I can,
					so it can be easily read, maintained and reused later by me or
					other people. My dream is to master Haskell and write a bot that
					can fix all of the garbage code that I have written when I was
					young.`}
				</p>
				<p>
					{componentize(`When I am not coding. You can find me playing indie games,
					hitting the gym, reading blogs or watching Black Mirror episodes
					and contemplate about how the machine will one day kill us all
					and the only escape is a [wizard hat].`)}
				</p>
			</div>
		</main>
	);
}
