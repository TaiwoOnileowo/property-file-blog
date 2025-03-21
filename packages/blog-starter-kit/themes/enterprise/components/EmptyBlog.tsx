import { ArticleSVG } from './icons';

const EmptyBlog = () => {
	return (
		<div className="grid grid-cols-1 py-20 lg:grid-cols-3">
			<div className="col-span-1 flex flex-col items-center gap-5 text-center text-slate-700 lg:col-start-2 dark:text-neutral-400">
				<div className="w-20">
					<ArticleSVG clasName="stroke-current" />
				</div>
				<p className="text-xl font-semibold ">Hang tight! We&apos;re drafting the first article.</p>
			</div>
		</div>
	);
};
export default EmptyBlog;
