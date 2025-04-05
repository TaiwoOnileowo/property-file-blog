'use client';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Rounded from '../ui/Rounded/RoundedButton';
import Nav from './nav/index';
import styles from './style.module.scss';
export default function Index() {
	const header = useRef(null);
	const [isActive, setIsActive] = useState(false);
	const pathname = usePathname();
	const button = useRef(null);

	useEffect(() => {
		if (isActive) setIsActive(false);
	}, [pathname]);

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(button.current, {
			scrollTrigger: {
				trigger: document.documentElement,
				start: 0,
				end: window.innerHeight,
				onLeave: () => {
					gsap.to(button.current, {
						scale: 1,
						duration: 0.25,
						ease: 'power1.out',
					});
				},
				onEnterBack: () => {
					gsap.to(
						button.current,
						{ scale: 0, duration: 0.25, ease: 'power1.out' },
						// setIsActive(false)
					);
				},
			},
		});
	}, []);

	return (
		<>
			<div className={styles.headerButtonContainer}>
				<Rounded
					backgroundColor="#00bf63"
					onClick={() => {
						setIsActive(!isActive);
					}}
					className={`${styles.button} text-white`}
				>
					<div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}></div>
				</Rounded>
			</div>
			<AnimatePresence mode="wait">{isActive && <Nav setIsActive={setIsActive} />}</AnimatePresence>
		</>
	);
}
