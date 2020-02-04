import React from 'react';
import styled from 'styled-components';
import { propjectProps } from '../data/projects';
import chopSchema from '../helpers/chopSchema';
import { H3 } from './Headings';
import { Link } from './Toolkit';
import theme from '../styles/theme';

const Container = styled.article`
	font-size: 1.35rem;
`;
const Title = styled(H3)`
	display: inline-block;
	margin-right: 1rem;
`;
const Date = styled.span`
	color: ${theme.primaryColors[700]};
	font-weight: 600;
`;

export const ProjectGrid = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(32.7rem, 1fr));
	gap: 2rem;
`;

export default function ProjectPreview({ project }) {
	return (
		<Container>
			<Title>{project.title}</Title>
			<Date>{project.date}</Date>
			<ul>
				<li>
					<strong>Technologies:</strong> {project.technologies.join(', ')}
				</li>
				<li>
					<strong>Summary:</strong> {project.description}
				</li>
				<li>
					<strong>Url:</strong>{' '}
					<Link as='a' href={project.link} dark>
						{chopSchema(project.link)}
					</Link>
				</li>
			</ul>
		</Container>
	);
}

ProjectPreview.propTypes = {
	project: propjectProps.isRequired,
};
