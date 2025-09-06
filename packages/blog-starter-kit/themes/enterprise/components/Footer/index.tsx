import Image from 'next/image';
import Link from 'next/link';
import SocialIcons from './SocialIcons';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full  bg-white">
			{/* <FooterMenu /> */}
			<div className="w-full border-t border-t-white/20 px-10 py-6 lg:px-24">
				<div className="flex items-center justify-center gap-6 max-md:flex-col md:flex-row">
					<div className="flex gap-4 max-md:flex-col md:flex-row md:items-center md:gap-8">
						<Link href="/" className="flex justify-center">
							<Image src={'/wordmarkblack.svg'} alt="Property File" height={100} width={180} />
						</Link>
						<p className="text-center text-sm text-black md:text-left">
							© {currentYear} Property File. All rights reserved.
						</p>
					</div>

					{/* <SocialIcons /> */}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
