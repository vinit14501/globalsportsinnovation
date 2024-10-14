export default function Hero() {
  return (
    <>
      <div className="relative max-h-full w-full max-w mx-auto px-1 pt-15 md:pt-20 bg-white">
        <div className="relative h-120 sm:h-96 md:h-112 lg:h-128 overflow-hidden rounded-sm shadow-xl">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/src/assets/carousel/carousel-1.jpg"
              className="absolute block w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50 p-14">
              <div className="w-full md:w-1/2">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Empowering Sports Sponsors
                </h2>

                <button
                  //   onClick={openForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm cursor-pointer"
                >
                  Get a quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
