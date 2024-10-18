import React from "react"

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
  <div className="grid gap-4">
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
    "pic-4.jpg",
    "pic-5.jpeg",
    "pic-2.jpeg",
    "pic-3.jpeg",
    "pic-7.jpg",
    "pic-8.jpeg",
    "pic-1.jpeg",
    "pic-9.jpeg",
    "pic-11.jpeg",
    "pic-6.jpg",
    "pic-10.jpeg",
    "pic-12.jpeg",
    "pic-13.JPG",
    "pic-15.jpg",
    "pic-14.jpeg",
    "pic-16.jpeg",
  ]

  const columns = 4
  const imagesPerColumn = Math.ceil(imageUrls.length / columns)

  return (
    <div className="pt-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
