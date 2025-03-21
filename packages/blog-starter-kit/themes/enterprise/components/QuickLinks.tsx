import { PostsByPublicationQuery } from '@/generated/graphql';
import { GET_SERIES_NAMES } from '@/queries';
import request from 'graphql-request';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const QuickLinks = () => {
	const [seriesNames, setSeriesNames] = useState<{ seriesTitle: string; seriesSlug: string }[]>([]);

	useEffect(() => {
		async function fetchSeries() {
			const categoriesData = await request<PostsByPublicationQuery>(
				process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
				GET_SERIES_NAMES,
				{
					host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
					seriesFirst: 4,
				},
			);

			const categoriesPublication = categoriesData.publication as any;
			if (!categoriesPublication) {
				return;
			}

			const series = categoriesPublication.seriesList.edges.map((edge: any) => ({
				seriesTitle: edge.node.name,
				seriesSlug: edge.node.slug,
			}));
			setSeriesNames(series);
		}

		fetchSeries();
	}, []);

	return (
		<nav className="flex justify-center pb-3">
			<ul className="flex flex-wrap items-center space-x-6 text-white">
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
