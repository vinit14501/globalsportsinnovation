import pic4 from "../assets/pic-4.webp"
import pic5 from "../assets/pic-5.webp"
import pic2 from "../assets/pic-2.webp"
import pic3 from "../assets/pic-3.webp"
import pic1 from "../assets/pic-1.webp"
import pic7 from "../assets/pic-7.webp"
import pic8 from "../assets/pic-8.webp"
import pic9 from "../assets/pic-9.webp"
import pic11 from "../assets/pic-11.webp"
import pic6 from "../assets/pic-6.webp"
import pic10 from "../assets/pic-10.webp"
import pic12 from "../assets/pic-12.webp"
import pic13 from "../assets/pic-13.webp"
import pic15 from "../assets/pic-15.webp"
import pic14 from "../assets/pic-14.webp"
import pic16 from "../assets/pic-16.webp"

const ImageItem = ({ src, alt = "" }) => (
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src={src}
      alt={alt}
      loading="lazy"
    />
  </div>
)

const ImageColumn = ({ images }) => (
  <div className="grid gap-2">
    {images.map((src, index) => (
      <ImageItem
        key={index}
        src={src}
      />
    ))}
  </div>
)

const Gallery = () => {
  const imageUrls = [
    pic4,
    pic5,
    pic2,
    pic3,
    pic1,
    pic7,
    pic8,
    pic9,
    pic11,
    pic6,
    pic10,
    pic12,
    pic13,
    pic15,
    pic14,
    pic16,
  ]

  const columns = 4
  const imagesPerColumn = Math.ceil(imageUrls.length / columns)

  return (
    <div
      id="gallery"
      className="pt-24"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[...Array(columns)].map((_, columnIndex) => (
          <ImageColumn
            key={columnIndex}
            images={imageUrls.slice(
              columnIndex * imagesPerColumn,
              (columnIndex + 1) * imagesPerColumn
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery
