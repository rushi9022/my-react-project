import React, { useRef, useEffect } from 'react';

const Gallery = ({ galIndex, setGalIndex }) => {
  const galleryImages = [
    { src: 'SR_hotel _image.png', title: 'Hotel Exterior', desc: 'Wakad — SR Hotel' },
    { src: 'Marvel_Hotel_image.png', title: 'Hotel Exterior', desc: 'Viman Nagar — Marvel Hotel' },
    { src: 'Esta Stays_image.png', title: 'Hotel Exterior', desc: 'Viman Nagar — Esta Stays' },
    { src: 'image 1.jpeg', title: 'Luxury Room', desc: 'Premium Living Experience' },
    { src: 'image 2.jpeg', title: 'Signature Dining', desc: 'Global Flavors & Cuisine' },
    { src: 'image 3.jpeg', title: 'Lounge Area', desc: 'Comfort & Peace' },
    { src: 'image 4.jpeg', title: 'City View Balcony', desc: 'Urban Escape' },
    { src: 'image 5.jpeg', title: 'Banquet Hall', desc: 'Grand Celebrations' },
    { src: 'image 6.jpeg', title: 'Grand Lobby', desc: 'Elegant Welcome' }
  ];
  const totalSlides = galleryImages.length;
  const sliderRef = useRef(null);
  const [slideWidth, setSlideWidth] = React.useState(500);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 768) {
        const containerWidth = document.querySelector('.gallery-container')?.clientWidth || window.innerWidth;
        setSlideWidth(containerWidth * 0.85); // Takes up 85% of mobile screen perfectly
      } else {
        setSlideWidth(500); // Default luxury wide-slide desktop scale
      }
    };
    
    updateWidth();
    // Re-calculate slider bounds if the user rotates their phone
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let startY = 0;

    const handleDragStart = (e) => e.preventDefault();

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      // Only prevent default if movement is horizontal!
      const xDiff = Math.abs(e.touches[0].clientX - startX);
      const yDiff = Math.abs(e.touches[0].clientY - startY);

      // Disable horizontal swipes specifically to preserve vertical scroll
      if (xDiff > yDiff) {
        e.preventDefault();
      }
    };

    // Prevent drag events
    slider.addEventListener("dragstart", handleDragStart);
    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      slider.removeEventListener("dragstart", handleDragStart);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section id="gallery" className="section-padding fade-up">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle reveal">Ambience</span>
          <h2 className="section-title reveal">Photo Gallery</h2>
          <div className="title-line reveal"></div>
        </div>
        <div className="gallery-wrapper reveal">
          <div className="gallery-container">
            <div
              className="gallery-slider"
              ref={sliderRef}
              style={{ transform: `translateX(calc(50% - (${slideWidth}px / 2) - (${galIndex} * ${slideWidth}px)))` }}
            >
              {galleryImages.map((img, i) => (
                <div 
                  className={`gallery-slide ${galIndex === i ? 'active' : ''}`} 
                  key={i} 
                  onClick={() => setGalIndex(i)}
                  style={{ flex: `0 0 ${slideWidth}px`, maxWidth: '100%' }}
                >
                  <div className="gallery-card">
                    <img src={`/images/${img.src}`} alt={img.title} />
                    <div className="gallery-overlay">
                      <div className="gallery-info">
                        <h3>{img.title}</h3>
                        <p>{img.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="gallery-arrow left" onClick={() => setGalIndex((galIndex - 1 + totalSlides) % totalSlides)}>❮</button>
            <button className="gallery-arrow right" onClick={() => setGalIndex((galIndex + 1) % totalSlides)}>❯</button>
          </div>
          <div className="gallery-dots">
            {galleryImages.map((_, i) => (
              <div key={i} className={`dot ${i === galIndex ? 'active' : ''}`} onClick={() => setGalIndex(i)}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
