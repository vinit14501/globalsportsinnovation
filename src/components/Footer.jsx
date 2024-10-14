import { LinkedinIcon } from "lucide-react"

const ContactInfo = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-3">
    <Icon className="w-5 h-5 text-blue-600" />
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </div>
)

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 dark:bg-gray-900 py-12">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Global Sports Innovation
            </h2>
            {/* <p className="text-gray-600 dark:text-gray-400">
              Innovating for a better future
            </p> */}
          </div>
          <div className="flex flex-col space-y-4">
            <ContactInfo
              icon={(props) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  {...props}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              )}
              text="abc@info.com"
            />
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
          <span className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Stawloom. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
