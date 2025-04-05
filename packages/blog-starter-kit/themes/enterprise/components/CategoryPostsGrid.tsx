import { Button } from '@/components/ui/button';
import { PostFragment } from '@/generated/graphql';
import { truncateText } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryPostsGridProps {
	posts: PostFragment[];
	seriesTitle: string;
}

export default function CategoryPostsGrid({ posts, seriesTitle }: CategoryPostsGridProps) {
	if (!posts || posts.length < 5) return null;

	// Get first 5 posts for the category display
	const [featuredPost, ...gridPosts] = posts.slice(0, 5);

	return (
		<section className="mb-16">
			<h2 className="font-heliosBold mb-6 text-2xl font-bold">{seriesTitle.toUpperCase()}</h2>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{/* Featured post - spans 2 columns */}
				<div className="gap-4 max-md:col-span-12 lg:col-span-2 lg:row-span-2">
					<Link
						href={`/${featuredPost.slug}`}
						className="group relative block aspect-[16/10] overflow-hidden rounded-lg lg:aspect-square"
					>
						<Image
							src={featuredPost.coverImage?.url || '/placeholder.jpg'}
							alt={featuredPost.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent max-md:hidden" />
						<div className="absolute bottom-0 left-0 right-0 p-6 text-white max-md:hidden">
							<h3 className="font-heliosBold text-xl  font-bold md:text-2xl">
								{featuredPost.title}
							</h3>
							<p className="mt-2 max-w-fit break-words text-xs text-white/80">
								{truncateText(featuredPost.brief, 150, featuredPost.slug)}
							</p>
						</div>
					</Link>
					<div className="mt-4 md:hidden ">
						<h3 className="font-heliosBold text-xl  font-bold md:text-2xl">{featuredPost.title}</h3>
						<p className="mt-2 break-words text-xs text-black/80">
							{truncateText(featuredPost.brief, 150, featuredPost.slug)}
						</p>
					</div>
					<div className="mt-5 rounded-lg bg-gray-200 p-4">
						<div className="flex h-10 items-center justify-center border-2 border-dashed border-gray-400">
							<span className="font-medium text-gray-500">Advertisement Space</span>
						</div>
					</div>
				</div>

				{/* Grid posts */}
				{gridPosts.map((post) => (
					<div key={post.slug} className="grid-post">
						<Link href={`/${post.slug}`} className="grid-image group">
							<Image
								src={post.coverImage?.url || '/placeholder.jpg'}
								alt={post.title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-110"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
							/>
						</Link>
						<div className="col-span-8">
							<h3 className="font-heliosBold font-bold">
								<Link href={`/${post.slug}`} className="hover:text-default transition-colors">
									{post.title}
								</Link>
							</h3>
							<p className="mt-2 max-w-fit break-words text-xs text-black/80">
								{truncateText(post.brief, 180, post.slug)}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-8 text-center">
				<Button variant="default" asChild className="text-white transition hover:shadow-lg">
					<Link href={`/category/${seriesTitle.toLowerCase()}`}>View More From {seriesTitle} </Link>
				</Button>
			</div>
		</section>
	);
}
