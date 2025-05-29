import * as React from 'react';

import { AppError } from '@/lib/error';

interface ErrorBoundaryState {
	error: AppError | Error | null;
	errorInfo: React.ErrorInfo | null;
}

interface Props {
	children: React.ReactNode;
	fallback?: React.ComponentType<{ error: Error | AppError; reset: () => void }>;
}

/**
 * Error boundary component that catches errors during rendering
 * Updated for React 19's new error handling approach
 */
class ErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
	constructor(props: Props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		// React 19 no longer re-throws this error, just reports it to console.error
		return { error, errorInfo: null };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// In React 19, componentDidCatch is still called, but the error is not re-thrown
		this.setState({ error, errorInfo });

		// No need to console.error here as React 19 already does this
		// with improved formatting for caught errors
	}

	reset = (): void => {
		this.setState({ error: null, errorInfo: null });
	};

	render(): React.ReactNode {
		if (this.state.error) {
			if (this.props.fallback) {
				const FallbackComponent = this.props.fallback;
				return <FallbackComponent error={this.state.error} reset={this.reset} />;
			}

			// Default error UI with your design system
			const errorMessage = this.state.error.message || 'An unexpected error occurred';
			const errorStack = this.state.error.stack;
			const componentStack = this.state.errorInfo?.componentStack;
			const errorCode = this.state.error instanceof AppError ? this.state.error.code : 'UNKNOWN_ERROR';

			return (
				<div className='w-full max-w-md mx-auto my-8 p-6 rounded-md bg-white border border-tertiary-black-4 shadow-md'>
					<div className='flex flex-col items-center text-center gap-4'>
						<div className='w-14 h-14 flex items-center justify-center rounded-full bg-primary-red-4'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='w-7 h-7 text-primary-red-2'>
								<circle cx='12' cy='12' r='10' />
								<line x1='12' y1='8' x2='12' y2='12' />
								<line x1='12' y1='16' x2='12.01' y2='16' />
							</svg>
						</div>

						<h2 style={{ fontFamily: 'var(--font-heading)' }} className='text-lg font-semibold text-tertiary-black-2'>
							{errorCode === 'UNAUTHORIZED' ? 'Authentication Required' : errorCode === 'FORBIDDEN' ? 'Access Denied' : 'Something Went Wrong'}
						</h2>

						<p style={{ fontFamily: 'var(--font-body)' }} className='text-tertiary-black-1'>
							{errorMessage}
						</p>

						<details className='w-full mt-2 text-left'>
							<summary className='text-sm text-primary-blue-1 hover:text-primary-blue-2 cursor-pointer transition-colors'>View technical details</summary>
							<pre className='mt-2 text-xs bg-tertiary-black-4 bg-opacity-20 p-2 rounded overflow-auto scrollbar-hide max-h-40'>
								{errorStack}
								{componentStack && (
									<>
										<br />
										<br />
										Component Stack:
										{componentStack}
									</>
								)}
							</pre>
						</details>

						<div className='flex gap-3 mt-4'>
							<button onClick={this.reset} className='px-4 py-2 rounded bg-primary-blue-1 text-white hover:bg-primary-blue-2 transition-colors' style={{ fontFamily: 'var(--font-body)' }}>
								Try Again
							</button>

							<button
								onClick={() => window.location.reload()}
								className='px-4 py-2 rounded border border-tertiary-black-3 hover:bg-tertiary-black-4 hover:bg-opacity-30 transition-colors'
								style={{ fontFamily: 'var(--font-body)' }}>
								Reload Page
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
