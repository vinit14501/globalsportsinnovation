import { useState, useCallback, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SlidingContactForm from "./SlidingContactForm"
import { useNavigation } from "../NavigationContext"

// Updated utility function to get the current section based on scroll position
const getCurrentSection = () => {
  const sections = ["home", "about", "services", "clients", "contact"]
  const subsections = ["story", "testimonial"]

  for (const section of [...sections, ...subsections]) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        return section
      }
    }
  }
  return "home" // Default to home if no section is found
}

export default function Navbar() {
  const { activeSection, setActiveSection } = useNavigation()
  const [state, setState] = useState({
    isAboutDropdownOpen: false,
    isMobileMenuOpen: false,
    isSticky: false,
    isContactFormOpen: false,
    activeSubSection: "",
  })

  const navRef = useRef(null)
  const dropdownRef = useRef(null)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()

  const updateState = useCallback((newState) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }, [])

  const toggleState = useCallback((key) => {
    setState((prevState) => ({ ...prevState, [key]: !prevState[key] }))
  }, [])

  const toggleAboutDropdown = useCallback(() => {
    toggleState("isAboutDropdownOpen")
  }, [toggleState])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        updateState({ isMobileMenuOpen: false })
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        updateState({ isAboutDropdownOpen: false })
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      updateState({ isSticky: currentScrollY > lastScrollY.current })
      lastScrollY.current = currentScrollY

      // Update active section based on scroll position
      const newActiveSection = getCurrentSection()
      if (["story", "testimonial"].includes(newActiveSection)) {
        setActiveSection("about")
        updateState({ activeSubSection: newActiveSection })
      } else {
        setActiveSection(newActiveSection)
        updateState({ activeSubSection: "" })
      }
    }

    const debouncedHandleScroll = debounce(handleScroll, 100)

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", debouncedHandleScroll, { passive: true })

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", debouncedHandleScroll)
    }
  }, [updateState, setActiveSection])

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    setActiveSection(
      location.pathname === "/gallery" ? "gallery" : hash || "home"
    )
    updateState({ activeSubSection: "" })
  }, [location.pathname, location.hash, setActiveSection, updateState])

  const handleNavigation = useCallback(
    (sectionId, isSubSection = false) => {
      updateState({
        isMobileMenuOpen: false,
        isAboutDropdownOpen: false,
        activeSubSection: isSubSection ? sectionId : "",
      })

      const newActiveSection = isSubSection ? "about" : sectionId
      setActiveSection(newActiveSection)

      const navigateToSection = () => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
        window.history.pushState(null, "", `/#${sectionId}`)
      }

      if (location.pathname === "/gallery") {
        navigate("/", { state: { targetSection: newActiveSection } })
      } else if (location.pathname !== "/") {
        window.location.href = `/#${sectionId}`
      } else {
        navigateToSection()
      }
    },
    [location.pathname, navigate, updateState, setActiveSection]
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
    return () => window.removeEventListener("popstate", handlePopState)
  }, [setActiveSection])

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        updateState({ isAboutDropdownOpen: false, isMobileMenuOpen: false })
      }
    },
    [updateState]
  )

  const renderNavItem = useCallback(
    (sectionId, label) => (
      <li>
        <button
          onClick={() => handleNavigation(sectionId)}
          className={`block py-2 px-3 rounded md:p-0 transition duration-300 ease-in-out text-lg font-serif ${
            activeSection === sectionId
              ? "text-blue-600"
              : "text-gray-900 hover:text-blue-700"
          }`}
        >
          {label}
        </button>
      </li>
    ),
    [activeSection, handleNavigation]
  )

  const renderDropdownItem = useCallback(
    (sectionId, label) => (
      <li>
        <button
          className={`block px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left font-serif ${
            state.activeSubSection === sectionId ? "text-blue-600" : ""
          }`}
          onClick={() => handleNavigation(sectionId, true)}
        >
          {label}
        </button>
      </li>
    ),
    [state.activeSubSection, handleNavigation]
  )

  useEffect(() => {
    if (location.pathname === "/" && location.state?.targetSection) {
      const targetSection = location.state.targetSection
      setActiveSection(targetSection)
      const section = document.getElementById(targetSection)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
      // Clear the state to avoid unwanted scrolling on subsequent renders
      navigate("/", { state: null, replace: true })
    }
  }, [location, navigate, setActiveSection])

  return (
    <>
      <nav
        ref={navRef}
        className={`bg-white fixed w-full z-40 top-0 left-0 border-b border-gray-200 shadow-md transition-all duration-300 ${
          state.isSticky ? "py-2" : "py-4"
        }`}
        onKeyDown={handleKeyDown}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("home")
            }}
          >
            <img
              src="logo.png"
              className={`transition-all duration-300 ${
                state.isSticky ? "h-8" : "h-10"
              }`}
              alt="Logo"
            />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out transform hover:scale-105 font-serif font-bold"
              onClick={() => toggleState("isContactFormOpen")}
            >
              Book Now
            </button>
            <button
              onClick={() => toggleState("isMobileMenuOpen")}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 font-serif"
              aria-controls="navbar-sticky"
              aria-expanded={state.isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {state.isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          <div
            className={`${
              state.isMobileMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              {renderNavItem("home", "Home")}
              <li>
                <div
                  className="relative group"
                  ref={dropdownRef}
                >
                  <button
                    id="dropdownNavbarLink"
                    className={`flex items-center justify-between w-full py-2 px-3 rounded md:p-0 md:w-auto transition duration-300 ease-in-out text-lg font-serif ${
                      activeSection === "about"
                        ? "text-blue-600"
                        : "text-gray-900 hover:text-blue-700"
                    }`}
                    onClick={toggleAboutDropdown}
                    aria-expanded={state.isAboutDropdownOpen}
                  >
                    About <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  <div
                    id="dropdownNavbar"
                    className={`absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 transition-all duration-300 ease-in-out ${
                      state.isAboutDropdownOpen
                        ? "opacity-100 visible transform translate-y-0"
                        : "opacity-0 invisible transform -translate-y-2"
                    }`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownLargeButton"
                    >
                      {renderDropdownItem("about", "Why GSI")}
                      {renderDropdownItem("story", "Story")}
                      {renderDropdownItem("testimonial", "Testimonials")}
                    </ul>
                  </div>
                </div>
              </li>
              {renderNavItem("services", "Services")}
              {renderNavItem("clients", "Clients served")}
              <li>
                <Link
                  to="/gallery"
                  className={`block py-2 px-3 rounded md:p-0 transition duration-300 ease-in-out text-lg font-serif ${
                    activeSection === "gallery"
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  Gallery
                </Link>
              </li>
              {renderNavItem("contact", "Contact")}
            </ul>
          </div>
        </div>
      </nav>
      <SlidingContactForm
        isOpen={state.isContactFormOpen}
        onClose={() => toggleState("isContactFormOpen")}
      />
    </>
  )
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
