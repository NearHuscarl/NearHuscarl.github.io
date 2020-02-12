import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { FixedObject } from 'gatsby-image';
import {
	AllImagesQuery,
	GatsbyImageSharpFixedFragment,
} from '../../graphql-types';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';
import { Linebreak } from '../components/Toolkit';
import theme from '../styles/theme';
import { opacity, maxWidth, darken } from '../styles/util';
import Layout from '../components/Layout';
import forceCast from '../helpers/forceCast';

const Intro = styled.header`
	padding: 4rem;
	background-color: ${theme.greyLight0};
	height: 70vh;
	max-height: 60rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	${maxWidth(705)} {
		align-items: center;
		text-align: center;
	}

	h1 {
		color: ${darken(theme.secondaryColors[500], 6.5)};
		text-shadow: 1px 2px 10px ${opacity(theme.secondaryColors[500], 0.25)};
		transition: all 0.25s;
	}

	h2 {
		/* background-color: ${theme.greyDark3}; */
		color: ${theme.greyDark2};

		p {
			font-size: inherit;
			margin: 0;
		}

		.delimiter {
			display: none;
		}

		${maxWidth(590)} {
			.delimiter,
			p {
				display: inline;
			}
		}
	}
`;
const Portfolio = styled.section`
	padding: 6rem 3rem;

	${maxWidth(775)} {
		padding: 4rem 3.5rem;
	}
`;
const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
	gap: 2rem;
	justify-content: end;

	& > a {
		display: flex;
		justify-content: center;
	}
`;

type FixedImages = { [key: string]: GatsbyImageSharpFixedFragment };

const useFixedImages = (): FixedImages => {
	const data: AllImagesQuery = useStaticQuery(graphql`
		query AllImages {
			allFile(
				filter: {
					extension: { regex: "/(jpg)|(png)|(jpeg)/" }
					relativeDirectory: { eq: "images" }
				}
			) {
				edges {
					node {
						base
						childImageSharp {
							fixed(width: 300, height: 180) {
								...GatsbyImageSharpFixed
							}
						}
					}
				}
			}
		}
	`);
	const images: FixedImages = {};
	data.allFile.edges.forEach((e) => {
		if (e.node.childImageSharp?.fixed) {
			images[e.node.base] = e.node.childImageSharp.fixed;
		}
	});
	return images;
};

const HomePage = (): JSX.Element => {
	const images = useFixedImages();

	return (
		<Layout>
			<main>
				<Intro>
					<h1>Front-end Developer</h1>
					<h2>
						<p>Senior at University of Information Technology</p>
						<p className='delimiter'>.</p>
						<p>Looking for an internship in 2020</p>
					</h2>
				</Intro>
				<Portfolio>
					<h2 id='portfolio'>Portfolio</h2>
					<Linebreak />
					<CardGrid>
						{projects.map((p) => (
							<ProjectCard
								key={p.title}
								image={forceCast<FixedObject>(images[p.image])}
								title={p.title}
								technology={p.technologies}
								link={p.link}
							/>
						))}
					</CardGrid>
				</Portfolio>
			</main>
		</Layout>
	);
};

export default HomePage;
