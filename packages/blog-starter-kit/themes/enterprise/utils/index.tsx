import { PostFragment } from '@/generated/graphql';
import { PostSeries } from '@/types';
import Link from 'next/link';

export function getLatestPosts(categories: PostSeries[], count = 6): PostFragment[] {
	return categories
		.flatMap((category) => category.posts)
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
		.slice(0, count);
}

export const truncateText = (text: string, length: number, slug: string) => {
	if (text.length <= length) return text;
	return (
		<>
			{text.slice(0, length)}...
			<br />
			<Link href={`/blog/${slug}`} className="readmore text-sm hover:underline">
				Read More
			</Link>
		</>
	);
};
