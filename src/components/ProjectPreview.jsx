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

export default function ProjectPreview({ project }) {
	return (
		<Container>
			<Title>{project.title}</Title>
			<Date>{project.date}</Date>
			<p>
				<strong>Technologies:</strong> {project.technologies.join(', ')}
			</p>
			<p>
				<strong>Summary:</strong> {project.description}
			</p>
			<p>
				<strong>Url:</strong>{' '}
				<Link as='a' href={project.link} dark>
					{chopSchema(project.link)}
				</Link>
			</p>
		</Container>
	);
}

ProjectPreview.propTypes = {
	project: propjectProps.isRequired,
};
