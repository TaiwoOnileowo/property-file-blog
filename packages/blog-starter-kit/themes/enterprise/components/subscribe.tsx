import * as Popover from '@radix-ui/react-popover';
import { Button } from './button';
import { NewsletterPlusSVG } from './icons';
import { SubscribeForm } from './subscribe-form';

export const Subscribe = () => {
	return (
		<div className="fixed bottom-10 right-10 z-50">
			<Popover.Root>
				<Popover.Trigger asChild>
					<Button
						label="Subscribe"
						type="outline"
						icon={<NewsletterPlusSVG className="h-5 w-5 fill-current" />}
						className="!bg-white dark:!bg-neutral-950"
					/>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content
						className="w-[350px] rounded-xl border bg-white p-5 shadow-xl md:w-[500px] dark:border-neutral-800 dark:bg-neutral-900"
						align="end"
						sideOffset={5}
					>
						<h3 className="text-primary mb-2 text-center text-base font-semibold">
							Subscribe to our newsletter to hear more from us!
						</h3>
						<SubscribeForm />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</div>
	);
};
