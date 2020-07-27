import { useStaticQuery, graphql } from 'gatsby';
import { SiteQuery, SiteSiteMetadata } from '../../graphql-types';

const useSiteMetadata = (): SiteSiteMetadata => {
	const siteQuery: SiteQuery = useStaticQuery(
		graphql`
			query Site {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`,
	);

	return (
		siteQuery.site?.siteMetadata || {
			title: '',
			description: '',
			author: '',
		}
	);
};

export default useSiteMetadata;
