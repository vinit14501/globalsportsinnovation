import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="max-w-lg w-full text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
            {/* Show error details in development */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 text-left">
                <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <summary className="text-red-600 dark:text-red-400 font-semibold cursor-pointer">
                    Error Details
                  </summary>
                  <pre className="mt-4 text-sm text-gray-800 dark:text-gray-200 overflow-auto">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
