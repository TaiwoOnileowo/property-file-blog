import CategoryPostsGrid from '@/components/CategoryPostsGrid';
import DefaultInput from '@/components/DefaultInput';
import EmptyBlog from '@/components/EmptyBlog';
import LatestPostsGrid from '@/components/LatestPostsGrid';
import MetaTags from '@/components/MetaTags';
import { GET_SERIES_WITH_POSTS } from '@/queries';
import { PostSeries } from '@/types';
import { getLatestPosts } from '@/utils';
import request from 'graphql-request';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Container } from '../components/container';
import { AppProvider } from '../components/contexts/appContext';
import { Layout } from '../components/layout';
import {
	PostsByPublicationDocument,
	PostsByPublicationQuery,
	PostsByPublicationQueryVariables,
	PublicationFragment,
} from '../generated/graphql';

const SubscribeForm = dynamic(() =>
	import('../components/subscribe-form').then((mod) => mod.SubscribeForm),
);

type Props = {
	publication: PublicationFragment;
	postSeries: PostSeries[];
};

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!;
export default function Index({ postSeries, publication }: Props) {
	const latestPosts = getLatestPosts(postSeries, 6);
	console.log(latestPosts, 'latestPosts');
	return (
		<AppProvider publication={publication}>
			<Layout>
				<Head>
					<MetaTags publication={publication} />
				</Head>
				<Container className="mx-auto flex max-w-7xl flex-col items-stretch gap-10 px-5 pb-10">
					<div className="mt-8 flex  w-full justify-center">
						<DefaultInput
							type="text"
							placeholder="Search posts..."
							btnText="Search"
							className=" max-w-md bg-gray-200"
							btnClassName="bg-black hover:bg-gray-800 text-white"
						/>
					</div>
					{postSeries.length === 0 && <EmptyBlog />}
					{/* Latest Posts Section */}
					<LatestPostsGrid posts={latestPosts} />

					{/* Rectangle Ad Banner */}
					<div className="mb-16 rounded-lg bg-gray-200 p-4">
						<div className="flex h-32 items-center justify-center border-2 border-dashed border-gray-400">
							<span className="font-medium text-gray-500">Advertisement Space</span>
						</div>
					</div>

					{/* Category Sections */}
					{postSeries.map((category) => (
						<>
							<CategoryPostsGrid
								key={category.seriesTitle}
								posts={category.posts}
								seriesTitle={category.seriesTitle}
							/>
							<div className="mb-16 rounded-lg bg-gray-200 p-4">
								<div className="flex h-32 items-center justify-center border-2 border-dashed border-gray-400">
									<span className="font-medium text-gray-500">Advertisement Space</span>
								</div>
							</div>
						</>
					))}
					{postSeries.length > 0 && (
						<div className="grid grid-cols-4 rounded-lg bg-black px-5 py-5 md:py-10 dark:bg-neutral-900">
							<div className="col-span-full md:col-span-2 md:col-start-2">
								<h2 className="mb-5 text-center text-2xl font-bold text-white">
									Subscribe to our newsletter for updates.
								</h2>
								<SubscribeForm />
							</div>
						</div>
					)}
				</Container>
			</Layout>
		</AppProvider>
	);
}
export const getStaticProps: GetStaticProps = async () => {
	const categoriesData = await request<PostsByPublicationQuery>(
		process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
		GET_SERIES_WITH_POSTS,
		{
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
			seriesFirst: 3,
			postsFirst: 5,
		},
	);
	const data = await request<PostsByPublicationQuery, PostsByPublicationQueryVariables>(
		GQL_ENDPOINT,
		PostsByPublicationDocument,
		{
			first: 10,
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
		},
	);

	const publication = data.publication;

	const categoriesPublication = categoriesData.publication as any;
	if (!publication || !categoriesPublication) {
		return {
			notFound: true,
		};
	}

	// Map through seriesList to simplify data consumption:
	const postSeries = categoriesPublication.seriesList.edges.map((edge: any) => ({
		seriesTitle: edge.node.name,
		seriesSlug: edge.node.slug,
		posts: edge.node.posts.edges.map((postEdge: any) => postEdge.node),
	}));
	return {
		props: {
			publication,
			postSeries,
		},
		revalidate: 1,
	};
};
