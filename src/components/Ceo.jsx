export default function Ceo() {
  return (
    <section
      id="story"
      className="py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="w-full max-w-screen-xl px-4 md:px-6 lg:px-8 mx-auto">
        <div className="w-full grid lg:grid-cols-7 gap-8 items-center">
          <div className="lg:col-span-3">
            <div className="max-w-md mx-auto">
              <img
                className="w-full h-auto rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-100"
                src="/src/assets/ceo.png"
                alt="CEO Susan Goldsmith"
              />
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-start lg:items-start items-center">
            <div className="w-full space-y-5">
              <div className="space-y-1">
                <h2 className="text-gray-800 text-3xl sm:text-4xl font-bold leading-tight lg:text-start text-center mb-4">
                  Meet Our CEO
                </h2>
                <h3 className="text-blue-600 text-2xl font-bold leading-normal lg:text-start text-center">
                  Susan Goldsmith
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 text-base sm:text-lg font-normal leading-relaxed lg:text-start text-center">
                  Over 30 years and 14 Olympic Games experience in global sports
                  marketing. Partnering with dozens of Fortune 500 companies for
                  purpose-driven initiatives with global impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
