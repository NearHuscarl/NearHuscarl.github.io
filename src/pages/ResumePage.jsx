import React from 'react';
import {
	faEnvelope,
	faMobileAlt,
	faGlobe,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
	faGithub,
	faStackOverflow,
	faLinkedin,
	faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
import contact from '../data/contact';
import media from '../data/media';
import projects from '../data/projects';
import ProjectPreview from '../components/ProjectPreview';
import IconLink from '../components/IconLink';
import { H2 } from '../components/Headers';

const chopSchema = (url) => url.replace(/^https?:\/\//, '');

const summary = `Senior at UIT, perfectionist, have great attention to details, love
coding and open source. Very eager to learn new trending frameworks
and technologies. Technologies used: [React], [SCSS], [Webpack], [Gulp], [Flutter], [Git]. Depend
on the project's requirement, I can seek to learn new technology
quickly and integrate to the team's workflow.`;

// .split(/(\[)/)
const ResumePage = () => (
	<main className='resume'>
		<div className='resume-header'>
			<h1 className='h1'>Nguyễn Khánh Nguyên</h1>
			<h2 className='h2 mb-sm'>Software Engineer Undergraduate</h2>
			<ul className='resume-header__contact'>
				<li>
					<IconLink
						icon={faEnvelope}
						href={'mailto:' + contact.email}
						className='icon-link__icon--mail'
					>
						{contact.email}
					</IconLink>
				</li>
				{/* <li>
					<IconLink icon={faMobileAlt} href={'tel:+84-:' + contact.phone}>
						{contact.phone}
					</IconLink>
				</li> */}
				<li>
					<IconLink
						icon={faMapMarkerAlt}
						href={`https://www.google.com/maps/place/${contact.location}`}
					>
						{contact.location}
					</IconLink>
				</li>
				<li>
					<IconLink icon={faGlobe} href={media.website}>
						{chopSchema(media.website)}
					</IconLink>
				</li>
			</ul>
			<ul className='resume-header__media'>
				<li>
					<IconLink icon={faGithub} href={media.github}>
						{chopSchema(media.github)}
					</IconLink>
				</li>
				<li>
					<IconLink icon={faLinkedin} href={media.linkedIn}>
						{chopSchema(media.linkedIn)}
					</IconLink>
				</li>
				<li>
					<IconLink icon={faStackOverflow} href={media.stackoverflow}>
						{chopSchema(media.stackoverflow)}
					</IconLink>
				</li>
				<li>
					<IconLink icon={faFacebookF} href={media.facebook}>
						{chopSchema(media.facebook)}
					</IconLink>
				</li>
			</ul>
		</div>
		<div className='resume-summary'>
			<H2 id='summary' anchor='#summary' linebreak>
				Summary
			</H2>
			<div className='resume-summary__text'>
				<p>
					{summary
						.replace(/\[/g, '[<code>')
						.replace(/\]/g, '<code>]')
						.split(/[[\]]/)
						.map((p, index) => {
							const i1 = index + 1;

							if (p.startsWith('<code>')) {
								return (
									<code key={i1} className='inline-code'>
										{p.replace(/<code>/g, '')}
									</code>
								);
							}
							return <span key={i1}>{p}</span>;
						})}
				</p>
			</div>
		</div>
		<div className='resume-skill'>
			<H2 id='skills' anchor='#skills' linebreak>
				Skills
			</H2>
			<div className='resume-skill__info'>
				<div className='resume-skill__framework'>
					<h3 className='h3 mb-sm'>Frameworks and Libraries</h3>
					<ul className='resume-skill__list'>
						<li className='chip'>ReactJs</li>
						<li className='chip'>Webpack</li>
						<li className='chip'>Gulp</li>
						<li className='chip'>Bootstrap</li>
						<li className='chip'>Flutter</li>
						<li className='chip'>WPF</li>
					</ul>
				</div>
				<div className='resume-skill__language'>
					<h3 className='h3 mb-sm'>Languages</h3>
					<ul className='resume-skill__list'>
						<li className='chip chip--js'>JavaScript</li>
						<li className='chip chip--ts'>TypeScript</li>
						<li className='chip chip--scss'>SCSS</li>
						<li className='chip chip--dart'>Dart</li>
						<li className='chip chip--css'>CSS</li>
						<li className='chip chip--cs'>C#</li>
						<li className='chip chip--py'>Python</li>
						<li className='chip chip--bs'>Bash</li>
					</ul>
				</div>
				<div className='resume-skill__database'>
					<h3 className='h3 mb-sm'>Databases</h3>
					<ul className='resume-skill__list'>
						<li className='chip'>Firebase</li>
						<li className='chip'>Cloud Firestore</li>
						<li className='chip'>SQLite</li>
					</ul>
				</div>
				<div className='resume-skill__vcs'>
					<h3 className='h3 mb-sm'>Version Control</h3>
					<ul className='resume-skill__list'>
						<li className='chip'>Git</li>
					</ul>
				</div>
			</div>
		</div>
		<div className='resume-project'>
			<H2 id='projects' anchor='#projects' linebreak>
			Projects
			</H2>
			{projects.map((p) => (
				<ProjectPreview key={p.title} project={p} />
			))}
		</div>
	</main>
);

export default ResumePage;
