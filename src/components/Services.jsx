import React from "react"

export default function Services() {
  const services = [
    {
      title: "Workshop",
      description:
        "GSI provides comprehensive workshops to help sports sponsors develop innovative and dynamic campaign strategies. Our workshops are designed to empower you with the knowledge and tools needed to navigate the complex world of sports sponsorship effectively.",
    },
    {
      title: "Olympics 101 Playbook",
      description:
        "Our Olympics 101 Playbook is a comprehensive guide that breaks down the intricacies of Olympic sponsorship. It provides valuable insights into creating impactful campaigns that resonate with the global audience of the Olympic Games.",
    },
    {
      title: "Brand 101 Summary",
      description:
        "The Brand 101 Summary is a tailored report that analyzes your brand's potential in the sports sponsorship landscape. It offers strategic recommendations to enhance your brand visibility and equity through targeted sports marketing initiatives.",
    },
  ]

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="w-full max-w-screen-xl px-4 md:px-6 lg:px-8 mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-blue-600 text-3xl sm:text-4xl leading-tight mb-4 font-serif italic">
            Services
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-normal leading-relaxed font-serif italic">
            Crafting impactful strategies to elevate your presence on the global
            stage.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-sm shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-gray-800 text-center text-xl font-semibold mb-2 font-serif">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-base font-normal font-serif">
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
