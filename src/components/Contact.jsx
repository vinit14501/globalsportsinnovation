import { Phone, Mail } from "lucide-react"

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
      className="py-24 bg-gradient-to-b from-white to-gray-200"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:-mx-6">
          <div className="lg:w-1/2 lg:mx-6">
            <h2 className="text-3xl text-[#2c439c] mb-4 sm:text-4xl font-bold font-serif">
              Contact us
            </h2>
            <p className="text-base text-[#121212] mb-8 font-serif">
              Your next sponsorship can be more than a campaign—it can be a
              legacy. Bold ideas, measurable outcomes, and impactful
              partnerships start here.
            </p>
            <p className="text-base mt-0 text-[#121212] mb-3 font-serif">
              Ready to ignite your investment and leave a lasting impression?
            </p>
            <p className="text-base mt-0 text-[#121212] mb-3 font-serif">
              Let&apos;s start the conversation today.
            </p>

            <div className="mt-6 space-y-8">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#2c439c]" />
                <a
                  href="tel:+17193304922"
                  className="text-[#121212] font-serif hover:text-blue-700"
                >
                  +1 719-330-4922
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#2c439c]" />
                <a
                  href="mailto:Susan.p.goldsmith@gmail.com"
                  className="text-[#121212] font-serif hover:text-blue-700"
                >
                  Susan.p.goldsmith@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-6 md:mt-8">
              <h3 className="text-[#121212] lext-lg font-bold font-serif">
                Follow us
              </h3>
              <div className="flex mt-4 -mx-1.5">
                <a
                  className="mx-1.5 text-[#2c439c]"
                  href="https://www.linkedin.com/in/susangoldsmith"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedInIcon"
                >
                  <LinkedInIcon className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-xl">
              <h3 className="text-2xl font-bold text-[#2c439c] mb-4 font-serif">
                Get in touch
              </h3>

              <form className="mt-6">
                <div className="flex-1">
                  <div className="mb-4">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-md font-medium text-[#121212] font-serif"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 text-[#121212] bg-white border rounded-md focus:outline-none focus:border-[#2c439c] font-serif"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-md font-medium text-[#121212] font-serif"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="johndoe@example.com"
                      className="w-full px-3 py-2 text-[#121212] bg-white border rounded-md focus:outline-none focus:border-[#2c439c] font-serif"
                    />
                  </div>
                </div>

                <div className="w-full mt-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-md font-medium text-[#121212] font-serif"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    className="w-full px-3 py-2 text-[#121212] bg-white border rounded-md focus:outline-none focus:border-[#2c439c] font-serif"
                  ></textarea>
                </div>

                <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#2c439c] rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-[#2c439c] focus:ring-opacity-50">
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
