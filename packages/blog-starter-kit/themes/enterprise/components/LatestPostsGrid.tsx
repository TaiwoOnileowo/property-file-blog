import type { PostFragment } from '@/generated/graphql';
import { truncateText } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

interface LatestPostsGridProps {
	posts: PostFragment[];
}

export default function LatestPostsGrid({ posts }: LatestPostsGridProps) {
	console.log(posts);
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
	if (!posts || posts.length < 5) return null;

	// Get the first 5 posts for the grid
	const [mainPost, secondPost, ...restPosts] = posts.slice(0, 5);

	return (
		<section className="my-12 mt-0">
			<h2 className="font-h font-heliosBold mb-6 text-center text-2xl">LATEST POSTS</h2>

			<div className="grid grid-cols-12 gap-4  ">
				{/* Main featured post - spans 6 columns */}
				<div className="col-span-12 md:col-span-6">
					<Link
						href={`/${mainPost.slug}`}
						className="group relative block aspect-[16/10] overflow-hidden rounded-lg"
					>
						<Image
							src={mainPost.coverImage?.url || '/placeholder.jpg'}
							alt={mainPost.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
						<div className="bg-gradient-to- t absolute	inset-0 from-black/80 to-transparent max-md:hidden" />
						<div className="absolute bottom-0 left-0 right-0 block p-4 text-white max-md:hidden">
							<h3 className="font-heliosBold text-xl  font-bold md:text-2xl">{mainPost.title}</h3>
							<p className="mt-2 break-words text-xs text-white/80">
								{isMobile
									? truncateText(mainPost.brief, 80, mainPost.slug)
									: truncateText(mainPost.brief, 150, mainPost.slug)}
							</p>
						</div>
					</Link>
					<div className="md:hidden ">
						<h3 className="font-heliosBold text-xl  font-bold md:text-2xl">{mainPost.title}</h3>
						<p className="mt-2 break-words text-xs text-black/80">
							{isMobile
								? truncateText(mainPost.brief, 80, mainPost.slug)
								: truncateText(mainPost.brief, 150, mainPost.slug)}
						</p>
					</div>
				</div>

				{/* Second post and first ad - each spans 3 columns */}
				<div className="col-span-12 grid-cols-12  gap-4 border-t-black/50 pt-2 max-md:grid max-md:border-t md:col-span-3">
					<Link
						href={`/${secondPost.slug}`}
						className="group relative col-span-4 mb-3 block aspect-[3/3] overflow-hidden rounded-lg"
					>
						<Image
							src={secondPost.coverImage?.url || '/placeholder.jpg'}
							alt={secondPost.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
						/>
					</Link>
					<div className="col-span-8">
						<h3 className="font-heliosBold font-bold">
							<Link href={`/${secondPost.slug}`} className="hover:text-default transition-colors">
								{secondPost.title}
							</Link>
						</h3>
						<p className="mt-2 max-w-fit text-xs text-black/80">
							{truncateText(secondPost.brief, 120, secondPost.slug)}
						</p>
					</div>
				</div>

				{/* First Ad Space */}
				{/* <div className="col-span-12 flex h-24  items-center justify-center rounded-lg bg-gray-200  md:col-span-3 md:h-full">
					<span className="font-medium text-gray-500">AD</span>
				</div> */}

				{/* Bottom row - 3 posts and 1 ad space */}
				{restPosts.map((post, index) => (
					<div key={post.slug} className="grid-post md:col-span-3">
						<Link href={`/${post.slug}`} className="grid-image group ">
							<Image
								src={post.coverImage?.url || '/placeholder.jpg'}
								alt={post.title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-110"
								sizes="(max-width: 768px) 33vw, 25vw"
							/>
						</Link>
						<div className="col-span-8">
							<h3 className="font-heliosBold font-bold">
								<Link href={`/${post.slug}`} className="hover:text-default transition-colors">
									{post.title}
								</Link>
							</h3>
							<p className="mt-2 max-w-fit break-words text-xs md:text-black/80">
								{isMobile
									? truncateText(post.brief, 120, post.slug)
									: truncateText(post.brief, 180, post.slug)}
							</p>
						</div>
					</div>
				))}

				{/* Find your dream home widget */}
				{/* <div className="col-span-12 md:col-span-3">
					<HomeFinderWidget />
				</div> */}
			</div>
		</section>
	);
}
