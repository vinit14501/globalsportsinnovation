import about from "../assets/about.webp"
import tick from "../assets/tick.webp"

const listItems = [
  {
    header: "Olympic & Global Sports Expertise",
  },
  {
    header: "Global Brand Marketing & Sponsorship Management",
  },
  {
    header: "Innovative Thinking",
  },
  {
    header: "Collaborative Leadership",
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="w-full max-w-screen-xl px-4 md:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-start lg:items-start items-center">
            <div className="w-full space-y-6">
              <h2 className="text-[#2c439c] text-2xl sm:text-4xl leading-tight lg:text-start text-center font-serif font-bold">
                Why Global Sport Innovations?
              </h2>
              <p className="text-[#121212] text-base sm:text-lg font-normal leading-relaxed lg:text-start text-center font-serif">
                Empowering sports sponsors to create innovative and dynamic
                campaign strategies without getting lost in complex ecosystems.
                It&apos;s about creating meaningful connections, driving brand
                visibility, and growing your business.
              </p>
              <ul className="space-y-4 font-serif">
                {listItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3"
                  >
                    <img
                      src={tick}
                      alt="Blue Tick"
                      className="w-6 h-6 flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-[#121212] text-lg font-semibold">
                        {item.header}
                      </h3>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <img
              className="w-full max-w-[450px] h-auto aspect-square object-cover rounded-sm shadow-lg"
              src={about}
              alt="About Us"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
