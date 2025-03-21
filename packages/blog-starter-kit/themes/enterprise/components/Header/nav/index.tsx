import { navItems } from '@/lib/data';
import { cn } from '@/lib/utils';
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

	return (
		<motion.div
			variants={menuSlide}
			initial="initial"
			animate="enter"
			exit="exit"
			className={styles.menu}
		>
			<div className={styles.body}>
				<div className={styles.nav}>
					<div className={cn('text-neutral-200', styles.header)}>
						<p>Navigation</p>
					</div>
					{navItems.map((data, index) => {
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
				{/* <Footer /> */}
				<div className="flex flex-col items-center">
					<Image src={'/logo.svg'} alt="logo" width={150} height={150} />
					<p className="mt-2 text-sm ">Land of homes</p>
				</div>
			</div>
			<Curve />
		</motion.div>
	);
}
