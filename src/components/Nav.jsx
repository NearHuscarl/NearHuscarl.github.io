import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
	return (
		<nav>
			<ul className='nav'>
				<li>
					<Link className='btn-link' to='/'>
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
