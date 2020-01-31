import React from 'react';
import styled from 'styled-components';
import ShinyBox from '../components/ShinyBox';
import theme from '../styles/theme';
import { maxWidth } from '../styles/util';

const links = {
	'University of Information Technology': 'https://en.uit.edu.vn',
	Castlevania: 'https://github.com/nearhuscarl/castlevania',
	'wizard hat': 'https://waitbutwhy.com/2017/04/neuralink.html',
};

const IntroBox = styled(ShinyBox)`
	/* override h1's normalize.css */
	h1 {
		margin: 0;
	}

	h2 {
		font-weight: 400;
	}
`;

function componentize(paragraph) {
	return paragraph
		.replace(/\[/g, '[<a>')
		.replace(/\]/g, '<a>]')
		.split(/[[\]]/)
		.map((p, index) => {
			const i1 = index + 1;

			if (p.startsWith('<a>')) {
				const text = p.replace(/<a>/g, '');
				return (
					<a key={i1} href={links[text]}>
						{text}
					</a>
				);
			}
			return <span key={i1}>{p}</span>;
		});
}

const Container = styled.main`
	position: relative;
`;
const HeaderBackground = styled.div`
	height: 15rem;
	background-image: linear-gradient(
		to right,
		${theme.secondaryColors[400]},
		${theme.secondaryColors[500]}
	);
`;
const Header = styled.header`
	width: 50%;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${theme.white};
	text-align: center;
	border-radius: ${theme.borderRound};

	${maxWidth(705)} {
		width: 75%;
		margin: 1rem auto;
	}
	${maxWidth(490)} {
		width: 90%;
	}
`;
const Body = styled.div`
	padding: 8rem 5rem;
	padding-top: 12rem;
	margin-top: -1rem;
	font-size: 1.5rem;

	& > p:not(:last-child) {
		margin-bottom: 2rem;
	}

	${maxWidth(590)} {
		padding-left: 3rem;
		padding-right: 3rem;
	}

	${maxWidth(490)} {
		padding-left: 2rem;
		padding-right: 2rem;
	}
`;

export default function AboutPage() {
	return (
		<Container>
			<HeaderBackground />
			<Header>
				<IntroBox>
					<h1>Near Huscarl</h1>
					<h2>Front-end developer in the making</h2>
				</IntroBox>
			</Header>
			<Body>
				<p>
					{componentize(`My name is Nguyen. I am currently a senior at
					[University of Information Technology]. In my four-year at uni,
					I have written a lot of small and medium projects using various
					programming languages and frameworks, ranging from terminal
					utility scripts, web scrapers, libraries, UI mockups, some niché
					android apps to desktop app, video games and web app.`)}
				</p>
				<p>
					{componentize(`My largest project, [Castlevania] is a 2D game remake of the same
					title. It is one of the only 2 projects (need citation) to achieve
					the absolute score in Introduction to Game Development in 2018,
					one of the most challenging courses in Software Engineering major
					where I am taking.`)}
				</p>
				<p>
					{`I care a lot about creating beautiful, intuitive,
					high-performance web apps using latest technologies and
					frameworks. Coding is not easy, that is why I always try my best
					to make my code as clean and readable as possible whenever I can,
					so it can be easily read, maintained and reused later by me or
					other people. My dream is to master Haskell and write a bot that
					can fix all of the garbage code that I have written when I was
					young.`}
				</p>
				<p>
					{componentize(`When I am not coding. You can find me playing indie games,
					hitting the gym, reading blogs or watching Black Mirror episodes
					and contemplate about how the machine will one day kill us all
					and the only escape is a [wizard hat].`)}
				</p>
			</Body>
		</Container>
	);
}
