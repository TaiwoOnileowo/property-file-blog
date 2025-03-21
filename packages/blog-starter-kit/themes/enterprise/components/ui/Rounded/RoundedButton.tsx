import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import Magnetic from '../Magnetic';
import styles from './styles.module.scss';

export default function Rounded({
	children,
	backgroundColor = '#455CE9',

	...attributes
}: {
	children: React.ReactNode;
	backgroundColor?: string;
	attributes?: string;
	className?: string;
	onClick?: () => void;
}) {
	const circle = useRef(null);
	let timeline = useRef<gsap.core.Timeline | null>(null);
	let timeoutId: string | number | NodeJS.Timeout | null | undefined = null;
	useEffect(() => {
		timeline.current = gsap.timeline({ paused: true });
		timeline.current
			.to(circle.current, { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' }, 'enter')
			.to(circle.current, { top: '-150%', width: '125%', duration: 0.25 }, 'exit');
	}, []);

	const manageMouseEnter = () => {
		if (timeoutId) clearTimeout(timeoutId);
		timeline.current!.tweenFromTo('enter', 'exit');
	};

	const manageMouseLeave = () => {
		timeoutId = setTimeout(() => {
			timeline.current!.play();
		}, 300);
	};

	return (
		<Magnetic>
			<div
				className={styles.roundedButton}
				style={{ overflow: 'hidden' }}
				onMouseEnter={() => {
					manageMouseEnter();
				}}
				onMouseLeave={() => {
					manageMouseLeave();
				}}
				{...attributes}
			>
				{children}
				<div ref={circle} style={{ backgroundColor }} className={styles.circle}></div>
			</div>
		</Magnetic>
	);
}
