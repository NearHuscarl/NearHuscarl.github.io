import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	/* create a new stacking context to cast shadow
    https://stackoverflow.com/a/10814448/9449426 */
	transform: translate(0);
	border-radius: inherit;

	& > * {
		text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
	}

	.top-left,
	.bottom-right {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		border-radius: inherit;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: white;
			border-radius: inherit;
		}
	}

	.top-left {
		filter: drop-shadow(-0.3rem -0.3rem 1rem rgba(255, 255, 255, 0.25));

		&::before {
			clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
		}
	}
	.bottom-right {
		filter: drop-shadow(0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.1));

		&::before {
			clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%);
		}
	}
`;

const Content = styled.div`
	background-color: white;
	padding: 1.5rem;
	z-index: 0;
	border-radius: inherit;
`;

type ShinyBoxProps = {
	className?: string;
	children: React.ReactNode;
};

export default function ShinyBox(props: ShinyBoxProps): JSX.Element {
	const { className, children } = props;
	return (
		<Container className={className}>
			<div className='top-left' />
			<div className='bottom-right' />
			<Content>{children}</Content>
		</Container>
	);
}
