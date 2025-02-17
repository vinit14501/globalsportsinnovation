import { useState, useCallback, useEffect, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import carousel_1 from "../assets/carousel-1.webp"
import carousel_2 from "../assets/carousel-2.webp"
import carousel_3 from "../assets/carousel-3.webp"
import carousel_4 from "../assets/carousel-4.webp"

const slides = [
  {
    image: carousel_1,
    title:
      "Are your sponsorships truly delivering the impact your brand deserves?",
  },
  {
    image: carousel_2,
    title: "30+ years, 15 Olympic Games—turning sponsorships into growth",
  },
  {
    image: carousel_3,
    title: "Sponsorships should deliver results, not just visibility",
  },
  {
    image: carousel_4,
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
        role="tabpanel"
        aria-label={`Slide ${index + 1}: ${slide.title}`}
        aria-hidden={index !== activeSlide}
      >
        <img
          src={slide.image}
          className="absolute block w-full h-full object-cover"
          alt={slide.title}
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-[#121212] bg-opacity-50 px-4 sm:px-6 lg:px-8">
          <div className="w-full md:w-2/3 lg:w-1/2 max-w-screen-xl mx-auto md:ml-8 lg:ml-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-medium mb-6 text-white font-serif">
              {slide.title}
            </h2>
            {slide.buttonText && (
              <button
                onClick={toggleForm}
                className="bg-[#2c439c] hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base sm:text-lg cursor-pointer font-serif min-h-[48px]"
                aria-label={slide.buttonText}
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
          direction === "left" ? "left-4 sm:left-6" : "right-4 sm:right-6"
        } transform -translate-y-1/2 bg-[#121212] bg-opacity-25 hover:bg-blue-700 text-white p-4 rounded-full transition duration-300 cursor-pointer min-w-[48px] min-h-[48px] touch-manipulation`}
        aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
      >
        {direction === "left" ? (
          <ChevronLeft className="w-8 h-8" />
        ) : (
          <ChevronRight className="w-8 h-8" />
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
        className={`w-6 h-6 rounded-full transition-all duration-300 focus:outline-none cursor-pointer m-2 touch-manipulation ${
          index === activeSlide
            ? "bg-[#2c439c] scale-125"
            : "bg-white hover:bg-blue-200"
        }`}
        aria-label={`Go to slide ${index + 1}`}
        aria-selected={index === activeSlide}
        role="tab"
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
      role="region"
      aria-label="Image carousel"
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

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4"
        role="tablist"
        aria-label="Carousel navigation"
      >
        {memoizedIndicators}
      </div>
    </div>
  )
}
