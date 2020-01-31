import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
	faEnvelope,
	faGlobe,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
	faGithub,
	faStackOverflow,
	faLinkedin,
	faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
import IconLink, { CollapsableIconLink } from '../components/IconLink';
import scrollToTop from '../hooks/scrollToTop';
import { H2, H3 } from '../components/Headings';
import { Link, Chip } from '../components/Toolkit';
import contact from '../data/contact';
import media from '../data/media';
import projects from '../data/projects';
import ProjectPreview from '../components/ProjectPreview';
import chopSchema from '../helpers/chopSchema';
import theme, { colors } from '../styles/theme';
import { maxWidth } from '../styles/util';

const summary = `Senior at UIT, perfectionist, have great attention to details, love
coding and open source. Very eager to learn new trending frameworks
and technologies. Technologies used: [React], [SCSS], [Webpack], [Gulp], [Flutter], [Git]. Depend
on the project's requirement, I can seek to learn new technology
quickly and integrate to the team's workflow.`;

const TechChip = ({ tech, children }) => (
	<Chip as='li' tech={tech}>
		{children}
	</Chip>
);
TechChip.propTypes = Chip.propTypes;

const LightH3 = styled(H3)`
	font-weight: 400;
`;

const ProjectGrid = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(32.7rem, 1fr));
	gap: 2rem;
`;
const Container = styled.main`
	/* A4 size: 210 x 297 mm */
	/* 0.70707070707070707070707070707071‬ */
	height: calc(${theme.pageContainerWidth} / 0.707070707);

	border-radius: inherit;
	overflow: hidden;

	${maxWidth(1000)} {
		height: auto;
	}
`;
const Header = styled.div`
	/* TODO: don't inherit when in /resume-full */
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;

	display: grid;
	grid-template-columns: 1fr max-content;
	grid-template-rows: repeat(3, min-content);
	grid-template-areas:
		'name___ media__'
		'title__ media__'
		'contact media__';
	padding: 3rem 5rem;
	background-color: ${colors.blueGrey[900]};
	color: ${theme.greyLight3};

	${maxWidth(775)} {
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas:
			'name___ name___'
			'title__ title__'
			'media__ contact';

		padding: 3rem 3.5rem;
		justify-items: center;
		column-gap: 6rem;
	}

	${maxWidth(590)} {
		column-gap: 2rem;
	}

	${maxWidth(490)} {
		grid-template-columns: 1fr;
		grid-template-areas:
			'name___'
			'title__'
			'media__'
			'contact';

		padding: 1.5rem;
		padding-bottom: 1.75rem;
		column-gap: 0;
	}

	h1 {
		grid-area: name___;
		font-weight: 400;
		color: ${theme.greyLight3};
		text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.8);
		margin: 0; /* override normalize.css */

		${maxWidth(775)} {
			text-align: center;
		}
	}

	h2 {
		grid-area: title__;
		font-weight: 400;
		color: ${theme.secondary};
		text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.6);
		margin-bottom: 1rem;

		${maxWidth(775)} {
			text-align: center;
			margin-bottom: 1.5rem;
		}
	}

	.contact {
		grid-area: contact;

		display: grid;
		grid-template-columns: repeat(3, max-content);
		gap: 1rem;
		/* width: 60rem; */

		${maxWidth(775)} {
			justify-self: flex-start;

			grid-template-columns: 1fr;
			align-content: flex-start;
			font-size: 1.15rem;
		}
		${maxWidth(490)} {
			justify-self: center;
		}
	}

	.media {
		grid-area: media__;

		display: grid;
		align-items: center;
		font-size: 1.15rem;
		gap: 1rem;

		${maxWidth(775)} {
			justify-self: flex-end;
		}
		${maxWidth(490)} {
			justify-self: center;
			grid-template-columns: repeat(4, 1fr);
			gap: 4rem;
			margin-bottom: 1.5rem;
		}
	}
`;
const Line = styled.div`
	height: 0.75rem;
	width: 100%;
	background-image: linear-gradient(
		to right,
		${theme.primary},
		${theme.primaryColors[600]}
	);
`;
const Summary = styled.div`
	padding: 4rem 5rem;
	padding-bottom: 2rem;

	p {
		font-size: 1.5rem;
	}

	${maxWidth(775)} {
		padding: 2rem 3.5rem;
	}

	${maxWidth(490)} {
		padding: 2rem;
	}
`;
const Skills = styled.div`
	padding: 2rem 5rem;
	width: 100%;

	${maxWidth(775)} {
		padding: 2rem 3.5rem;
	}

	${maxWidth(490)} {
		padding: 2rem;
	}
`;
const SkillGrid = styled.div`
	display: grid;
	grid-template-columns: max-content 1fr;
	align-items: center;
	gap: 2rem 6rem;

	${maxWidth(490)} {
		grid-template-columns: 1fr;
	}

	.language,
	.framework {
		grid-column: 1 / -1;
	}

	h3 {
		margin-bottom: 1rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		margin: -1rem;

		& > * {
			margin: 0.75rem 0;
		}

		& > :not(:last-child) {
			margin-right: 1rem;
		}

		${maxWidth(490)} {
			justify-content: center;
		}
	}

	${maxWidth(590)} {
		.database {
			grid-column: 1 / -1;
		}
	}
`;

const Projects = styled.section`
	padding: 2rem 5rem;
	font-size: 1.5rem;

	${maxWidth(775)} {
		padding: 2rem 3.5rem;
	}

	${maxWidth(490)} {
		padding: 2rem;
	}
`;
const Education = styled.div`
	padding: 2rem 5rem;
	padding-bottom: 4.5rem;

	/* content */
	& > :last-child {
		line-height: 1.75;
	}

	small {
		color: ${theme.primaryColors[700]};
		font-size: 1.4rem;
		font-weight: 600;
	}

	${maxWidth(775)} {
		padding: 2rem 3.5rem;
		padding-bottom: 4rem;
	}

	${maxWidth(490)} {
		padding: 2rem;
		padding-bottom: 4rem;
	}
`;

const ResumePage = ({ location }) => {
	if (location.pathname === '/resume-full') {
		scrollToTop();
	}

	return (
		<Container>
			<Header>
				<h1>Nguyễn Khánh Nguyên</h1>
				<h2>Software Engineer Undergraduate</h2>
				<ul className='contact'>
					<li>
						<IconLink icon={faEnvelope} href={'mailto:' + contact.email}>
							{contact.email}
						</IconLink>
					</li>

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
				<ul className='media'>
					<li>
						<CollapsableIconLink icon={faGithub} href={media.github}>
							{chopSchema(media.github)}
						</CollapsableIconLink>
					</li>
					<li>
						<CollapsableIconLink icon={faLinkedin} href={media.linkedIn}>
							{chopSchema(media.linkedIn)}
						</CollapsableIconLink>
					</li>
					<li>
						<CollapsableIconLink
							icon={faStackOverflow}
							href={media.stackoverflow}
						>
							{chopSchema(media.stackoverflow)}
						</CollapsableIconLink>
					</li>
					<li>
						<CollapsableIconLink icon={faFacebookF} href={media.facebook}>
							{chopSchema(media.facebook)}
						</CollapsableIconLink>
					</li>
				</ul>
			</Header>
			<Line />
			<Summary>
				<H2 id='summary' anchor='#summary' linebreak>
					Summary
				</H2>
				<div>
					<p>
						{summary
							.replace(/\[/g, '[<code>')
							.replace(/\]/g, '<code>]')
							.split(/[[\]]/)
							.map((p, index) => {
								const i1 = index + 1;
								if (p.startsWith('<code>')) {
									return (
										<code key={i1}>{p.replace(/<code>/g, '')}</code>
									);
								}
								return <span key={i1}>{p}</span>;
							})}
					</p>
				</div>
			</Summary>
			<Skills>
				<H2 id='skills' anchor='#skills' linebreak>
					Skills
				</H2>
				<SkillGrid>
					<div className='framework'>
						<h3>Frameworks and Libraries</h3>
						<ul>
							<TechChip>ReactJs</TechChip>
							<TechChip>Webpack</TechChip>
							<TechChip>Gulp</TechChip>
							<TechChip>Bootstrap</TechChip>
							<TechChip>Flutter</TechChip>
							<TechChip>WPF</TechChip>
						</ul>
					</div>
					<div className='language'>
						<h3>Languages</h3>
						<ul>
							<TechChip tech='js'>JavaScript</TechChip>
							<TechChip tech='ts'>TypeScript</TechChip>
							<TechChip tech='scss'>SCSS</TechChip>
							<TechChip tech='dart'>Dart</TechChip>
							<TechChip tech='css'>CSS</TechChip>
							<TechChip tech='cs'>C#</TechChip>
							<TechChip tech='py'>Python</TechChip>
							<TechChip tech='bash'>Bash</TechChip>
						</ul>
					</div>
					<div className='database'>
						<h3>Databases</h3>
						<ul>
							<TechChip>Firebase</TechChip>
							<TechChip>Cloud Firestore</TechChip>
							<TechChip>SQLite</TechChip>
						</ul>
					</div>
					<div>
						<h3>Version Control</h3>
						<ul>
							<TechChip>Git</TechChip>
						</ul>
					</div>
				</SkillGrid>
			</Skills>
			<Projects>
				<H2 id='projects' anchor='#projects' linebreak>
					Personal Projects
				</H2>
				<ProjectGrid>
					{projects.map((p) => (
						<ProjectPreview key={p.title} project={p} />
					))}
				</ProjectGrid>
			</Projects>
			<Education>
				<H2 id='education' anchor='#education' linebreak>
					Education
				</H2>
				<div>
					<H3>Software Engineering</H3>
					<LightH3>
						<Link as='a' href='https://en.uit.edu.vn' dark>
							University of Information Technology
						</Link>
					</LightH3>
					<small>06/2016 - Present</small>
				</div>
			</Education>
		</Container>
	);
};

const ResumePageWithRouter = withRouter((props) => (
	<ResumePage location={props.location} />
));

export default ResumePageWithRouter;
