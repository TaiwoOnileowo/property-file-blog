import { Button } from '@/components/ui/button';
import { ArrowRight, Award, BarChart2, Users } from 'lucide-react';
export default function AdvertiseBanner() {
	return (
		<div className="mb-16 overflow-hidden rounded-lg bg-gradient-to-r from-green-50 to-green-50">
			<div className="flex flex-col md:flex-row">
				<div className="flex-1 p-6 md:p-8">
					<h3 className="font-heliosBold text-xl font-bold text-primary md:text-2xl">
						Post an Advert
					</h3>
					<p className="text-primary/90 mt-2">
						Leverage our engaged audience and trusted brand to grow your business
					</p>

					<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
						<div className="flex items-start gap-2">
							<Users className="text-primary mt-1 h-5 w-5" />
							<div>
								<p className="font-medium text-black">Targeted Audience</p>
								<p className="text-xs text-gray-600">Reach property enthusiasts</p>
							</div>
						</div>
						<div className="flex items-start gap-2">
							<BarChart2 className="text-primary mt-1 h-5 w-5" />
							<div>
								<p className="font-medium text-black">Measurable Results</p>
								<p className="text-xs text-gray-600">Track campaign performance</p>
							</div>
						</div>
						<div className="flex items-start gap-2">
							<Award className="text-primary mt-1 h-5 w-5" />
							<div>
								<p className="font-medium text-black">Premium Placement</p>
								<p className="text-xs text-gray-600">Stand out from competitors</p>
							</div>
						</div>
					</div>

					<Button className="hover:bg-primary bg-primary/90 mt-4 text-white">
						Get Started
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>

				<div className="hidden md:block md:w-1/3 lg:w-2/5">
					<div
						className="bg-primary h-full bg-opacity-10  bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: `url('/assets/images/advertise.jpg')`,
						}}
					></div>
				</div>
			</div>
		</div>
	);
}
