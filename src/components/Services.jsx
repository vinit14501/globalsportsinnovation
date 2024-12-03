export default function Services() {
  const services = [
    {
      title: "Strategic Sponsorship Advisory",
      description:
        "Leverage 30+ years of expertise, including 15 Olympic Games, to guide sponsors in navigating the complexities of global sports partnerships. We align your sponsorship goals with strategic opportunities, ensuring clear direction, effective investments, and measurable results.",
    },
    {
      title: "Innovative Activation Strategies",
      description:
        "Transform sponsorships into bold, engaging experiences that connect brands and audiences on a deeper level. By crafting creative, forward-thinking activation plans, we help your brand break through the clutter and deliver memorable, impactful engagements.",
    },
    {
      title: "Seamless Optimization",
      description:
        "From idea to impact, we guide you to flawless integration and execution planning across every sponsorship touchpoint. Through collaboration, precision, and trusted relationships, we ensure your campaigns are set up for success as a leader in global sports marketing.",
    },
  ]

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="w-full max-w-screen-xl px-4 md:px-6 lg:px-8 mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-[#2c439c] text-xl font-bold sm:text-4xl mb-4 font-serif">
            Services
          </h2>
          <p className="text-[#121212] text-base sm:text-lg font-normal leading-relaxed font-serif">
            Transform your sponsorship strategy with innovative solutions
            designed to elevate your brand, captivate your audience, and deliver
            measurable results.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-sm shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-[#121212] text-center text-xl font-semibold mb-2 font-serif">
                  {service.title}
                </h3>
                <p className="text-[#121212] text-base font-normal font-serif">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
