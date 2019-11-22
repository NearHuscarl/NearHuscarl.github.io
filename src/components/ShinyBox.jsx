import React from 'react';
import PropTypes from 'prop-types';

export default function ShinyBox({ children, className }) {
	return (
		<div className='shiny-box'>
			<div className='shiny-box__shadow-tl-wrap'>
				<div className='shiny-box__shadow-tl' />
			</div>
			<div className='shiny-box__shadow-br-wrap'>
				<div className='shiny-box__shadow-br' />
			</div>
			<div className='shiny-box__container'>{children}</div>
		</div>
	);
}

ShinyBox.propTypes = {
	children: PropTypes.node.isRequired,
};
