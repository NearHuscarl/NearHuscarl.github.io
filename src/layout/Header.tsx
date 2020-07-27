/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/free-solid-svg-icons/faBars';
import faTimes from '@fortawesome/free-solid-svg-icons/faTimes';
import Nav from '../components/Nav';
import { MenuButton } from '../components/Toolkit';
import Logo from '../components/Logo';

const Container = styled.header`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	padding: 2rem;
`;
const HeaderLogo = styled.div`
	display: flex;
	align-items: center;

	& > :first-child {
		margin-right: 1.5rem;
	}
`;
const Title = styled.h1`
	font-size: 2rem;
	margin: 0;
`;
const Subtitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 500;
	margin: 0;
`;

function Header(): JSX.Element {
	const [showMenu, setShowMenu] = React.useState(false);

	return (
		// add this sejda's class to remove this element when converting from
		// html to pdf
		// https://www.sejda.com/developers#html-pdf-api-options
		<Container className='--hide-from-pdf'>
			<HeaderLogo>
				<Link aria-label='Logo' to='/'>
					{/* TODO: how to add default props when using styled-component */}
					<Logo small={false} />
				</Link>
				<div>
					<Title>Near Huscarl</Title>
					<Subtitle>Web Developer</Subtitle>
				</div>
			</HeaderLogo>
			<MenuButton
				showMenu={showMenu}
				type='button'
				onClick={() => setShowMenu(() => !showMenu)}
			>
				<FontAwesomeIcon className='close' icon={faTimes} />
				<FontAwesomeIcon icon={faBars} />
			</MenuButton>
			<Nav
				visible={showMenu}
				handleHideNav={() => setShowMenu(() => false)}
			/>
		</Container>
	);
}

export default Header;
