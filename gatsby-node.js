/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const express = require('express');
const path = require('path');

exports.onCreateDevServer = ({ app }) => {
	// currently static html files do not show properly in development mode
	// (work fine in production though). Workaround explained:
	// https://github.com/gatsbyjs/gatsby/issues/13072#issuecomment-552132869
	app.use(express.static('public'));
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const reportTemplate = path.resolve(`src/templates/report.tsx`);
	const result = await graphql(
		`
			query AuditFiles {
				allFile(
					filter: {
						extension: { eq: "html" }
						relativeDirectory: { eq: "audits" }
					}
				) {
					edges {
						node {
							name
							publicURL
						}
					}
				}
			}
		`,
	);

	if (result.errors) {
		throw result.errors;
	}

	// Create audit reports pages.
	result.data.allFile.edges.forEach((edge) => {
		const { name, publicURL } = edge.node;
		createPage({
			// Path for this page — required
			path: `/audits/${name}`,
			component: reportTemplate,
			context: {
				name,
				publicURL,
			},
		});
	});
};
