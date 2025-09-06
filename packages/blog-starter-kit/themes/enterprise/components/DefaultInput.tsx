import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const DefaultInput = forwardRef<
	HTMLInputElement,
	{
		type: string;
		placeholder: string;
		btnText: string;
		className?: string;
		btnClassName?: string;
		onButtonClick?: () => void;
		disabled?: boolean;
		loading?: boolean;
		onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	}
>(
	(
		{
			type,
			placeholder,
			btnText,
			className,
			btnClassName,
			onButtonClick,
			disabled,
			loading,
			onKeyPress,
		},
		ref,
	) => {
		return (
			<div className={cn('relative w-full rounded-md bg-white p-2 dark:bg-neutral-950', className)}>
				<input
					ref={ref}
					type={type}
					placeholder={placeholder}
					disabled={disabled || loading}
					onKeyPress={onKeyPress}
					className={cn(
						'focus:outline-default left-3 top-3 w-full rounded-md bg-transparent p-2 pr-24 text-base text-black outline-none disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:outline-blue-500',
					)}
				/>
				<button
					type="button"
					onClick={onButtonClick}
					disabled={disabled || loading}
					className={cn(
						'hover:bg-default/90 bg-default absolute right-3 top-2 rounded-md px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-80',
						btnClassName,
					)}
				>
					{loading ? 'Loading...' : btnText}
				</button>
			</div>
		);
	},
);

DefaultInput.displayName = 'DefaultInput';

export default DefaultInput;
