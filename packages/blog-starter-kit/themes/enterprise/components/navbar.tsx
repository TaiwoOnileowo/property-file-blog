'use client';

import Header from '@/components/Header/index';
import { Button } from '@/components/ui/button';
import logoMobile from '@/public/logo-mobile.svg';
import logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import QuickLinks from './QuickLinks';

export default function Navbar() {
	const mobileQuery = useMediaQuery({ query: '(max-width: 768px)' });
	const isMobile = mobileQuery;

	return (
		<header className="font-helios sticky top-0 z-50 w-full bg-black">
			<div className="container mx-auto w-full">
				{/* Top navbar with logo and actions */}
				<div className="mb-4 flex h-20 items-center justify-between border-b border-b-white/20 px-6">
					<div className="flex items-center space-x-4 md:justify-between lg:hidden">
						<div className="md:hidden">
							<Header />
						</div>

						<Link href="/" className="flex items-center justify-center">
							{isMobile ? (
								<Image src={logoMobile} alt="Property File" width={50} />
							) : (
								<Image src={logo} alt="Property File" width={180} />
							)}
						</Link>
					</div>

					<div className="hidden md:block">
						<Header />
					</div>

					<div className="hidden  lg:block">{/* Spacer for desktop to center logo */}</div>

					<Link href="/" className=" hidden items-center justify-center lg:flex">
						{isMobile ? (
							<Image src={logoMobile} alt="Property File" width={60} />
						) : (
							<Image src={logo} alt="Property File" width={180} />
						)}
					</Link>

					<div className="flex items-center space-x-4 text-sm text-white">
						<Button
							variant="default"
							className="bg-default/90 hover:bg-default cursor-pointer px-4 font-bold  "
						>
							Post Property
						</Button>
						<Button variant="outline" asChild>
							<Link
								href="/sign-up"
								className="hidden items-center bg-black hover:text-black md:flex"
							>
								<span className="mr-1">Sign Up</span>
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link
								href="/sign-in"
								className="hidden items-center border-none bg-black hover:text-black md:flex"
							>
								<span className="mr-1">Sign In</span>
							</Link>
						</Button>
					</div>
				</div>

				{/* Navigation links */}
				<QuickLinks />
			</div>
		</header>
	);
}
