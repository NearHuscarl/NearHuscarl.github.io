import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import ExpandableIcon from '../components/ExpandableIcon';
import Logo from '../components/Logo';

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='footer__copyright'>
				<Logo small />
				<span>{`Near Huscarl © ${new Date().getFullYear()}`}</span>
			</div>
			<div className='footer__icons'>
				<a
					className='footer__link'
					href='https://github.com/NearHuscarl/portfolio/blob/master/LICENSE.md'
				>
					<ExpandableIcon icon={faBalanceScale} text='MIT License' />
				</a>
				<a
					className='footer__link'
					href='https://github.com/nearhuscarl/portfolio'
				>
					<ExpandableIcon icon={faGithub} text='Source Code' rotate />
				</a>
			</div>
		</footer>
	);
}
