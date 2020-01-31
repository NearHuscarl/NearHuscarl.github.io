import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme';

const Card = styled.div`
	background-color: ${theme.greyLight2};
	border: solid 1px ${theme.greyLight2};
	border-radius: ${theme.borderRound};
	display: flex;
	flex-direction: column;
	transition: box-shadow 0.25s, transform 0.25s;

	&:hover {
		box-shadow: ${theme.shadowLight};
		transform: scale(1.048);
	}

	img {
		border-top-right-radius: inherit;
		border-top-left-radius: inherit;
		/* height / width = 0.6 */
		width: 30rem;
		height: 18rem;
		object-fit: cover;
	}

	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1.25rem;
		padding-bottom: 0.5rem;
	}

	.tech {
		color: ${theme.greyDark2};
		text-align: right;
		max-width: 14rem;
	}
`;

export default function ProjectCard({ image, title, link, technology }) {
	return (
		<a
			href={link}
			alt='project repo'
			target='_blank'
			rel='noopener noreferrer'
		>
			<Card>
				<img src={image} alt='project preview' />
				<div className='info'>
					<h3>{title}</h3>
					<p className='tech'>{technology.join(', ')}</p>
				</div>
			</Card>
		</a>
	);
}

ProjectCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	technology: PropTypes.arrayOf(PropTypes.string).isRequired,
	link: PropTypes.string.isRequired,
};
