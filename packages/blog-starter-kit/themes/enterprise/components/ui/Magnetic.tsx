import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

export default function Magnetic({ children }: { children: React.ReactElement }) {
	const magnetic = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		console.log(children);
		const xTo = gsap.quickTo(magnetic.current, 'x', {
			duration: 1,
			ease: 'elastic.out(1, 0.3)',
		});
		const yTo = gsap.quickTo(magnetic.current, 'y', {
			duration: 1,
			ease: 'elastic.out(1, 0.3)',
		});
		if (magnetic.current) {
			magnetic.current.addEventListener('mousemove', (e) => {
				const { clientX, clientY } = e;
				if (!magnetic.current) return;
				const { height, width, left, top } = magnetic.current.getBoundingClientRect();
				const x = clientX - (left + width / 2);
				const y = clientY - (top + height / 2);
				xTo(x * 0.35);
				yTo(y * 0.35);
			});
			magnetic.current.addEventListener('mouseleave', (e) => {
				xTo(0);
				yTo(0);
			});
		}
	}, [children]);

	return React.cloneElement(children, { ref: magnetic });
}
