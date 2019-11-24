/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Nav from '../components/Nav';
import Logo from '../components/Logo';

function Header() {
	const [showMenu, setShowMenu] = useState(false);

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
			<button
				type='button'
				className={classNames({
					'header__menu-btn': true,
					'btn-icon': true,
					'header__menu-btn--open': showMenu,
				})}
				onClick={() => setShowMenu(() => !showMenu)}
			>
				<div className='header__menu-btn--before'>
					<FontAwesomeIcon className='btn-icon__icon' icon={faTimes} />
				</div>
				<FontAwesomeIcon className='btn-icon__icon' icon={faBars} />
			</button>
			<Nav show={showMenu} hideNav={() => setShowMenu(() => false)} />
		</header>
	);
}

export default Header;
