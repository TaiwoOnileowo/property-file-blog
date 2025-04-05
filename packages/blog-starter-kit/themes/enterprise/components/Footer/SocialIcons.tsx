import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';
import SocialIcon from './SocialIcon';

const SocialIcons = () => {
	return (
		<div className="flex justify-center gap-3">
			<SocialIcon
				href="https://instagram.com"
				icon={IconBrandInstagram}
				label="Follow us on Instagram"
			/>
			<SocialIcon
				href="https://facebook.com"
				icon={IconBrandFacebook}
				label="Follow us on Facebook"
			/>
			<SocialIcon href="https://twitter.com" icon={IconBrandTwitter} label="Follow us on Twitter" />
		</div>
	);
};
export default SocialIcons;
