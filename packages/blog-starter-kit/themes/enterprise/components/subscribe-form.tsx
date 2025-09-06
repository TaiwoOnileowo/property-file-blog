import request from 'graphql-request';
import { useRef, useState } from 'react';
import {
	SubscribeToNewsletterDocument,
	SubscribeToNewsletterMutation,
	SubscribeToNewsletterMutationVariables,
	SubscribeToNewsletterPayload,
} from '../generated/graphql';
import { useAppContext } from './contexts/appContext';
import DefaultInput from './DefaultInput';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

export const SubscribeForm = () => {
	const [status, setStatus] = useState<SubscribeToNewsletterPayload['status']>();
	const [requestInProgress, setRequestInProgress] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { publication } = useAppContext();

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const subscribe = async () => {
		const email = inputRef.current?.value?.trim();

		// Reset previous error
		setError(null);

		if (!email) {
			setError('Please enter your email address');
			return;
		}

		if (!validateEmail(email)) {
			setError('Please enter a valid email address');
			return;
		}

		setRequestInProgress(true);

		try {
			const data = await request<
				SubscribeToNewsletterMutation,
				SubscribeToNewsletterMutationVariables
			>(GQL_ENDPOINT, SubscribeToNewsletterDocument, {
				input: { publicationId: publication.id, email },
			});
			setRequestInProgress(false);
			setStatus(data.subscribeToNewsletter.status);

			// Clear the input on successful subscription
			if (inputRef.current) {
				inputRef.current.value = '';
			}
		} catch (error) {
			const message =
				(error as any).response?.errors?.[0]?.message || 'An error occurred. Please try again.';
			setError(message);
			setRequestInProgress(false);
		}
	};

	// Handle Enter key press
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			subscribe();
		}
	};

	const resetForm = () => {
		setStatus(undefined);
		setError(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};
	return (
		<div className="w-full">
			{!status && (
				<div className="space-y-2">
					<DefaultInput
						type="email"
						ref={inputRef}
						placeholder="Enter your email address"
						btnText="Subscribe"
						onButtonClick={subscribe}
						disabled={requestInProgress}
						loading={requestInProgress}
						onKeyPress={handleKeyPress}
					/>
					{error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
				</div>
			)}
			{status === 'PENDING' && (
				<div className="relative w-full rounded-md border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-900/20">
					<p className="font-bold text-green-600 dark:text-green-500">Almost there!</p>
					<p className="mt-2 font-medium text-slate-600 dark:text-neutral-300">
						Check your inbox for a confirmation email and click{' '}
						<strong>&quot;Confirm and Subscribe&quot;</strong> to complete your subscription. Thanks
						for joining us!
					</p>
				</div>
			)}
			{status === 'CONFIRMED' && (
				<div className="relative w-full rounded-md border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-900/20">
					<p className="font-bold text-green-600 dark:text-green-500">Welcome aboard! 🎉</p>
					<p className="mt-2 font-medium text-slate-600 dark:text-neutral-300">
						You&apos;ve successfully subscribed to our newsletter. You&apos;ll receive the latest
						updates and insights directly in your inbox.
					</p>
					<button
						onClick={resetForm}
						className="mt-3 text-sm text-blue-600 hover:underline dark:text-blue-400"
					>
						Subscribe another email →
					</button>
				</div>
			)}
		</div>
	);
};
