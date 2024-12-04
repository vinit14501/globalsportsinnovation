import { useState, useCallback, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SlidingContactForm from "./SlidingContactForm"
import { useNavigation } from "../NavigationContext"

const getCurrentSection = () => {
  const sections = [
    "home",
    "about",
    "services",
    "clients",
    "contact",
    "gallery",
  ]
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
  return "home"
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
          setTimeout(() => {
            section.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }
        window.history.pushState(null, "", `/#${sectionId}`)
      }

      if (location.pathname === "/gallery") {
        navigate("/", {
          state: {
            targetSection: sectionId,
            fromPath: location.pathname,
          },
        })
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

  useEffect(() => {
    if (location.pathname === "/" && location.state?.targetSection) {
      const { targetSection, fromPath } = location.state
      setActiveSection(targetSection)
      const section = document.getElementById(targetSection)

      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }

      navigate("/", {
        state: null,
        replace: true,
      })
    }
  }, [location, navigate, setActiveSection])

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
              ? "text-[#2c439c]"
              : "text-[#121212] hover:text-blue-700"
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
          className={`block px-4 py-2 hover:bg-[#F3F4F6] transition duration-300 ease-in-out w-full text-left font-serif ${
            state.activeSubSection === sectionId ? "text-[#2c439c]" : ""
          }`}
          onClick={() => handleNavigation(sectionId, true)}
        >
          {label}
        </button>
      </li>
    ),
    [state.activeSubSection, handleNavigation]
  )

  return (
    <>
      <nav
        ref={navRef}
        className={`bg-[#FFFFFF] fixed w-full z-40 top-0 left-0 border-b border-[#E5E7EB] shadow-md transition-all duration-300 ${
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
              className="text-white bg-[#2c439c] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-[#93C5FD] rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out transform hover:scale-105 font-serif font-bold"
              onClick={() => toggleState("isContactFormOpen")}
            >
              Book Now
            </button>
            <button
              onClick={() => toggleState("isMobileMenuOpen")}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#121212] rounded-lg md:hidden hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#D1D5DB] font-serif"
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
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#FFFFFF]">
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
                        ? "text-[#2c439c]"
                        : "text-[#1F2937] hover:text-blue-700"
                    }`}
                    onClick={toggleAboutDropdown}
                    aria-expanded={state.isAboutDropdownOpen}
                  >
                    About <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  <div
                    id="dropdownNavbar"
                    className={`absolute z-10 font-normal bg-[#FFFFFF] divide-y divide-[#E5E7EB] rounded-lg shadow-lg w-44 transition-all duration-300 ease-in-out ${
                      state.isAboutDropdownOpen
                        ? "opacity-100 visible transform translate-y-0"
                        : "opacity-0 invisible transform -translate-y-2"
                    }`}
                  >
                    <ul
                      className="py-2 text-sm text-[#4B5563]"
                      aria-labelledby="dropdownLargeButton"
                    >
                      {renderDropdownItem("about", "Why US")}
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
                      ? "text-[#2c439c]"
                      : "text-[#121212] hover:text-blue-700"
                  }`}
                  onClick={() => setActiveSection("gallery")}
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
