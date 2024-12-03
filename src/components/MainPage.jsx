import Carousel from "./Carousel"
import About from "./About"
import Services from "./Services"
import Ceo from "./Ceo"
import Testimonials from "./Testimonials"
import Contact from "./Contact"
import Brand from "./Brand"

export default function MainPage() {
  return (
    <>
      <Carousel />
      <About />
      <Services />
      <Brand />
      <Ceo />
      <Testimonials />
      <Contact />
    </>
  )
}
