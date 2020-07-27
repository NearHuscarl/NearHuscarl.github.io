/* eslint-disable @typescript-eslint/camelcase */

require('dotenv').config({
	path: '.env.public',
});

module.exports = {
	siteMetadata: {
		title: `Portfolio`,
		description: `Portfolio about NearHuscarl`,
		author: `@nearhuscarl`,
	},
	plugins: [
		`gatsby-plugin-typescript`,
		`gatsby-plugin-graphql-codegen`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `assets`,
				path: `${__dirname}/src/assets`,
			},
		},
		`gatsby-plugin-mdx`,
		`gatsby-plugin-styled-components`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/assets/images/icon.png`, // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
