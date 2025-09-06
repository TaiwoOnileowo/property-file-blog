import { motion } from 'framer-motion';
import Link from 'next/link';
import { scale, slide } from '../../animation';
import styles from './style.module.scss';

export default function Index({
	data,
	isActive,
	setSelectedIndicator,
	setIsActive,
}: {
	data: any;
	isActive: boolean;
	setSelectedIndicator: React.Dispatch<React.SetStateAction<string>>;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { name, link, index } = data;

	return (
		<motion.div
			className={styles.link}
			onMouseEnter={() => {
				setSelectedIndicator(link);
			}}
			custom={index}
			variants={slide}
			initial="initial"
			animate="enter"
			exit="exit"
		>
			<motion.div
				variants={scale}
				animate={isActive ? 'open' : 'closed'}
				className={styles.indicator}
			></motion.div>
			<Link
				href={link}
				className="break-words text-lg max-md:text-sm"
				onClick={() => setIsActive(false)}
			>
				{name}
			</Link>
		</motion.div>
	);
}
