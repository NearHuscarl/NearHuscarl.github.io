import React from 'react';
import styled from 'styled-components';
import { Link } from './Toolkit';
import { maxWidth, is } from '../styles/util';
import theme from '../styles/theme';

type ContainerProps = {
	visible: boolean;
};

const Container = styled.nav<ContainerProps>`
	ul {
		display: flex;
		font-size: 1.5rem;
		padding-right: 2rem;

		& > :not(:last-child) {
			margin-right: 1.5rem;
		}

		${maxWidth(900)} {
			padding-right: 0;
		}

		a {
			text-shadow: none;
		}
	}

	${maxWidth(490)} {
		display: none;

		${is('visible')} {
			flex: 0 0 100%;
			display: block;
		}

		${is('visible')} ul {
			display: flex;
			flex-direction: column;
			padding-top: 1rem;

			& > * {
				width: 100%;
				text-align: center;
				padding: 1rem 0;
			}

			& > :nth-child(even) {
				border-top: 0.1rem solid ${theme.greyLight1};
				border-bottom: 0.1rem solid ${theme.greyLight1};
			}

			& > :last-child {
				padding-bottom: 0;
			}
		}
	}
`;

type NavProps = {
	visible: boolean;
	handleHideNav: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function Nav(props: NavProps): JSX.Element {
	const { visible = false, handleHideNav } = props;
	return (
		<Container visible={visible}>
			<ul>
				<li>
					<Link onClick={handleHideNav} to='/'>
						Portfolio
					</Link>
				</li>
				<li>
					<Link onClick={handleHideNav} to='/resume'>
						Resumé
					</Link>
				</li>
				<li>
					<Link onClick={handleHideNav} to='/about'>
						About
					</Link>
				</li>
			</ul>
		</Container>
	);
}
