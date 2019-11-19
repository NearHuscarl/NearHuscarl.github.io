import React from 'react';

export default function Footer() {
	return (
		<footer className='footer'>
			<p className='footer__copyright'>
				{`Near Huscarl © ${new Date().getFullYear()} | All Rights Reserved`}
			</p>
		</footer>
	);
}
