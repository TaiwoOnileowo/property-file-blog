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
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const headings = [
	'Find your dream home today!',
	'Get a Home, not just a house!',
	'Your perfect home awaits!',
	'Discover your ideal space!',
];

const homeTypes = ['Apartment', 'Bungalow', 'Condo', 'Duplex', 'Mansion', 'Townhouse', 'Villa'];

export default function HomeFinderWidget() {
	const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
	const [animationStep, setAnimationStep] = useState(0);
	const [propertyType, setPropertyType] = useState('buy');
	const [location, setLocation] = useState('');
	const [homeType, setHomeType] = useState('');
	const [priceRange, setPriceRange] = useState([0, 1000000]);
	const [isExpanded, setIsExpanded] = useState(false);

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
		// Handle form submission - you would add your search logic here
		console.log({
			propertyType,
			location,
			homeType,
			priceRange,
		});
		// Reset form or navigate to results page
	};

	return (
		<div className="relative h-full w-full rounded-lg bg-gradient-to-r from-green-50 to-teal-50 shadow-md transition-all duration-300 md:w-full">
			<div className="p-4">
				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="font-heliosBold text-primary text-lg font-bold">
							{animatedText}
							<span className="animate-pulse">|</span>
						</h3>
					</div>

					<div className="space-y-3">
						<RadioGroup
							defaultValue="buy"
							className="flex space-x-4"
							onValueChange={setPropertyType}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="buy" id="buy" />
								<Label htmlFor="buy" className="cursor-pointer">
									Buy
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="rent" id="rent" />
								<Label htmlFor="rent" className="cursor-pointer">
									Rent
								</Label>
							</div>
						</RadioGroup>

						<div className="space-y-2">
							<div className="flex items-center space-x-2">
								<MapPin className="h-4 w-4 text-emerald-600" />
								<Label htmlFor="location">Where do you want to live?</Label>
							</div>
							<Input
								id="location"
								placeholder="Enter city, neighborhood"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="homeType">What type of home do you need?</Label>
							<Select onValueChange={setHomeType}>
								<SelectTrigger className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500">
									<SelectValue placeholder="Select home type" />
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

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label>Max budget</Label>
								<span className="text-sm font-medium">₦{priceRange[1].toLocaleString()}</span>
							</div>
							<Slider
								defaultValue={[1000000]}
								max={20000000}
								step={100000}
								min={500000}
								onValueChange={(value) => setPriceRange([0, value[0]])}
								className="py-4"
							/>
						</div>

						<Button type="submit" className="bg-primary/90 hover:bg-primary w-full text-white">
							Find My Dream Home
						</Button>
					</div>
				</form>
				{/* )} */}
			</div>
		</div>
	);
}
