import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { FixedObject } from 'gatsby-image';
import {
	AllImagesQuery,
	GatsbyImageSharpFixedFragment,
} from '../../graphql-types';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';
import { Linebreak } from '../components/Toolkit';
import theme, { colors } from '../styles/theme';
import { opacity, maxWidth, darken, mix } from '../styles/util';
import Layout from '../components/Layout';
import forceCast from '../helpers/forceCast';

const IntroBackground = styled.div`
	background-color: ${theme.greyLight1};
`;
const Intro = motion.custom(styled.header`
	padding: 4rem;
	height: 70vh;
	max-height: 60rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	overflow: hidden;

	${maxWidth(705)} {
		align-items: center;
		text-align: center;
	}

	h1 {
		color: ${darken(theme.secondaryColors[500], 10)};
		text-shadow: 1px 2px 10px ${opacity(theme.secondaryColors[500], 0.25)};
		z-index: 1;
		transform: rotate(0); /* Create stacking context to hide the squares */
	}

	h2 {
		/* background-color: ${theme.greyDark3}; */
		color: ${theme.greyDark2};
		z-index: 1;
		transform: rotate(0);

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
`);

type SquareProps = {
	x: number;
	y: number;
	width?: number;
	height?: number;
	scale?: number;
	angle?: number; // deg
};
const Square = motion.custom(styled.div<SquareProps>`
	left: ${(p) => p.x}%;
	top: ${(p) => p.y}%;
	background: ${mix(theme.greyLight2, theme.greyLight3, 25)};
	width: ${(p) => p.width}rem;
	height: ${(p) => p.height}rem;
	transform: rotate(${(p) => p.angle}deg) scale(${(p) => p.scale});
	position: absolute;
	z-index: 0;
`);
Square.defaultProps = {
	width: 6,
	height: 6,
	scale: 1,
	angle: 0,
};

const Portfolio = styled.section`
	padding: 6rem 3rem;

	${maxWidth(775)} {
		padding: 4rem 3.5rem;
	}

	${maxWidth(375)} {
		padding: 2rem 1rem;
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

	${maxWidth(375)} {
		grid-template-columns: 1fr;
		gap: 0;

		/* 100% width in container with horizontal padding 1rem */
		width: calc(100% + 2rem);
		margin-left: -1rem;

		& > a > *,
		& > a > * > .gatsby-image-wrapper {
			width: 100% !important;
		}
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

const variants: Variants = {
	hidden: {
		x: -50,
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			staggerChildren: 0.25,
			duration: 0.5,
		},
	},
};

function squareVariants(rotation: number, scale: number): Variants {
	const v: Variants = {
		initial: {
			scale,
			rotate: rotation - 90,
		},
		animate: {
			scale,
			rotate: rotation,
			transition: {
				duration: 1.25,
			},
		},
	};
	return v;
}

const HomePage = (): JSX.Element => {
	const images = useFixedImages();

	return (
		<Layout>
			<main>
				<IntroBackground>
					<Intro
						variants={variants}
						initial='hidden'
						animate='visible'
						style={{ position: 'relative' }}
					>
						<motion.h1 variants={variants}>Near Huscarl</motion.h1>
						<h2>
							<motion.p variants={variants}>
								Web developer, scripter, modder, gamer.
							</motion.p>
							<p className='delimiter'> </p>
							<motion.p variants={variants}>
								I write code to reduce human suffering.
							</motion.p>
							{/* Currently working at __ */}
						</h2>
						<Square x={75} y={10} {...squareVariants(35, 4)} />
						<Square x={90} y={80} {...squareVariants(45, 2.5)} />
						<Square x={15} y={80} {...squareVariants(10, 2)} />
					</Intro>
				</IntroBackground>
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
