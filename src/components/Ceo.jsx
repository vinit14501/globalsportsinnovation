const Ceo = () => {
  return (
    <section
      id="story"
      className="py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="w-full max-w-screen-xl px-4 md:px-6 lg:px-8 mx-auto">
        <div className="w-full grid lg:grid-cols-7 gap-8 items-center">
          {/* CEO Image Column */}
          <div className="lg:col-span-3">
            <div className="max-w-md mx-auto">
              <img
                className="w-full h-auto rounded-sm shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-100"
                src="ceo.jpeg"
                alt="CEO Susan Goldsmith"
              />
            </div>
          </div>

          {/* CEO Content Column */}
          <div className="lg:col-span-4 flex flex-col justify-start lg:items-start items-center">
            <div className="w-full space-y-5">
              {/* Title and Name */}
              <div className="space-y-1">
                <h2 className="text-[#2c439c] text-xl sm:text-4xl leading-tight text-center font-bold mb-4 font-serif">
                  Founder & CEO
                </h2>
                <p className="text-[#121212] text-xl font-bold leading-normal text-center font-serif italic">
                  Susan Goldsmith
                </p>
              </div>

              {/* Biography Paragraphs */}
              <div className="space-y-4">
                <p className="text-[#121212] text-base sm:text-lg font-normal leading-relaxed text-justify font-serif">
                  With over 30 years of experience in global sports marketing,
                  including 15 Olympic Games, I bring strategic vision and a
                  results-driven approach to navigating the complexities of the
                  Olympic and sports ecosystems. I&apos;ve collaborated with
                  Fortune 500 companies, National Olympic Committees, and
                  leading broadcasters to develop innovative sponsorship
                  programs that connect brands, people, and ideas around shared
                  values.
                </p>
                <p className="text-[#121212] text-base sm:text-lg font-normal leading-relaxed text-justify font-serif">
                  As a senior leader in Partnership Marketing with the United
                  States Olympic & Paralympic Committee, I spearheaded major
                  activation strategies for iconic brands such as Coca-Cola,
                  Visa, P&G, and Samsung, delivering integrated platforms that
                  combined objective-driven activations, experiential events,
                  and operational excellence. Known for bold thinking and
                  fostering a culture of transparency and trust, I am passionate
                  about helping individuals and teams achieve their full
                  potential while driving meaningful impact and measurable
                  results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ceo
