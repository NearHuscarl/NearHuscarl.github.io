import React from 'react';
// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

export default function Nav() {
	return (
		<nav>
			<ul className='nav'>
				<li>
					<Link className='btn-link' to='/' smooth>
						Portfolio
					</Link>
				</li>
				<li>
					<Link className='btn-link' to='/resume'>
						Resumé
					</Link>
				</li>
				<li>
					<Link className='btn-link' to='/about'>
					About
					</Link>
				</li>
			</ul>
		</nav>
	);
}
