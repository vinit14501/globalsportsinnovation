import { useState, useCallback, useEffect, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SlidingContactForm from "./SlidingContactForm"

const slides = [
  {
    image: "carousel-3.jpg",
    title:
      "Are your sponsorships truly delivering the impact your brand deserves? ",
    // buttonText: "Get a quote",
  },
  {
    image: "carousel-5.jpg",
    title: "30+ years, 15 Olympic Games—turning sponsorships into growth",
  },
  {
    image: "carousel-2.jpg",
    title: "Sponsorships should deliver results, not just visibility",
  },
  {
    image: "carousel-1.jpg",
    title:
      "We help executives like you simplify complexities and maximize partnership potential",
  },
]

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (isFormOpen) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [isFormOpen])

  const goToSlide = useCallback((index) => {
    setActiveSlide(index)
  }, [])

  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev)
  }, [])

  const renderSlide = useCallback(
    (slide, index) => (
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
        <div className="absolute inset-0 flex flex-col justify-center bg-[#121212] bg-opacity-50 px-4 sm:px-6 lg:px-8">
          <div className="w-full md:w-2/3 lg:w-1/2 max-w-screen-xl mx-auto md:ml-8 lg:ml-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-medium mb-6 text-white font-serif">
              {slide.title}
            </h2>
            {slide.buttonText && (
              <button
                onClick={toggleForm}
                className="bg-[#2c439c] hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base sm:text-lg cursor-pointer font-serif"
              >
                {slide.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    ),
    [activeSlide, toggleForm]
  )

  const renderNavigationButton = useCallback(
    ({ direction, onClick }) => (
      <button
        onClick={onClick}
        className={`absolute top-1/2 ${
          direction === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4"
        } transform -translate-y-1/2 bg-[#121212] bg-opacity-25 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full transition duration-300 cursor-pointer`}
      >
        {direction === "left" ? (
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        ) : (
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        )}
      </button>
    ),
    []
  )

  const renderIndicator = useCallback(
    (index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
          index === activeSlide
            ? "bg-[#2c439c] scale-125"
            : "bg-white hover:bg-blue-200"
        }`}
      />
    ),
    [activeSlide, goToSlide]
  )

  const memoizedSlides = useMemo(() => slides.map(renderSlide), [renderSlide])
  const memoizedIndicators = useMemo(
    () => slides.map((_, index) => renderIndicator(index)),
    [renderIndicator]
  )

  return (
    <div
      id="home"
      className="relative max-h-full w-full pt-20 bg-white"
    >
      <div className="relative h-[calc(100vh-100px)] overflow-hidden">
        {memoizedSlides}
      </div>

      {renderNavigationButton({
        direction: "left",
        onClick: () =>
          goToSlide((activeSlide - 1 + slides.length) % slides.length),
      })}
      {renderNavigationButton({
        direction: "right",
        onClick: () => goToSlide((activeSlide + 1) % slides.length),
      })}

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {memoizedIndicators}
      </div>

      <SlidingContactForm
        isOpen={isFormOpen}
        onClose={toggleForm}
      />
    </div>
  )
}
