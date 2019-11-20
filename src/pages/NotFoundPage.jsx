import React from 'react';
import { Link } from 'react-router-dom';
import sample from 'lodash/sample';

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

function randomBetween(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function lowerCaseFirstChar(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

function getQuote() {
	const type = randomBetween(1, 3);

	switch (type) {
		case 1:
			return sample(lifeAdvices);
		case 2:
			return `Here is a joke to cheer you up: ${sample(jokes)}`;
		case 3:
			return `Did you know that ${lowerCaseFirstChar(sample(didYouKnow))}`;
		default:
			return '';
	}
}

const NotFoundPage = () => (
	<main className='not-found'>
		<h1 className='h1 not-found__404'>404</h1>
		<h2 className='h2'>Page not found :(</h2>
		<div className='not-found__life-advice'>{`${getQuote()}`}</div>
		<Link className='not-found__go-back btn-link' to='/'>
			Go home
		</Link>
	</main>
);

export default NotFoundPage;
