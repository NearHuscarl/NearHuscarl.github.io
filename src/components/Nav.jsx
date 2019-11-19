import React from 'react';
// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

export default function Nav() {
	return (
		<nav>
			<ul className='nav'>
				<li>
					<Link className='btn-link' to='/#portfolio' smooth>
						Portfolio
					</Link>
				</li>
				<li>
					<Link className='btn-link' to='/resume'>
						Resumé
					</Link>
				</li>
				<li>
					<a className='btn-link' href='#about'>
						About
					</a>
				</li>
			</ul>
		</nav>
	);
}
