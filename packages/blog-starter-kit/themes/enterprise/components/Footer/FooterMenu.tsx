'use client';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const footerSections = [
	{
		title: 'Discover',
		items: [
			{ name: 'Photo inspiration', href: '#' },
			{ name: 'PSD Templates', href: '#' },
			{ name: 'Stock Photos', href: '#' },
			{ name: 'Video Templates', href: '#' },
			{ name: 'Fonts', href: '#' },
		],
	},
	{
		title: 'Company',
		items: [
			{ name: 'About Us', href: '#' },
			{ name: 'Work With Us', href: '#' },
			{ name: 'Blog & News', href: '#' },
		],
	},
	{
		title: 'Resources',
		items: [
			{ name: 'Documentation', href: '#' },
			{ name: 'Free Assets', href: '#' },
			{ name: 'Help Center', href: '#' },
			{ name: 'Become an Affiliate', href: '#' },
		],
	},
	{
		title: 'Legal',
		items: [
			{ name: 'Terms of Service', href: '#' },
			{ name: 'Privacy Policy', href: '#' },
			{ name: 'Cookies Policy', href: '#' },
			{ name: 'License', href: '#' },
		],
	},
];

const FooterMenu = () => {
	const [openSection, setOpenSection] = useState<number | null>(null);

	const toggleSection = (index: number) => {
		setOpenSection((prev) => (prev === index ? null : index));
	};

	return (
		<div className="grid w-full grid-cols-1 gap-8 px-10 py-8 md:grid-cols-2 lg:grid-cols-4 lg:px-24">
			{footerSections.map((section, index) => (
				<div key={index} className="space-y-4">
					<button
						onClick={() => toggleSection(index)}
						className="flex w-full items-center justify-between text-left text-lg font-medium text-white"
						aria-expanded={openSection === index}
					>
						{section.title}
						<ChevronDown
							className={`transition-transform duration-300 md:hidden ${
								openSection === index ? 'rotate-180' : 'rotate-0'
							}`}
							size={20}
						/>
					</button>

					<div className={`space-y-3 ${openSection === index ? 'block' : 'hidden'} md:block`}>
						{section.items.map((item, idx) => (
							<Link key={idx} href={item.href} className="block text-sm text-white hover:underline">
								{item.name}
							</Link>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default FooterMenu;
