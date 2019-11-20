import React from 'react';
import { propjectProps } from '../data/projects';
import chopSchema from '../helpers/chopSchema';
import { H3 } from './Headings';

export default function ProjectPreview({ project }) {
	return (
		<article className='project-preview'>
			<H3>{project.title}</H3>
			<span className='project-preview__date'>{project.date}</span>
			<p>
				<strong>Technologies:</strong> {project.technologies.join(', ')}
			</p>
			<p>
				<strong>Summary:</strong> {project.description}
			</p>
			<p>
				<strong>Url:</strong>{' '}
				<a href={project.link} className='btn-link btn-link--dark'>
					{chopSchema(project.link)}
				</a>
			</p>
		</article>
	);
}

ProjectPreview.propTypes = {
	project: propjectProps.isRequired,
};
