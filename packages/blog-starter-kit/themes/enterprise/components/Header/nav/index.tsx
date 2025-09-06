import { cn } from '@/lib/utils';
import { useSeriesStore } from '@/store/seriesStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { menuSlide } from '../animation';
import Curve from './Curve';
import Link from './Link';
import styles from './style.module.scss';
export default function Index({
	setIsActive,
}: {
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const pathname = usePathname();
	const [selectedIndicator, setSelectedIndicator] = useState(pathname);
	const { seriesNames } = useSeriesStore();

	// Transform series data to match the expected nav item format
	const navItems = seriesNames.map((series) => ({
		name: series.seriesTitle,
		link: `/category/${series.seriesSlug}`,
	}));

	// Add a home link at the beginning
	const allNavItems = [{ name: 'Home', link: '/' }, ...navItems];

	return (
		<motion.div
			variants={menuSlide}
			initial="initial"
			animate="enter"
			exit="exit"
			className={styles.menu}
		>
			<div className={cn('p-10', styles.body)}>
				<div className={styles.nav}>
					<div className={cn('text-neutral-200', styles.header)}>
						<p>Navigation</p>
					</div>
					<div className="scrollbar-hide flex max-h-[500px] flex-col gap-8 overflow-y-auto px-8 md:max-h-[400px] md:max-w-[400px] ">
						{allNavItems.map((data, index) => {
							return (
								<Link
									setIsActive={setIsActive}
									key={index}
									data={{ ...data, index }}
									isActive={selectedIndicator == data.link}
									setSelectedIndicator={setSelectedIndicator}
								></Link>
							);
						})}
					</div>
				</div>
				{/* <Footer /> */}
				<div className="flex  flex-col items-center justify-center  gap-4">
					<Image src={'/wordmarkwhite.svg'} alt="logo" width={150} height={150} />
					{/* <SocialIcons /> */}
				</div>
			</div>
			<Curve />
		</motion.div>
	);
}
