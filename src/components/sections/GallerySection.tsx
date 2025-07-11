// src/components/sections/Gallery.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const galleryImages = [
    {
      id: 1,
      src: '/images/gallery/1.jpeg',
      alt: 'Lapangan Futsal Indoor Berkualitas',
      category: 'Lapangan'
    },
    {
      id: 2,
      src: '/images/gallery/2.jpeg',
      alt: 'Turnamen Futsal Spesial',
      category: 'Event'
    },
    {
      id: 3,
      src: '/images/gallery/3.jpeg',
      alt: 'Fasilitas Modern',
      category: 'Fasilitas'
    },
    {
      id: 4,
      src: '/images/gallery/4.jpeg',
      alt: 'Area Lounge Nyaman',
      category: 'Fasilitas'
    },
    {
      id: 5,
      src: '/images/gallery/5.jpeg',
      alt: 'Pertandingan Seru',
      category: 'Event'
    },
    {
      id: 6,
      src: '/images/gallery/6.jpeg',
      alt: 'Lapangan Standar Internasional',
      category: 'Lapangan'
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

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') {
          closeLightbox()
        } else if (e.key === 'ArrowLeft') {
          navigateImage('prev')
        } else if (e.key === 'ArrowRight') {
          navigateImage('next')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galeri <span className="text-indigo-600">FutsalPro</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat langsung fasilitas dan atmosfer seru di lapangan futsal kami
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <motion.div 
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              onMouseEnter={() => !isMobile && setIsHovering(image.id)}
              onMouseLeave={() => !isMobile && setIsHovering(null)}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isHovering === image.id || isMobile ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white">
                  <motion.p 
                    className="text-sm font-medium bg-indigo-600 px-2 py-1 rounded-md inline-block mb-1"
                    initial={{ y: 20 }}
                    animate={{ y: isHovering === image.id || isMobile ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {image.category}
                  </motion.p>
                  <motion.p 
                    className="font-medium"
                    initial={{ y: 20 }}
                    animate={{ y: isHovering === image.id || isMobile ? 0 : 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {image.alt}
                  </motion.p>
                </div>
              </motion.div>
              <motion.button
                onClick={() => openLightbox(image.id)}
                className="absolute top-4 right-4 bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white"
                aria-label="Perbesar gambar"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovering === image.id || isMobile ? 1 : 0,
                  scale: isHovering === image.id || isMobile ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faExpand} className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white text-2xl hover:text-indigo-300 transition-colors z-10"
                aria-label="Tutup lightbox"
              >
                <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-6 md:left-12 text-white text-2xl p-2 hover:text-indigo-300 transition-colors z-10"
                aria-label="Gambar sebelumnya"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
              </button>
              
              <motion.div 
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full"
              >
                <img
                  src={galleryImages.find(img => img.id === selectedImage)?.src}
                  alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                  className="max-h-[80vh] w-full object-contain"
                />
                <motion.div 
                  className="text-white text-center mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-medium">
                    {galleryImages.find(img => img.id === selectedImage)?.alt}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {selectedImage} / {galleryImages.length}
                  </p>
                </motion.div>
              </motion.div>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-6 md:right-12 text-white text-2xl p-2 hover:text-indigo-300 transition-colors z-10"
                aria-label="Gambar selanjutnya"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Siap Bermain Futsal Hari Ini?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Lihat ketersediaan lapangan dan booking langsung sekarang juga!
          </p>
          <motion.a
            href="/booking"
            className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Booking Lapangan Sekarang
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery