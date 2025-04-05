'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Home, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const headings = [
	'Find your dream home!',
	'Get a Home, not just a house!',
	'Your perfect home awaits!',
	'Discover your ideal space!',
];

const homeTypes = ['Apartment', 'Bungalow', 'Condo', 'Duplex', 'Mansion', 'Townhouse', 'Villa'];

export default function HorizontalHomeFinder() {
	const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
	const [animationStep, setAnimationStep] = useState(0);
	const [propertyType, setPropertyType] = useState('buy');
	const [location, setLocation] = useState('');
	const [homeType, setHomeType] = useState('');
	const [priceRange, setPriceRange] = useState([0, 1000000]);

	// Animate heading change
	useEffect(() => {
		const headingInterval = setInterval(() => {
			setCurrentHeadingIndex((prev) => (prev + 1) % headings.length);
			setAnimationStep(0);
		}, 5000);

		return () => clearInterval(headingInterval);
	}, []);

	// Animate text appearance
	useEffect(() => {
		if (animationStep < headings[currentHeadingIndex].length) {
			const textAnimationInterval = setTimeout(() => {
				setAnimationStep((prev) => prev + 1);
			}, 50);

			return () => clearTimeout(textAnimationInterval);
		}
	}, [animationStep, currentHeadingIndex]);

	const animatedText = headings[currentHeadingIndex].substring(0, animationStep);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log({
			propertyType,
			location,
			homeType,
			priceRange,
		});
	};

	return (
		<div className="mb-16 overflow-hidden rounded-lg bg-gradient-to-r from-green-50 to-teal-50 shadow-md">
			<form onSubmit={handleSubmit} className="p-6">
				<div className="mb-4 flex items-center">
					<Home className="text-primary mr-2 h-6 w-6 max-md:h-5 max-md:w-5" />
					<h3 className="font-heliosBold text-primary text-xl font-bold max-md:text-base">
						{animatedText}
						<span className="animate-pulse">|</span>
					</h3>
				</div>

				<div className=" flex flex-col gap-4">
					<div className="space-y-2">
						<div className="flex items-center gap-4 ">
							<Label>I want to:</Label>
							<RadioGroup
								defaultValue="buy"
								className="flex space-x-4"
								onValueChange={setPropertyType}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="buy" id="h-buy" />
									<Label htmlFor="h-buy" className="cursor-pointer">
										Buy
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="rent" id="h-rent" />
									<Label htmlFor="h-rent" className="cursor-pointer">
										Rent
									</Label>
								</div>
							</RadioGroup>
						</div>
					</div>

					<div className="grid w-full grid-cols-3 items-center gap-4 max-md:grid-cols-1">
						<div className="space-y-1">
							<Label htmlFor="h-location">Where?</Label>
							<div className="relative">
								<MapPin className="absolute left-2 top-2.5 h-4 w-4 text-emerald-600" />
								<Input
									id="h-location"
									placeholder="City, neighborhood, or ZIP"
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									className="border-emerald-200 pl-8 focus:border-emerald-500 focus:ring-emerald-500"
								/>
							</div>
						</div>

						<div className="space-y-1">
							<Label htmlFor="h-homeType">Home type</Label>
							<Select onValueChange={setHomeType}>
								<SelectTrigger className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent className="bg-white">
									{homeTypes.map((type) => (
										<SelectItem
											key={type}
											value={type.toLowerCase()}
											className="hover:bg-primary/10"
										>
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<Label>Budget: ₦{priceRange[1].toLocaleString()}</Label>
							</div>
							<div className="mt-2 flex flex-1 items-center gap-2">
								<Slider
									defaultValue={[1000000]}
									max={20000000}
									step={100000}
									min={500000}
									onValueChange={(value) => setPriceRange([0, value[0]])}
								/>
							</div>
						</div>
					</div>
					<Button type="submit" className="bg-primary/90 hover:bg-primary text-white">
						Find my dream home!
					</Button>
				</div>
			</form>
		</div>
	);
}
