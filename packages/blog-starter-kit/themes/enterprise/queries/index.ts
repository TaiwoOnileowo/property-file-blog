export const GET_SERIES_WITH_POSTS = /* GraphQL */ `
	query GetSeriesWithPosts($host: String!, $seriesFirst: Int!, $postsFirst: Int!) {
		publication(host: $host) {
			seriesList(first: $seriesFirst) {
				edges {
					node {
						id
						name
						slug
						posts(first: $postsFirst) {
							edges {
								node {
									id
									title
									slug
									brief
									coverImage {
										url
									}
									publishedAt
									author {
										name
										profilePicture
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_SERIES_NAMES = /* GraphQL */ `
	query GetSeriesNames($host: String!, $seriesFirst: Int!) {
		publication(host: $host) {
			seriesList(first: $seriesFirst) {
				edges {
					node {
						id
						name
						slug
					}
				}
			}
		}
	}
`;
