'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import Header from './Header';
export default function Navbar() {
	const mobileQuery = useMediaQuery({ query: '(max-width: 768px)' });
	const isMobile = mobileQuery;

	return (
		<header className="font-helios sticky top-0 z-50 w-full bg-white">
			<div className="container mx-auto w-full">
				{/* Top navbar with logo and actions */}
				<div className="mb-4 flex h-20 items-center justify-between border-b border-b-black/30 px-6">
					<div className="flex items-center space-x-4 md:justify-between lg:hidden">
						<Link href="/" className=" flex-1 items-center justify-center ">
							<div className="flex items-center gap-1">
								<Image
									src={'/wordmarkmobile.svg'}
									alt="Property File Magazine"
									height={100}
									width={180}
								/>
							</div>
						</Link>
					</div>

					<div className="absolute left-6 top-4 hidden md:block">
						<Header />
					</div>

					<Link href="/" className=" hidden flex-1 items-center justify-center lg:flex">
						<div className="flex items-center gap-1">
							<Image src={'/wordmarkblack.svg'} alt="Property File" height={100} width={180} />
						</div>
					</Link>

					<div className="absolute right-6 top-4 flex items-center space-x-4 text-sm text-white">
						<Button
							variant="default"
							className="cursor-pointer bg-black px-4 font-bold hover:bg-gray-800  "
						>
							Advertise
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
