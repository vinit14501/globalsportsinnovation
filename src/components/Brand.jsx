import React, { useMemo, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import usaLogo from "../assets/usa.webp"
import pgLogo from "../assets/p&g.webp"
import gmrLogo from "../assets/gmr.webp"
import kelloggsLogo from "../assets/kelloggs.webp"
import visaLogo from "../assets/visa.webp"
import ilukaLogo from "../assets/iluka.webp"
import cokeLogo from "../assets/coke.webp"
import nbcLogo from "../assets/nbc.webp"
import intelLogo from "../assets/intel.webp"
import onlLogo from "../assets/onl.webp"
import saltLakeLogo from "../assets/salt-lake.webp"
import samsungLogo from "../assets/samsung.webp"
import geLogo from "../assets/ge.webp"
import ringsLogo from "../assets/rings.webp"
import nikeLogo from "../assets/nike.webp"

const useResponsiveSlides = (itemCount, baseItemsPerSlide = 4) => {
  const getResponsiveItemCount = useCallback(() => {
    if (typeof window === "undefined") return baseItemsPerSlide

    const width = window.innerWidth
    return width >= 1280 ? 4 : width >= 1024 ? 3 : width >= 768 ? 2 : 1
  }, [baseItemsPerSlide])

  const [itemsPerSlide, setItemsPerSlide] = useState(getResponsiveItemCount)

  React.useEffect(() => {
    const handleResize = () => setItemsPerSlide(getResponsiveItemCount())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [getResponsiveItemCount])

  const totalSlides = Math.ceil(itemCount / itemsPerSlide)

  return { itemsPerSlide, totalSlides }
}

const Brand = () => {
  const brandsData = useMemo(
    () => [
      { id: 1, logo: usaLogo },
      { id: 2, logo: pgLogo },
      { id: 3, logo: gmrLogo },
      { id: 4, logo: kelloggsLogo },
      { id: 5, logo: visaLogo },
      { id: 6, logo: ilukaLogo },
      { id: 7, logo: cokeLogo },
      { id: 8, logo: nbcLogo },
      { id: 9, logo: intelLogo },
      { id: 10, logo: onlLogo },
      { id: 11, logo: saltLakeLogo },
      { id: 12, logo: samsungLogo },
      { id: 13, logo: geLogo },
      { id: 14, logo: ringsLogo },
      { id: 15, logo: cokeLogo },
      { id: 16, logo: nikeLogo },
    ],
    []
  )

  const [currentSlide, setCurrentSlide] = useState(0)
  const { itemsPerSlide, totalSlides } = useResponsiveSlides(brandsData.length)

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const renderLogoVariant = useCallback(
    (brand) => (
      <motion.div
        key={brand.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{
          duration: 0.3,
          type: "tween",
        }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center"
      >
        <div className="p-6 flex items-center justify-center w-full h-48">
          <img
            src={brand.logo}
            alt="Brand Logo"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </motion.div>
    ),
    []
  )

  const renderItems = useMemo(() => {
    const startIndex = currentSlide * itemsPerSlide
    const endIndex = startIndex + itemsPerSlide
    const displayedBrands = brandsData.slice(startIndex, endIndex)

    return displayedBrands.map(renderLogoVariant)
  }, [currentSlide, itemsPerSlide, brandsData, renderLogoVariant])

  return (
    <section
      id="clients"
      className="pt-28 pb-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-4xl font-bold text-[#2c439c] mb-4 font-serif">
            Clients
          </h2>
          <p className="text-[#121212] max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed font-serif">
            We collaborate with industry-leading brands to deliver innovative
            solutions and drive transformative partnerships across global
            markets.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center z-10 -translate-x-1/2">
            <button
              onClick={handlePrevSlide}
              className="bg-white/70 hover:bg-blue-100 
                rounded-full p-2 shadow-md transition-all"
            >
              <ChevronLeft className="text-[#2c439c]" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center z-10 translate-x-1/2">
            <button
              onClick={handleNextSlide}
              className="bg-white/70 hover:bg-blue-100 
                rounded-full p-2 shadow-md transition-all"
            >
              <ChevronRight className="text-[#2c439c]" />
            </button>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentSlide}
                layout
                className={`grid grid-cols-1 sm:grid-cols-2 
                  md:grid-cols-3 lg:grid-cols-4 gap-6`}
              >
                {renderItems}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all
                  ${currentSlide === index ? "bg-[#2c439c] w-6" : "bg-gray-300"}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brand
