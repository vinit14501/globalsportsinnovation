import { LinkedinIcon, Mail } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function Footer() {
  const navigate = useNavigate()

  const handleLogoClick = (event) => {
    event.preventDefault()
    navigate("/")
    window.scrollTo(0, 0)
  }

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
              />
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-600 transition-colors duration-300"
              >
                abc@info@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <LinkedinIcon className="w-5 h-5 text-blue-600" />
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-600 transition-colors duration-300"
              >
                Follow us on LinkedIn
              </a>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 dark:border-gray-700" />
        <div className="text-center">
          <span className="text-md text-gray-800 dark:text-gray-400 font-serif italic">
            © 2024 Stawloom. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
