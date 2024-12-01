import { useCallback, useMemo } from "react"
import { Mail, Phone } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useNavigation } from "../NavigationContext"

const ContactLink = ({ Icon, href, children, type }) => (
  <div className="flex items-center space-x-3">
    <Icon className="w-5 h-5 text-blue-600" />
    <a
      href={type === "email" ? `mailto:${href}` : `tel:${href}`}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-600 transition-colors duration-300"
    >
      {children}
    </a>
  </div>
)

const Footer = () => {
  const navigate = useNavigate()
  const { setActiveSection } = useNavigation()

  const handleLogoClick = useCallback(
    (event) => {
      event.preventDefault()
      navigate("/")
      setActiveSection("home")
      window.scrollTo(0, 0)
    },
    [navigate, setActiveSection]
  )

  const memoizedContactLinks = useMemo(
    () => (
      <div className="flex flex-col space-y-4">
        <ContactLink
          Icon={Mail}
          href="Susan.p.goldsmith@gmail.com"
          type="email"
        >
          Susan.p.goldsmith@gmail.com
        </ContactLink>
        <ContactLink
          Icon={Phone}
          href="+1 719-330-4922"
          type="phone"
        >
          +1 719-330-4922
        </ContactLink>
      </div>
    ),
    []
  )

  const memoizedCopyright = useMemo(
    () => (
      <span className="text-md text-gray-800 dark:text-gray-400 font-serif">
        © {new Date().getFullYear()} Stawloom. All Rights Reserved.
      </span>
    ),
    []
  )

  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 dark:bg-gray-900 py-12">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              to="/"
              onClick={handleLogoClick}
            >
              <img
                src="logo.png"
                alt="Global Sports Innovation Logo"
                className="w-48 h-12 object-contain"
                loading="lazy"
              />
            </Link>
          </div>
          {memoizedContactLinks}
        </div>
        <hr className="my-8 border-gray-200 dark:border-gray-700" />
        <div className="text-center">{memoizedCopyright}</div>
      </div>
    </footer>
  )
}

export default Footer
