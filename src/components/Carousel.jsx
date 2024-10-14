import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SlidingContactForm from "./SlidingContactForm"

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const slides = [
    {
      image: "/src/assets/carousel/carousel-1.jpg",
      title:
        "Are you a senior marketing executive leading Global Sports & Events partnerships?",
      buttonText: "Get a quote",
    },
    {
      image: "/src/assets/carousel/carousel-2.jpg",
      title: "Empower your sports marketing and sponsorships with us",
    },
    {
      image: "/src/assets/carousel/carousel-3.jpg",
      title: "Carve insight, innovation and impact to your strategy",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFormOpen) {
        setActiveSlide((prev) => (prev + 1) % slides.length)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length, isFormOpen])

  const goToSlide = useCallback((index) => {
    setActiveSlide(index)
  }, [])

  const openForm = useCallback(() => {
    setIsFormOpen(true)
  }, [])

  const closeForm = useCallback(() => {
    setIsFormOpen(false)
  }, [])

  return (
    <div
      id="home"
      className="relative max-h-full w-full pt-20 bg-white"
    >
      <div className="relative h-[calc(100vh-100px)] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === activeSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              className="absolute block w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50 px-4 sm:px-6 lg:px-8">
              <div className="w-full md:w-2/3 lg:w-1/2 max-w-screen-xl mx-auto md:ml-8 lg:ml-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-white font-serif italic">
                  {slide.title}
                </h2>
                {slide.buttonText && (
                  <button
                    onClick={openForm}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base sm:text-lg cursor-pointer font-serif"
                  >
                    {slide.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          goToSlide((activeSlide - 1 + slides.length) % slides.length)
        }
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-25 hover:bg-blue-600 text-white p-2 sm:p-3 rounded-full transition duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <button
        onClick={() => goToSlide((activeSlide + 1) % slides.length)}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-25 hover:bg-blue-600 text-white p-2 sm:p-3 rounded-full transition duration-300 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              index === activeSlide
                ? "bg-blue-600 scale-125"
                : "bg-white hover:bg-blue-200"
            }`}
          />
        ))}
      </div>

      <SlidingContactForm
        isOpen={isFormOpen}
        onClose={closeForm}
      />
    </div>
  )
}
