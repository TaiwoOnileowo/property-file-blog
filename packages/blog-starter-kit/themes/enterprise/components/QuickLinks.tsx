import { PostsByPublicationQuery } from '@/generated/graphql';
import { GET_SERIES_NAMES } from '@/queries';
import request from 'graphql-request';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const QuickLinks = () => {
	const [seriesNames, setSeriesNames] = useState<{ seriesTitle: string; seriesSlug: string }[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchSeries() {
			try {
				setLoading(true);

				// Add cache busting parameter
				const timestamp = Date.now();
				const categoriesData = await request<PostsByPublicationQuery>(
					`${process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT}?t=${timestamp}`,
					GET_SERIES_NAMES,
					{
						host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
						seriesFirst: 4,
					},
					{
						// Add headers to prevent caching
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						Pragma: 'no-cache',
						Expires: '0',
					},
				);

				const categoriesPublication = categoriesData.publication as any;
				if (!categoriesPublication) {
					setSeriesNames([]);
					return;
				}

				const series = categoriesPublication.seriesList.edges.map((edge: any) => ({
					seriesTitle: edge.node.name,
					seriesSlug: edge.node.slug,
				}));

				console.log('Fetched series:', series); // Debug log
				setSeriesNames(series);
			} catch (error) {
				console.error('Error fetching series:', error);
				setSeriesNames([]);
			} finally {
				setLoading(false);
			}
		}

		fetchSeries();
	}, []);

	if (loading) {
		return (
			<nav className="flex justify-center pb-3">
				<div className="text-white">Loading...</div>
			</nav>
		);
	}

	return (
		<nav className="flex justify-center pb-3">
			<ul className="flex flex-wrap items-center space-x-6 text-black">
				{seriesNames.length > 0 &&
					seriesNames.map((series) => (
						<li key={series.seriesSlug}>
							<Link href={`/category/${series.seriesSlug}`} className="py-2 hover:underline">
								{series.seriesTitle}
							</Link>
						</li>
					))}
			</ul>
		</nav>
	);
};

export default QuickLinks;
