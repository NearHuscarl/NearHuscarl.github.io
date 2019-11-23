import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';

const HomePage = () => (
	<main>
		<header className='intro'>
			<h1 className='intro__title h1'>Front-end Developer</h1>
			<h2 className='intro__description h2'>
				<p>Senior at University of Information Technology</p>
				<p className='intro__description--delimiter'>. </p>
				<p>Looking for an internship in 2020</p>
			</h2>
		</header>
		<section className='portfolio'>
			<h2 className='h2' id='portfolio'>
				Portfolio
			</h2>
			<div className='linebreak' />
			<div className='card-grid'>
				{projects.map((p) => (
					<ProjectCard
						key={p.title}
						image={p.image}
						title={p.title}
						technology={p.technologies}
						link={p.link}
					/>
				))}
			</div>
		</section>
	</main>
);

export default HomePage;
