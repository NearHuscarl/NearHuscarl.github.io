import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectCard({ image, title, link, technology }) {
	return (
		<a
			href={link}
			alt='project repo'
			target='_blank'
			rel='noopener noreferrer'
		>
			<div className='card'>
				<img className='card__img' src={image} alt='project preview' />
				<div className='card__info'>
					<h3 className='card__title h3'>{title}</h3>
					<p className='card__tech'>{technology.join(', ')}</p>
				</div>
			</div>
		</a>
	);
}

ProjectCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	technology: PropTypes.arrayOf(PropTypes.string).isRequired,
	link: PropTypes.string.isRequired,
};
