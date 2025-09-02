import logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import FooterMenu from './FooterMenu';
import SocialIcons from './SocialIcons';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full  bg-black">
			{/* <FooterMenu /> */}
			<div className="w-full border-t border-t-white/20 px-10 py-6 lg:px-24">
				<div className="flex items-center justify-between gap-6 max-md:flex-col md:flex-row">
					<div className="flex gap-4 max-md:flex-col md:flex-row md:items-center md:gap-8">
						<Link href="/" className="flex justify-center">
							<Image src={logo} alt="Property File" width={200} />
						</Link>
						<p className="text-center text-sm text-white md:text-left">
							© {currentYear} Property File. All rights reserved.
						</p>
					</div>

					<SocialIcons />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
