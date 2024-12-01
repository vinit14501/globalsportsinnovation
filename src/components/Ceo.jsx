const Ceo = () => (
  <section
    id="story"
    className="py-24 bg-gradient-to-b from-white to-gray-100"
  >
    <div className="w-full max-w-screen-xl px-4 md:px-6 lg:px-8 mx-auto">
      <div className="w-full grid lg:grid-cols-7 gap-8 items-center">
        <div className="lg:col-span-3">
          <div className="max-w-md mx-auto">
            <img
              className="w-full h-auto rounded-sm shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-100"
              src="ceo.jpg"
              alt="CEO Susan Goldsmith"
            />
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col justify-start lg:items-start items-center">
          <div className="w-full space-y-5">
            <div className="space-y-1">
              <h2 className="text-blue-600 text-xl sm:text-4xl leading-tight lg:text-start text-center mb-4 font-serif">
                Meet Our CEO
              </h2>
              <p className="text-gray-700 text-xl font-bold leading-normal lg:text-start text-center font-serif italic">
                Susan Goldsmith
              </p>
              <p className="text-gray-700 text-base sm:text-lg font-normal leading-relaxed lg:text-start text-center font-serif">
                A strategic leader in the global sports industry, I have over 30
                years of experience navigating the complexities of the Olympic
                and sports ecosystems. Known for bold thinking and a
                results-driven approach, I connect brands, people, and ideas
                around shared values to build impactful, innovative sponsorship
                programs. Across 15 Olympic Games, I have partnered with
                National Olympic Committees, Olympic Marketing Partners,
                broadcasters, Organizing Committees, and National Federations,
                leveraging strategic insights to deliver integrated platforms
                that include objective-driven activations, experiential events,
                hospitality, and operational programs.
              </p>
              <p className="text-gray-700 text-base sm:text-lg font-normal leading-relaxed lg:text-start text-center font-serif pt-2">
                As a senior leader in Partnership Marketing with the United
                States Olympic &amp; Paralympic Committee, I developed and
                executed major activation strategies for iconic brands like
                Coca-Cola, P&amp;G, Visa, Budweiser, Hilton, Samsung, GE, and
                Kellogg’s. My strategic vision helped these brands achieve
                measurable outcomes, strengthen global visibility, and create
                lasting connections with audiences. I am a visionary leader
                dedicated to fostering a culture of transparency,
                accountability, courage, and trust, helping individuals and
                teams reach their highest potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Ceo
