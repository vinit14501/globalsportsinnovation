import React from "react"

const ContactInfo = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-3">
    <Icon className="w-5 h-5 text-blue-600" />
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </div>
)

const InputField = ({ label, type, placeholder }) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
    />
  </div>
)

const LinkedInIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:-mx-6">
          <div className="lg:w-1/2 lg:mx-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:text-4xl">
              Contact us
            </h2>
            <p className="text-xl font-bold text-blue-600 mb-8">
              We'd love to hear from you
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Please fill out this form or reach out to us using the contact
              information below.
            </p>

            <div className="mt-6 space-y-8">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
                text="711-2880 Nulla St. Mankato Mississippi 96522"
              />
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                )}
                text="(257) 563-7401"
              />
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
                text="info@example.com"
              />
            </div>

            <div className="mt-6 md:mt-8">
              <h3 className="text-gray-700 dark:text-gray-300 font-bold">
                Follow us
              </h3>
              <div className="flex mt-4 -mx-1.5">
                <a
                  className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-blue-600"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-xl">
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
                Get in touch
              </h3>

              <form className="mt-6">
                <div className="flex-1">
                  <InputField
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Email address"
                    type="email"
                    placeholder="johndoe@example.com"
                  />
                </div>

                <div className="w-full mt-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-40"
                    placeholder="Message"
                  ></textarea>
                </div>

                <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-50">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
