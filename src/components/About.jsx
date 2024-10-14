export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="w-full max-w-screen-xl px-4 md:px-6 lg:px-8 mx-auto">
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-start lg:items-start items-center gap-8">
            <div className="w-full space-y-6">
              <h2 className="text-blue-600 text-3xl sm:text-4xl leading-tight lg:text-start text-center font-serif italic">
                Why Global Sport Innovations?
              </h2>
              <p className="text-gray-700 text-base sm:text-lg font-normal leading-relaxed lg:text-start text-center font-serif\">
                GSI empowers sports sponsors to create innovative and dynamic
                campaign strategies without getting lost in complex ecosystems.
                It's about creating meaningful connections, driving brand
                visibility, and growing your business.
              </p>
              <ul className="space-y-4 font-serif\">
                {[
                  "Driving brand visibility and equity",
                  "Campaign strategies in just 6 months",
                  "Results-driven plan",
                  "Optimize ROI",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3"
                  >
                    <img
                      src="/src/assets/tick.png"
                      alt="Blue Tick"
                      className="w-6 h-6 flex-shrink-0"
                    />
                    <span className="text-gray-800 text-base sm:text-lg font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full h-full">
            <img
              className="w-full h-auto rounded-sm object-cover shadow-xl"
              src="/src/assets/about.png"
              alt="About Us"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
