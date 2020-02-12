import React from 'react';
import styled from 'styled-components';
import chopSchema from '../helpers/chopSchema';
import { H3 } from './Headings';
import { Link } from './Toolkit';
import theme from '../styles/theme';
import { darken, opacity } from '../styles/util';
import { Project } from '../data/projects';

const Container = styled.article`
	font-size: 1.35rem;
`;
const Title = styled(H3)`
	display: inline-block;
	margin-right: 1rem;
`;
const Date = styled.span`
	color: ${darken(theme.secondaryColors[700], 5)};
	text-shadow: 0.1rem 0.1rem 0.3rem ${opacity(theme.secondaryColors[700], 0.3)};
	font-weight: 600;
`;

export const ProjectGrid = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(32.7rem, 1fr));
	gap: 2rem;
`;

type ProjectPreviewProps = {
	project: Project;
};

export default function ProjectPreview(
	props: ProjectPreviewProps,
): JSX.Element {
	const { project } = props;
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
					<Link as='a' href={project.link} color='dark'>
						{chopSchema(project.link)}
					</Link>
				</li>
			</ul>
		</Container>
	);
}
