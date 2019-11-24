import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default function Nav({ show, hideNav }) {
	return (
		<nav
			className={classNames({
				nav: true,
				'nav--open': show,
			})}
		>
			<ul className='nav__menu'>
				<li>
					<Link onClick={hideNav} className='btn-link' to='/'>
						Portfolio
					</Link>
				</li>
				<li>
					<Link onClick={hideNav} className='btn-link' to='/resume'>
						Resumé
					</Link>
				</li>
				<li>
					<Link onClick={hideNav} className='btn-link' to='/about'>
						About
					</Link>
				</li>
			</ul>
		</nav>
	);
}

Nav.propTypes = {
	show: PropTypes.bool,
	hideNav: PropTypes.func.isRequired,
};

Nav.defaultProps = {
	show: false,
};
