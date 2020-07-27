/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';

type SEOProps = {
	description?: string;
	lang?: string;
	meta?: Array<{
		name: string;
		content: string;
	}>;
	title: string;
};

function SEO(props: SEOProps): JSX.Element {
	const { description = '', lang = 'en', meta = [], title } = props;
	const siteMetadata = useSiteMetadata();
	const metaDescription = description || siteMetadata.description;
	const isIndexPage = title === '';
	const effectiveTitle = isIndexPage ? siteMetadata.title : title;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={effectiveTitle}
			titleTemplate={isIndexPage ? '' : `%s | ${siteMetadata.title}`}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			].concat(meta)}
		/>
	);
}

export default SEO;
