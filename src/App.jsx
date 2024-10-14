import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
import Hero from "./components/Hero"

function MainPage() {
  return (
    <>
      {/* <Hero /> */}
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/gallery"
          element={<Gallery />}
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
