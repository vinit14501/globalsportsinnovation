import React from "react"
import "./brand.css"

// Import all brand logo images
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

const Brand = () => {
  const brandsData = [
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
  ]

  return (
    <section
      id="clients"
      className="pt-28 pb-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto">
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

        <div className="brands-grid">
          {brandsData.map((brand) => (
            <div
              key={brand.id}
              className="brand-item"
            >
              <img
                src={brand.logo}
                alt="Brand Logo"
                className="brand-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brand
