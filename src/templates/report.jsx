import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { graphql } from 'gatsby';
import CSS from '../styles';

const IFrame = styled.iframe`
	width: calc(100vw);
	height: calc(100vh);
	border: none;
`;

const NoScrollBar = createGlobalStyle`
	body,
	.__gatsby {
		overflow: hidden;
	}
`;

const ReportPage = (props) => {
	const { name, publicURL } = props.data.file;

	return (
		<>
			<CSS />
			<NoScrollBar />
			<IFrame title={name} src={publicURL} />
		</>
	);
};

export default ReportPage;

export const pageQuery = graphql`
	query($name: String!) {
		file(name: { eq: $name }, extension: { eq: "html" }) {
			name
			publicURL
		}
	}
`;
