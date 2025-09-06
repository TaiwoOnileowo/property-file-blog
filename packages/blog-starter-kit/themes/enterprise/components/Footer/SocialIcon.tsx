import Link from 'next/link';

interface SocialIconProps {
	href: string;
	icon: React.ElementType;
	label: string;
}

const SocialIcon = ({ href, icon: Icon, label }: SocialIconProps) => {
	return (
		<Link
			href={href}
			className="border-default hover:bg-default flex h-8 w-8 items-center justify-center rounded-md border transition-colors"
			aria-label={label}
		>
			<Icon className="h-5 w-5 text-black" />
		</Link>
	);
};

export default SocialIcon;
