import React from 'react';
import styled from 'styled-components';
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react';
import { H1, H2, H3, H4 } from './Headings';

const Heading1 = styled(H1)`
	margin-top: 2rem;
`;
const Heading2 = styled(H2)`
	margin-top: 2rem;
`;

const defaultComponents: MDXProviderComponents = {
	h1: (props) => {
		const content = props.children;
		// eslint-disable-next-line react/jsx-props-no-spreading
		return (
			<Heading1 id={content} linebreak>
				{content}
			</Heading1>
		);
	},
	h2: (props) => {
		const content = props.children;
		// eslint-disable-next-line react/jsx-props-no-spreading
		return (
			<Heading2 id={content} linebreak>
				{content}
			</Heading2>
		);
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

type ProviderProps = {
	children: React.ReactNode;
	components?: MDXProviderComponents;
};

const Provider = (props: ProviderProps): JSX.Element => {
	const { children, components = {} } = props;
	const effectiveComponents = { ...defaultComponents, ...components };
	return (
		<MDXProvider components={effectiveComponents}>{children}</MDXProvider>
	);
};

export default Provider;
