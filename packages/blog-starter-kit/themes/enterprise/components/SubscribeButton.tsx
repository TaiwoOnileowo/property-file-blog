import { Button } from './ui/button';

const SubscribeButton = () => {
	function scrollToBottom() {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	}
	return (
		<Button
			onClick={scrollToBottom}
			variant="default"
			className="cursor-pointer bg-black px-4 font-bold text-white hover:bg-gray-800  "
		>
			Subscribe for free
		</Button>
	);
};
export default SubscribeButton;
