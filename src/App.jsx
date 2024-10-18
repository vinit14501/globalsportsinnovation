import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom"
import About from "./components/About"
import Brand from "./components/Brand"
import Carousel from "./components/Carousel"
import Ceo from "./components/Ceo"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Services from "./components/Services"
import Testimonials from "./components/Testimonials"
import Gallery from "./components/Gallery"

function MainPage() {
  return (
    <>
      <Carousel />
      <About />
      <Services />
      <Brand />
      <Ceo />
      <Testimonials />
      <Contact />
    </>
  )
}

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState(location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  const renderContent = () => {
    switch (currentPath) {
      case "/":
        return <MainPage />
      case "/gallery":
        return <Gallery />
      default:
        navigate("/")
        return <MainPage />
    }
  }

  return (
    <>
      <Navbar />
      {renderContent()}
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
