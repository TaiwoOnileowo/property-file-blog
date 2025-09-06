import SubscribeButton from './SubscribeButton';

const SubscribePrompt = () => {
	return (
		<div className="bg-charcoal mb-6 flex items-center justify-between px-6 py-4 md:hidden">
			<div className="text-sm text-white">Subscribe to our newsletter</div>
			<SubscribeButton />
		</div>
	);
};
export default SubscribePrompt;
