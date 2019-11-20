import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
	return (
		<footer className='footer'>
			<p className='footer__copyright'>
				{`Near Huscarl © ${new Date().getFullYear()} | All Rights Reserved`}
			</p>
			<div className='footer__source'>
				<a
					className='footer__icon-background'
					href='https://github.com/nearhuscarl/portfolio'
				>
					<FontAwesomeIcon
						className='footer__icon'
						size='2x'
						icon={faGithub}
					/>
					<span>Source Code</span>
				</a>
			</div>
		</footer>
	);
}
