import { Analytics } from './analytics';
import Footer from './Footer';
import { Integrations } from './integrations';
import { Meta } from './meta';
import Navbar from './navbar';
import { Scripts } from './scripts';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Scripts />
			<div className="min-h-screen bg-white ">
				<Navbar />
				<main>{children}</main>
				<Footer />
			</div>
			<Analytics />
			<Integrations />
		</>
	);
};
