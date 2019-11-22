/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Logo from '../components/Logo';

function Header() {
	return (
		// add this sejda's class to remove this element when converting from
		// html to pdf
		// https://www.sejda.com/developers#html-pdf-api-options
		<header className='header --hide-from-pdf'>
			<div className='header__logo'>
				<Link to='/'>
					<Logo />
				</Link>
				<div>
					<h1 className='h1 h1--small'>Near Huscarl</h1>
					<h2 className='h2 h2--small'>Front-end Developer</h2>
				</div>
			</div>
			<Nav />
		</header>
	);
}

export default Header;
