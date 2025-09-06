'use client';

import { PostFragment } from '@/generated/graphql';
import { cn } from '@/lib/utils';
import { useSeriesStore } from '@/store/seriesStore';
import { PostSeries } from '@/types';
import { useEffect, useState } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem } from './ui/navbar-menu';

interface QuickLinksProps {
	seriesNames: { seriesTitle: string; seriesSlug: string }[];
	postSeries?: PostSeries[];
}

const QuickLinks = ({ seriesNames, postSeries = [] }: QuickLinksProps) => {
	const [active, setActive] = useState<string | null>(null);
	const { setSeriesNames } = useSeriesStore();

	// Set series names in the store when data is received
	useEffect(() => {
		if (seriesNames && seriesNames.length > 0) {
			setSeriesNames(seriesNames);
		}
	}, [seriesNames, setSeriesNames]);

	const getSeriesPosts = (seriesSlug: string): PostFragment[] => {
		const series = postSeries.find((s) => s.seriesSlug === seriesSlug);
		return series?.posts.slice(0, 6) || [];
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	const truncateText = (text: string, maxLength: number = 80) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	};

	// Filter out series that don't have any posts
	const seriesWithPosts = seriesNames.filter((series) => {
		return getSeriesPosts(series.seriesSlug).length > 0;
	});

	if (!seriesWithPosts || seriesWithPosts.length === 0) {
		return null;
	}

	return (
		<div className="relative flex w-full items-center justify-center max-md:hidden">
			<div className={cn('inset-x-0 z-10 mx-auto max-w-7xl')}>
				<Menu setActive={setActive}>
					{seriesWithPosts.map((series) => (
						<MenuItem
							key={series.seriesSlug}
							setActive={setActive}
							active={active}
							item={series.seriesTitle}
						>
							<div className="text-sm">
								<div className="grid max-w-4xl grid-cols-2 gap-8 overflow-hidden p-10">
									{getSeriesPosts(series.seriesSlug).map((post) => (
										<ProductItem
											key={post.id}
											title={post.title}
											href={`/${post.slug}`}
											src={post.coverImage?.url || '/placeholder.jpg'}
											description={truncateText(post.brief || '', 80)}
										/>
									))}
								</div>
								<div className="mt-4 border-t border-gray-200 pt-4 text-center">
									<HoveredLink href={`/series/${series.seriesSlug}`}>
										View all posts in {series.seriesTitle} →
									</HoveredLink>
								</div>
							</div>
						</MenuItem>
					))}
				</Menu>
			</div>
		</div>
	);
};

export default QuickLinks;
