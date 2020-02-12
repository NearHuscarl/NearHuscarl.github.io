import React from 'react';
import styled from 'styled-components';
import sample from 'lodash/sample';
import { Link } from '../components/Toolkit';
import Layout from '../components/Layout';
import theme from '../styles/theme';
import { opacity, darken } from '../styles/util';

// TODO: add life advices and jokes generator from reddit (askreddit)
const lifeAdvices = [
	'Before you go back, remember to stay hydrated',
	"You can't live a meaningful life in a day but you can have a slightly better day at a time. Strive towards having a better day first, start with one conversation, one relationship at a time. And give yourself time to grow and get results. Consistent effort is what it takes to be better",
	"Life doesn't get better. The only thing that you can get better is yourself. Your goal is to be strong and resilient to deal with life and develop a healthy way to cope. Because life won't change, but you can change and grow.",
	'Don’t take advice from a bunch of socially-retarded children on Reddit. Talk to a therapist.',
];

const jokes = ['Say what you want about deaf people.'];

const didYouKnow = [
	'Romania has searched for more Scooby-Doo porn than any other country',
	"An elephant's penis is prehensile just like their trunks. This is because they are too big to thrust so the penis does the thrusting on its own.",
	'A boar can ejaculate up to 500 ml of semen. That’s almost 17 fluid ounces.',
	'Men who climb Mt. Everest tend to get boners during the climb due to how the extreme elevation impacts blood pressure and circulation.',
	'Female pigs orgasm for up to 30 minutes.',
];

const shuffle = (str?: Array<string>): string => sample(str) || '';

function randomBetween(min: number, max: number): number {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function lowerCaseFirstChar(str: string): string {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

function getRandomQuote(): string {
	const type = randomBetween(1, 3);

	switch (type) {
		case 1:
			return shuffle(lifeAdvices);
		case 2:
			return `Here is a joke to cheer you up: ${shuffle(jokes)}`;
		case 3:
			return `Did you know that ${lowerCaseFirstChar(shuffle(didYouKnow))}`;
		default:
			return '';
	}
}

const Container = styled.main`
	min-height: calc(
		100vh - 11rem - 8rem - ${theme.pageContainerVertPadding} * 2
	);
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${theme.greyLight0};

	h1 {
		margin: 0;
		line-height: 1;
		font-weight: 500;
		color: ${darken(theme.primary, 16)};
		text-shadow: 0 0 0.75rem ${opacity(theme.primary, 0.75)};
	}

	p {
		font-size: 1.8rem;
		text-align: center;
		width: 80%;
	}

	a {
		font-size: 2rem;
		font-weight: 500;
		text-shadow: none;
	}
`;

const NotFoundPage = (): JSX.Element => (
	<Layout title='404'>
		<Container>
			<h1>404</h1>
			<h2>Page not found :(</h2>
			{/* TODO: add svg 404 image */}
			<p>{getRandomQuote()}</p>
			<Link to='/'>Go home</Link>
		</Container>
	</Layout>
);

export default NotFoundPage;
