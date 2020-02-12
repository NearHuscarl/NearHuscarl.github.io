import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import colors from '../styles/colors';
import curves from '../styles/curves';
import selectors from '../styles/selectors';
import theme from '../styles/theme';

const slideRotateAnimation = css`
	transition: width 0.65s ${curves.easeOutBackward},
		color 0.65s ${curves.easeOutBackward};

	&:hover {
		color: ${theme.primary};
		transition: width 0.6s ${curves.easeOutBack}, color 0.6s;
	}

	& ${selectors.icon} {
		transition: transform 0.65s ${curves.easeOutBackward};
	}

	&:hover ${selectors.icon} {
		transform: rotate(-360deg);
		transition: transform 0.6s ${curves.easeOutBack};
	}
`;
const slideAnimation = css`
	transition: width 0.4s ${curves.easeOutQuart},
		color 0.4s ${curves.easeOutQuart};

	&:hover {
		color: ${theme.primary};
		transition: width 0.4s ${curves.easeOutQuart}, color 0.4s;
	}
`;

type ContainerProps = {
	rotate: 1 | 0;
	width: number;
};
const iconSize = '2rem';
const Container = styled.div<ContainerProps>`
	background-color: ${colors.blueGrey['800']};
	overflow: hidden;

	text-overflow: clip;
	white-space: nowrap;

	width: ${iconSize};
	height: ${iconSize};
	border-radius: 50rem;

	display: flex;
	align-items: center;

	.background {
		display: inline-flex;
		justify-content: center;
		align-items: center;

		margin-right: 0.7rem;
		background-color: ${colors.blueGrey['900']};
		border-radius: 50rem;
		height: 100%;
	}

	/* nested class to override font-awesome css width */
	& ${selectors.icon} {
		width: ${iconSize};
		height: calc(${iconSize} - 0.5rem);
	}

	/* no padding for round icon */
	& ${selectors.icon}.fa-github {
		height: ${iconSize};
	}

	/* calculate dynamic text width for animation because transition for width doesn't work withs auto */
	&:hover {
		width: ${(props) => props.width}rem;
	}

	${({ rotate }) => (rotate ? slideRotateAnimation : slideAnimation)}
`;

type ExpandableIconProps = {
	className?: string;
	icon: IconDefinition;
	text: string;
	rotate?: boolean;
};

export default function ExpandableIcon(
	props: ExpandableIconProps,
): JSX.Element {
	const { className, icon, text, rotate = false } = props;
	const [width, setWidth] = React.useState(0);
	const textRef = React.useRef<HTMLSpanElement>(null);

	React.useEffect(() => {
		setWidth(() => (textRef.current?.clientWidth || 0) / 10 + 3.75);
	}, [text]);

	return (
		<Container className={className} rotate={rotate ? 1 : 0} width={width}>
			<div className='background'>
				<FontAwesomeIcon size='1x' icon={icon} />
			</div>
			<span ref={textRef}>{text}</span>
		</Container>
	);
}
