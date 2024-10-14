export default function Brand() {
  const brandsData = [
    {
      imageSrc: "/src/assets/brand/coke.jpg",
      altText: "Coke",
      name: "Coca-Cola",
      link: "#",
    },
    {
      imageSrc: "/src/assets/brand/fifa.jpg",
      altText: "FIFA",
      name: "FIFA",
      link: "#",
    },
    {
      imageSrc: "/src/assets/brand/olympic.png",
      altText: "Olympic",
      name: "Olympic",
      link: "#",
    },
    {
      imageSrc: "/src/assets/brand/pepsi.png",
      altText: "Pepsi",
      name: "Pepsi",
      link: "#",
    },
  ]

  return (
    <section
      id="clients"
      className="py-10 bg-gradient-to-b from-white to-gray-100 scroll-mt-20"
    >
      <div className="w-full max-w-screen-xl px-4 md:px-6 lg:px-8 mx-auto">
        {" "}
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <h2 className="text-blue-600 text-3xl sm:text-4xl leading-tight mb-4 font-serif italic">
            Clients Served
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-normal leading-relaxed font-serif italic">
            Trusted by leading brands worldwide
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 font-serif">
          {brandsData.map((brand, i) => (
            <SingleBrand
              key={i}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const SingleBrand = ({ brand }) => {
  const { link, imageSrc, altText, name } = brand

  return (
    <div className="transform transition-all duration-300 ease-in-out hover:-translate-y-1">
      <a
        href={link}
        className="block bg-white rounded-sm shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-100 overflow-hidden"
      >
        <div className="w-full h-36 p-4 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-2 text-center">
          <p className="text-gray-800 font-medium">{name}</p>
        </div>
      </a>
    </div>
  )
}
