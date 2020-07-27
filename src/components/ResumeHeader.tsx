import React from 'react';
import styled from 'styled-components';
import {
	faEnvelope,
	faGlobe,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
	faGithub,
	faStackOverflow,
	faLinkedin,
	// TODO: wait until font-awesome has codesandbox icon
	// https://github.com/FortAwesome/Font-Awesome/issues/14949
	faCodepen,
} from '@fortawesome/free-brands-svg-icons';
import IconLink, { CollapsableIconLink } from './IconLink';
import contact from '../data/contact';
import media from '../data/media';
import chopSchema from '../helpers/chopSchema';
import theme, { colors } from '../styles/theme';
import { maxWidth } from '../styles/util';

const Header = styled.div`
	/* TODO: don't inherit when in /resume-full */
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;

	display: grid;
	grid-template-columns: 1fr max-content;
	grid-template-rows: repeat(3, min-content);
	grid-template-areas:
		'name___ media__'
		'title__ media__'
		'contact media__';
	padding: 3rem 5rem;
	background-color: ${colors.blueGrey[900]};
	color: ${theme.greyLight3};

	${maxWidth(775)} {
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas:
			'name___ name___'
			'title__ title__'
			'media__ contact';

		padding: 3rem 3.5rem;
		justify-items: center;
		column-gap: 6rem;
	}

	${maxWidth(590)} {
		column-gap: 2rem;
	}

	${maxWidth(490)} {
		grid-template-columns: 1fr;
		grid-template-areas:
			'name___'
			'title__'
			'media__'
			'contact';

		padding: 1.5rem;
		padding-bottom: 1.75rem;
		column-gap: 0;
	}

	h1 {
		grid-area: name___;
		font-weight: 400;
		color: ${theme.greyLight3};
		text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.8);
		margin: 0; /* override normalize.css */

		${maxWidth(775)} {
			text-align: center;
		}
	}

	h2 {
		grid-area: title__;
		font-weight: 400;
		color: ${theme.secondary};
		text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.6);
		margin-bottom: 1rem;

		${maxWidth(775)} {
			text-align: center;
			margin-bottom: 1.5rem;
		}
	}

	.contact {
		grid-area: contact;

		display: grid;
		grid-template-columns: repeat(3, max-content);
		gap: 1rem;
		/* width: 60rem; */

		${maxWidth(775)} {
			justify-self: flex-start;

			grid-template-columns: 1fr;
			align-content: flex-start;
			font-size: 1.15rem;
		}
		${maxWidth(490)} {
			justify-self: center;
		}
	}

	.media {
		grid-area: media__;

		display: grid;
		align-items: center;
		font-size: 1.15rem;
		gap: 1rem;

		${maxWidth(775)} {
			justify-self: flex-end;
		}
		${maxWidth(490)} {
			justify-self: center;
			grid-template-columns: repeat(4, 1fr);
			gap: 4rem;
			margin-bottom: 1.5rem;
		}
	}
`;

const ResumeHeader = (): JSX.Element => {
	return (
		<Header>
			<h1>Nguyễn Khánh Nguyên</h1>
			<h2>Software Engineer Undergraduate</h2>
			<ul className='contact'>
				<li>
					<IconLink
						icon={faEnvelope}
						aria-label='mail'
						href={'mailto:' + contact.email}
					>
						{contact.email}
					</IconLink>
				</li>

				<li>
					<IconLink
						icon={faMapMarkerAlt}
						aria-label='location'
						href={`https://www.google.com/maps/place/${contact.location}`}
					>
						{contact.location}
					</IconLink>
				</li>
				<li>
					<IconLink
						icon={faGlobe}
						aria-label='website'
						href={media.website}
					>
						{chopSchema(media.website)}
					</IconLink>
				</li>
			</ul>
			<ul className='media'>
				<li>
					<CollapsableIconLink
						icon={faGithub}
						aria-label='github'
						href={media.github}
					>
						{chopSchema(media.github)}
					</CollapsableIconLink>
				</li>
				<li>
					<CollapsableIconLink
						icon={faLinkedin}
						aria-label='linkedin'
						href={media.linkedIn}
					>
						{chopSchema(media.linkedIn)}
					</CollapsableIconLink>
				</li>
				<li>
					<CollapsableIconLink
						icon={faStackOverflow}
						aria-label='stackoverflow'
						href={media.stackoverflow}
					>
						{chopSchema(media.stackoverflow)}
					</CollapsableIconLink>
				</li>
				<li>
					<CollapsableIconLink
						icon={faCodepen}
						aria-label='codesandbox'
						href={media.codesandbox}
					>
						{chopSchema(media.codesandbox)}
					</CollapsableIconLink>
				</li>
			</ul>
		</Header>
	);
};

export default ResumeHeader;
