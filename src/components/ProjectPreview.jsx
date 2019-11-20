import React from 'react';
import { propjectProps } from '../data/projects';

export default function ProjectPreview({ project }) {
	return (
		<article>
			<h3 className='h3'>{project.title}</h3>
			<p>{project.technologies.join(', ')}</p>
			<p>{project.description}</p>
			<p>{project.date}</p>
			<p>{'Url: ' + project.link}</p>
		</article>
	);
}

ProjectPreview.propTypes = {
	project: propjectProps.isRequired,
};
