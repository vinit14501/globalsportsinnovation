import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const testimonials = [
  {
    text: "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.",
    name: "Jane D",
    position: "CEO",
    avatar: "https://pagedone.io/asset/uploads/1696229969.png",
  },
  {
    text: "Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before.",
    name: "Harsh P.",
    position: "Product Designer",
    avatar: "https://pagedone.io/asset/uploads/1696229994.png",
  },
  {
    text: "The customer service team at pagedone went above and beyond to help me resolve a billing issue.",
    name: "Alex K.",
    position: "Design Lead",
    avatar: "https://pagedone.io/asset/uploads/1696230027.png",
  },
  {
    text: "The customer service team at pagedone went above and beyond to help me resolve a billing issue.",
    name: "Alex K.",
    position: "Design Lead",
    avatar: "https://pagedone.io/asset/uploads/1696230027.png",
  },
  {
    text: "The customer service team at pagedone went above and beyond to help me resolve a billing issue.",
    name: "Alex K.",
    position: "Design Lead",
    avatar: "https://pagedone.io/asset/uploads/1696230027.png",
  },
]

const TestimonialCard = ({ text, name, position, avatar }) => (
  <div className="group bg-white border border-solid border-[#121212] rounded-sm p-6 transition-all duration-500 w-full mx-auto hover:border-[#2c439c] hover:shadow-md">
    <p className="text-base text-[#121212] leading-relaxed transition-all duration-500 mb-8 group-hover:text-[#121212] font-serif">
      {text}
    </p>
    <div className="flex items-center gap-4 border-t border-solid border-[#121212] pt-5">
      <img
        className="rounded-full h-12 w-12 object-cover"
        src={avatar}
        alt={`${name}'s avatar`}
      />
      <div>
        <h5 className="text-[#121212] font-bold transition-all duration-500 mb-1 font-serif">
          {name}
        </h5>
        <span className="text-sm leading-4 text-[#121212] font-serif">
          {position}
        </span>
      </div>
    </div>
  </div>
)

const Testimonials = () => {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiper = swiperRef.current?.swiper
    if (swiper) {
      swiper.update()
    }
  }, [])

  return (
    <section
      id="testimonial"
      className="py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-xl sm:text-4xl text-[#2c439c] mb-4 font-serif font-bold">
            TESTIMONIALS
          </h2>
          <p className="text-[#121212] text-4xl sm:text-lg font-medium font-serif">
            What our happy clients say!
          </p>
        </div>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={32}
          loop={true}
          centeredSlides={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #2c439c;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}

export default Testimonials
