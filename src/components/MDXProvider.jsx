import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { H1, H2, H3, H4 } from './Headings';

const Heading1 = styled(H1)`
    margin-top: 2rem;
`;
const Heading2 = styled(H2)`
    margin-top: 2rem;
`;

const defaultComponents = {
	h1: (props) => {
		const content = props.children;
		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Heading1 id={content} linebreak>{content}</Heading1>;
	},
	h2: (props) => {
		const content = props.children;
		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Heading2 id={content} linebreak>{content}</Heading2>;
	},
	h3: (props) => {
		const content = props.children;
		// eslint-disable-next-line react/jsx-props-no-spreading
		return <H3 id={content}>{content}</H3>;
	},
	h4: H4,
	// pre: (props) => <div {...props} />,
	// code: (props) => <pre style={{ color: 'tomato' }} {...props} />,
};

const Provider = ({ children, components }) => {
	const effectiveComponents = { ...defaultComponents, ...components };
	return (
		<MDXProvider components={effectiveComponents}>{children}</MDXProvider>
	);
};

Provider.propTypes = {
	children: PropTypes.node.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	components: PropTypes.object,
};

Provider.defaultProps = {
	components: {},
};

export default Provider;
