const InputField = ({ label, type, placeholder }) => (
  <div className="mb-6">
    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-400"
    />
  </div>
)

export default function Contact2() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
              Get in Touch
            </h2>
            <form>
              <InputField
                label="Full Name"
                type="text"
                placeholder="John Doe"
              />
              <InputField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
              />
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-400"
                  rows="5"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
