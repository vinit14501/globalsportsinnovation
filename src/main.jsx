import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

// Performance monitoring utility
const measurePerformance = () => {
  if ("performance" in window && "PerformanceObserver" in window) {
    // Create performance observer
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === "largest-contentful-paint") {
          console.log("LCP:", entry.startTime)
        }
        if (entry.entryType === "first-input") {
          console.log("FID:", entry.processingStart - entry.startTime)
        }
      })
    })

    // Observe LCP and FID
    observer.observe({
      entryTypes: ["largest-contentful-paint", "first-input"],
    })
  }
}

// Resource preloading with corrected paths
const preloadResources = () => {
  const criticalResources = [
    { type: "image", path: "/favicon.ico" },
    { type: "font", path: "/fonts/Inter-roman.var.woff2" },
  ]

  criticalResources.forEach(({ type, path }) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = type
    link.href = path
    if (type === "font") {
      link.crossOrigin = "anonymous"
      link.type = "font/woff2"
    }
    document.head.appendChild(link)
  })
}

// Initialize app with performance monitoring
const initializeApp = () => {
  measurePerformance()
  preloadResources()

  const root = createRoot(document.getElementById("root"))
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

initializeApp()
