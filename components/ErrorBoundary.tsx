'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component to catch and display errors gracefully.
 * Prevents entire app from crashing on component errors.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center bg-stone-100 font-mono">
            <div className="mx-4 flex w-full max-w-sm flex-col items-center gap-3 border-2 border-stone-900 bg-stone-50 p-12 text-center">
              <div className="text-5xl">⚠</div>
              <h2 className="text-lg font-bold tracking-widest text-stone-900">
                OOPS!
              </h2>
              <p className="text-xs leading-relaxed text-stone-500">
                Something went wrong. Please refresh the page to try again.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <pre className="mt-4 max-h-48 w-full overflow-auto rounded border border-stone-300 bg-stone-100 p-3 text-left text-[10px] text-stone-700">
                  {this.state.error.message}
                </pre>
              )}
              <button
                className="mt-4 w-full cursor-pointer border border-stone-900 bg-stone-900 py-2 text-[10px] font-bold tracking-widest text-stone-100 transition-colors hover:bg-stone-700"
                onClick={() => window.location.reload()}>
                REFRESH PAGE
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
