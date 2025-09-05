import { PostFragment } from './generated/graphql';

export interface PostSeries {
	posts: PostFragment[];
	seriesTitle: string;
	seriesSlug: string;
}
