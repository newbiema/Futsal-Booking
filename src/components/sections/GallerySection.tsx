// src/components/sections/Gallery.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  const galleryImages = [
    {
      id: 1,
      src: '/images/gallery/futsal-1.jpg',
      alt: 'Lapangan Futsal Indoor Berkualitas',
      category: 'Lapangan'
    },
    {
      id: 2,
      src: '/images/gallery/futsal-2.jpg',
      alt: 'Turnamen Futsal Spesial',
      category: 'Event'
    },
    {
      id: 3,
      src: '/images/gallery/futsal-3.jpg',
      alt: 'Fasilitas Modern',
      category: 'Fasilitas'
    },
    {
      id: 4,
      src: '/images/gallery/futsal-4.jpg',
      alt: 'Lapangan Outdoor',
      category: 'Lapangan'
    },
    {
      id: 5,
      src: '/images/gallery/futsal-5.jpg',
      alt: 'Area Lounge Nyaman',
      category: 'Fasilitas'
    },
    {
      id: 6,
      src: '/images/gallery/futsal-6.jpg',
      alt: 'Pertandingan Seru',
      category: 'Event'
    },
  ]

  const categories = ['Semua', 'Lapangan', 'Fasilitas', 'Event']
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filteredImages = activeCategory === 'Semua' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  const openLightbox = (id: number) => {
    setSelectedImage(id)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage)
    let newIndex
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    }
    
    setSelectedImage(galleryImages[newIndex].id)
  }

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galeri <span className="text-indigo-600">FutsalPro</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat langsung fasilitas dan atmosfer seru di lapangan futsal kami
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <p className="text-sm font-medium bg-indigo-600 px-2 py-1 rounded-md inline-block mb-1">
                    {image.category}
                  </p>
                  <p className="font-medium">{image.alt}</p>
                </div>
              </div>
              <button
                onClick={() => openLightbox(image.id)}
                className="absolute top-4 right-4 bg-white/90 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                aria-label="Perbesar gambar"
              >
                <FontAwesomeIcon icon={faExpand} className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-2xl hover:text-indigo-300 transition-colors"
              aria-label="Tutup lightbox"
            >
              &times;
            </button>
            
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-6 md:left-12 text-white text-2xl p-2 hover:text-indigo-300 transition-colors"
              aria-label="Gambar sebelumnya"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
            </button>
            
            <div className="relative max-w-4xl w-full">
              <img
                src={galleryImages.find(img => img.id === selectedImage)?.src}
                alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                className="max-h-[80vh] w-full object-contain"
              />
              <div className="text-white text-center mt-4">
                <p className="font-medium">
                  {galleryImages.find(img => img.id === selectedImage)?.alt}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-6 md:right-12 text-white text-2xl p-2 hover:text-indigo-300 transition-colors"
              aria-label="Gambar selanjutnya"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Siap Bermain Futsal Hari Ini?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Lihat ketersediaan lapangan dan booking langsung sekarang juga!
          </p>
          <a
            href="/booking"
            className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-300"
          >
            Booking Lapangan Sekarang
          </a>
        </div>
      </div>
    </section>
  )
}

export default Gallery