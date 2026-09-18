import React from 'react';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <FiAlertTriangle className="text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
          <p className="text-sm text-slate-400 max-w-md mb-6">
            An unexpected error occurred while rendering this page.
          </p>

          <div className="w-full max-w-xl bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left mb-6 overflow-x-auto text-xs font-mono text-red-300">
            <p className="font-bold text-red-400 mb-1">{this.state.error?.toString()}</p>
            {this.state.errorInfo?.componentStack && (
              <pre className="text-slate-500 text-[11px] whitespace-pre-wrap mt-2 max-h-48 overflow-y-auto">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <FiRefreshCw /> Reload Page
            </button>
            <a
              href="/admin/dashboard"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-all"
            >
              <FiHome /> Back to Dashboard
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
