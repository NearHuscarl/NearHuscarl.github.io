/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
	margin-bottom: 0;
`;
const Subtitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 500;
`;

function Header({ location }) {
	if (location.pathname === '/resume-full') {
		return null;
	}

	const [showMenu, setShowMenu] = React.useState(false);

	return (
		// add this sejda's class to remove this element when converting from
		// html to pdf
		// https://www.sejda.com/developers#html-pdf-api-options
		<Container className='--hide-from-pdf'>
			<HeaderLogo>
				<Link to='/'>
					<Logo />
				</Link>
				<div>
					<Title>Near Huscarl</Title>
					<Subtitle>Front-end Developer</Subtitle>
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

const HeaderWithRouter = withRouter((props) => (
	<Header location={props.location} />
));

export default HeaderWithRouter;
