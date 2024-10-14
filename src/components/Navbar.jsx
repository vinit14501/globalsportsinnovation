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

  const handleNavItemClick = useCallback(
    (sectionId) => {
      setIsMobileMenuOpen(false)
      setIsAboutDropdownOpen(false)

      if (location.pathname === "/gallery") {
        navigate(`/#${sectionId}`)
      } else if (location.pathname !== "/") {
        window.location.href = `/#${sectionId}`
      } else {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
      }
    },
    [location.pathname, navigate]
  )

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
                isSticky ? "h-6" : "h-8"
              }`}
              alt="Logo"
            />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition duration-300 ease-in-out transform hover:scale-105"
              onClick={toggleContactForm}
            >
              Book Now
            </button>
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
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
                  className="block py-2 px-3 text-blue-600 rounded md:bg-transparent md:p-0 hover:text-blue-700 transition duration-300 ease-in-out text-sm"
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
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:w-auto transition duration-300 ease-in-out text-sm"
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
                              className="block px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left"
                              onClick={() => handleNavItemClick("about")}
                            >
                              Why GSI
                            </button>
                          </li>
                          <li>
                            <button
                              className="block px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left"
                              onClick={() => handleNavItemClick("story")}
                            >
                              Story
                            </button>
                          </li>
                          <li>
                            <button
                              className="block px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left"
                              onClick={() => handleNavItemClick("testimonial")}
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
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition duration-300 ease-in-out text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavItemClick("clients")}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition duration-300 ease-in-out text-sm"
                >
                  Clients served
                </button>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition duration-300 ease-in-out text-sm"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleNavItemClick("contact")}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition duration-300 ease-in-out text-sm"
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
    </>
  )
}
