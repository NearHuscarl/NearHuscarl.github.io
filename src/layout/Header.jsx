/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

function Header() {
	return (
		<header className='header'>
			<div className='logo-group'>
				<Link to='/'>
					<div className='logo' />
				</Link>
				<div className='logo-group__text'>
					<h1 className='h1 h1--small'>Near Huscarl</h1>
					<h2 className='h2 h2--small'>Front-end Developer</h2>
				</div>
			</div>
			<Nav />
		</header>
	);
}

export default Header;
