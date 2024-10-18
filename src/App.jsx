import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MainPage from "./components/MainPage"
import Gallery from "./components/Gallery"

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
        {/* Add a catch-all route */}
        <Route
          path="*"
          element={<MainPage />}
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
