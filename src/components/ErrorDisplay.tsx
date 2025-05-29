import * as React from 'react';
import { AppError, ErrorCode } from '@/lib/error';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
	error: Error | AppError;
	reset?: () => void;
	className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, reset, className }) => {
	const isAppError = error instanceof AppError;
	const errorCode = isAppError ? error.code : ErrorCode.UNKNOWN_ERROR;

	// Customize message based on error code
	const getErrorMessage = () => {
		switch (errorCode) {
			case ErrorCode.NETWORK_ERROR:
				return "We're having trouble connecting to the server. Please check your connection.";
			case ErrorCode.PROGRAM_NOT_FOUND:
				return "We couldn't find the property you were looking for.";
			case ErrorCode.UNAUTHORIZED:
				return "You don't have permission to view this content.";
			default:
				return "Something unexpected happened. We're looking into it.";
		}
	};

	const isRetryable = isAppError ? error.isRetryable : true;

	return (
		<div className={cn('rounded-md border-2 border-primary-red-3 bg-primary-red-4 bg-opacity-30 p-4 my-4', 'animate-[fadeIn_0.3s_ease-in-out]', className)} style={{ fontFamily: 'var(--font-body)' }}>
			<div className='flex'>
				<div className='flex-shrink-0 mt-0.5'>
					<div className='w-6 h-6 flex items-center justify-center rounded-full bg-primary-red-2'>
						<svg className='h-4 w-4 text-tertiary-white-1' viewBox='0 0 20 20' fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
				</div>
				<div className='ml-3 flex-1'>
					<h3 className='text-md font-semibold text-tertiary-black-2' style={{ fontFamily: 'var(--font-heading)' }}>
						{getErrorMessage()}
					</h3>
					{isAppError && (
						<div className='mt-2 text-tertiary-black-1' style={{ fontSize: 'var(--font-size-sm)' }}>
							<p>{error.message}</p>
							{error.context && (
								<details className='mt-2 group'>
									<summary className='cursor-pointer text-xs text-primary-blue-1 hover:text-primary-blue-2 transition-colors'>Technical details</summary>
									<pre className='mt-2 text-xs overflow-auto scrollbar-hide p-2 rounded bg-tertiary-black-4 bg-opacity-20 max-h-40'>{JSON.stringify(error.context, null, 2)}</pre>
								</details>
							)}
						</div>
					)}
					<div className='mt-4 flex gap-2'>
						{isRetryable && reset && (
							<button
								type='button'
								onClick={reset}
								className='rounded-md bg-primary-red-2 px-3 py-1.5 text-tertiary-white-1 hover:bg-primary-red-1 transition-colors'
								style={{ fontSize: 'var(--font-size-sm)' }}>
								Try again
							</button>
						)}
						<button
							type='button'
							onClick={() => window.location.reload()}
							className='rounded-md border border-tertiary-black-3 px-3 py-1.5 text-tertiary-black-2 hover:bg-tertiary-black-4 hover:bg-opacity-30 transition-colors'
							style={{ fontSize: 'var(--font-size-sm)' }}>
							Reload page
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorDisplay;
