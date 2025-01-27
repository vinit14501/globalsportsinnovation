import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy, useState, useEffect } from "react"
import { NavigationProvider } from "./NavigationContext"
import ErrorBoundary from "./components/ErrorBoundary"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Lazy load components with prefetching and loading states
const MainPage = lazy(() => import("./components/MainPage"))
const Gallery = lazy(() => import("./components/Gallery"))

// Enhanced Loading component with aria-label
const LoadingFallback = () => (
  <div
    className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900"
    role="progressbar"
    aria-label="Loading content"
  >
    <div className="space-y-8 w-full max-w-7xl px-4">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Initialize visibility immediately
  useEffect(() => {
    document.body.style.visibility = "visible"
    document.body.style.opacity = "1"
  }, [])

  // Enhanced online/offline handler
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Optimized prefetching
  useEffect(() => {
    const prefetchComponents = async () => {
      if (!navigator.onLine) return

      try {
        const componentsToPreload = [
          () => import("./components/MainPage"),
          () => import("./components/Gallery"),
        ]

        await Promise.all(componentsToPreload.map((component) => component()))
      } catch (error) {
        console.error("Error prefetching components:", error)
      }
    }

    const prefetchWithRequestIdleCallback = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => prefetchComponents(), { timeout: 2000 })
      } else {
        setTimeout(prefetchComponents, 0)
      }
    }

    prefetchWithRequestIdleCallback()
  }, [])

  return (
    <ErrorBoundary>
      <NavigationProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            {!isOnline && (
              <div
                role="alert"
                aria-live="polite"
                className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
              >
                You are currently offline. Please check your connection.
              </div>
            )}
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route
                    path="/"
                    element={<MainPage />}
                  />
                  <Route
                    path="/gallery"
                    element={<Gallery />}
                  />
                  <Route
                    path="*"
                    element={<MainPage />}
                  />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </NavigationProvider>
    </ErrorBoundary>
  )
}

export default App
