export const GET_SERIES_WITH_POSTS = /* GraphQL */ `
	query GetSeriesWithPosts($host: String!, $seriesFirst: Int!, $postsFirst: Int!) {
		publication(host: $host) {
			seriesList(first: $seriesFirst) {
				edges {
					node {
						name
						slug
						posts(first: $postsFirst) {
							edges {
								node {
									title
									slug
									brief
									coverImage {
										url
									}
									publishedAt
								}
							}
						}
					}
				}
			}
		}
	}
`;
export const GET_SERIES_NAMES = `
	query GetSeriesWithPosts($host: String!, $seriesFirst: Int!) {
		publication(host: $host) {
			seriesList(first: $seriesFirst) {
				edges {
					node {
						name
						slug
				
					}
				}
			}
		}
	}
`;
