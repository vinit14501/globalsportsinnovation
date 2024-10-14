import { useState, useCallback, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SlidingContactForm from "./SlidingContactForm"

export default function Navbar() {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownLoading, setIsDropdownLoading] = useState(true)
  const [isSticky, setIsSticky] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [activeSubSection, setActiveSubSection] = useState("")
  const navRef = useRef(null)
  const dropdownRef = useRef(null)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleAboutDropdown = useCallback(() => {
    setIsAboutDropdownOpen((prev) => !prev)
    if (!isDropdownLoading) {
      setIsDropdownLoading(true)
      setTimeout(() => setIsDropdownLoading(false), 500)
    }
  }, [isDropdownLoading])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const toggleContactForm = useCallback(() => {
    setIsContactFormOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false)
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
      lastScrollY.current = currentScrollY
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isAboutDropdownOpen) {
      setTimeout(() => setIsDropdownLoading(false), 500)
    }
  }, [isAboutDropdownOpen])

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      const hash = window.location.hash.replace("#", "")
      setActiveSection(hash || "home")
    } else if (location.pathname === "/gallery") {
      setActiveSection("gallery")
    } else {
      setActiveSection("")
    }
    setActiveSubSection("")
  }, [location.pathname, location.hash])

  const handleNavItemClick = useCallback(
    (sectionId) => {
      setIsMobileMenuOpen(false)
      setIsAboutDropdownOpen(false)
      setActiveSection(sectionId)
      setActiveSubSection("")

      if (location.pathname === "/gallery") {
        navigate("/")
        setTimeout(() => {
          const section = document.getElementById(sectionId)
          if (section) {
            section.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      } else if (location.pathname !== "/") {
        window.location.href = `/#${sectionId}`
      } else {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
        window.history.pushState(null, "", `/#${sectionId}`)
      }
    },
    [location.pathname, navigate]
  )

  const handleSubSectionClick = useCallback(
    (subSectionId) => {
      setActiveSection("about")
      setActiveSubSection(subSectionId)
      setIsMobileMenuOpen(false)
      setIsAboutDropdownOpen(false)

      if (location.pathname === "/gallery") {
        navigate("/")
        setTimeout(() => {
          const section = document.getElementById(subSectionId)
          if (section) {
            section.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      } else if (location.pathname !== "/") {
        window.location.href = `/#${subSectionId}`
      } else {
        const section = document.getElementById(subSectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
        window.history.pushState(null, "", `/#${subSectionId}`)
      }
    },
    [location.pathname, navigate]
  )

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActiveSection(hash)
        const section = document.getElementById(hash)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        setActiveSection("home")
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      setIsAboutDropdownOpen(false)
      setIsMobileMenuOpen(false)
    }
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`bg-white fixed w-full z-40 top-0 left-0 border-b border-gray-200 shadow-md transition-all duration-300 ${
          isSticky ? "py-2" : "py-4"
        }`}
        onKeyDown={handleKeyDown}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/src/assets/logo.png"
              className={`transition-all duration-300 ${
                isSticky ? "h-8" : "h-10"
              }`}
              alt="Logo"
            />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out transform hover:scale-105 font-serif font-bold"
              onClick={toggleContactForm}
            >
              Book Now
            </button>
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 font-serif"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <button
                  onClick={() => handleNavItemClick("home")}
                  className={`block py-2 px-3 rounded md:p-0 transition duration-300 ease-in-out text-lg font-serif italic ${
                    activeSection === "home"
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                  aria-current="page"
                >
                  Home
                </button>
              </li>
              <li>
                <div
                  className="relative group"
                  ref={dropdownRef}
                >
                  <button
                    id="dropdownNavbarLink"
                    className={`flex items-center justify-between w-full py-2 px-3 rounded md:p-0 md:w-auto transition duration-300 ease-in-out text-lg font-serif italic ${
                      activeSection === "about"
                        ? "text-blue-600"
                        : "text-gray-900 hover:text-blue-700"
                    }`}
                    onClick={toggleAboutDropdown}
                    aria-expanded={isAboutDropdownOpen}
                  >
                    About <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {isAboutDropdownOpen && (
                    <div
                      id="dropdownNavbar"
                      className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 transition-all duration-300 ease-in-out"
                    >
                      {isDropdownLoading ? (
                        <div className="py-2 px-4">
                          <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2.5"></div>
                          <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                        </div>
                      ) : (
                        <ul
                          className="py-2 text-sm text-gray-700"
                          aria-labelledby="dropdownLargeButton"
                        >
                          <li>
                            <button
                              className={`block px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left font-serif italic ${
                                activeSubSection === "about"
                                  ? "text-blue-600"
                                  : ""
                              }`}
                              onClick={() => handleSubSectionClick("about")}
                            >
                              Why GSI
                            </button>
                          </li>
                          <li>
                            <button
                              className={`block px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left font-serif italic ${
                                activeSubSection === "story"
                                  ? "text-blue-600"
                                  : ""
                              }`}
                              onClick={() => handleSubSectionClick("story")}
                            >
                              Story
                            </button>
                          </li>
                          <li>
                            <button
                              className={`block px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left font-serif italic ${
                                activeSubSection === "testimonial"
                                  ? "text-blue-600"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSubSectionClick("testimonial")
                              }
                            >
                              Testimonials
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <button
                  onClick={() => handleNavItemClick("services")}
                  className={`block py-2 px-3 rounded md:p-0 transition duration-300 ease-in-out text-lg font-serif italic ${
                    activeSection === "services"
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavItemClick("clients")}
                  className={`block py-2 px-3 rounded md:p-0 transition duration-300 ease-in-out text-lg font-serif italic ${
                    activeSection === "clients"
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  Clients served
                </button>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className={`block py-2 px-3 rounded md:p-0 transition duration-300 ease-in-out text-lg font-serif italic ${
                    activeSection === "gallery"
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleNavItemClick("contact")}
                  className={`block py-2 px-3 rounded md:p-0 transition duration-300 ease-in-out text-lg font-serif italic ${
                    activeSection === "contact"
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SlidingContactForm
        isOpen={isContactFormOpen}
        onClose={toggleContactForm}
      />

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400;1,700&display=swap");

        body {
          font-family: "Merriweather", serif;
        }
      `}</style>
    </>
  )
}
