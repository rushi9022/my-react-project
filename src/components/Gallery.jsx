import React from 'react';

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
            <div className="gallery-slider" style={{ transform: `translateX(calc(50% - 250px - ${galIndex * 500}px))` }}>
              {galleryImages.map((img, i) => (
                <div className={`gallery-slide ${galIndex === i ? 'active' : ''}`} key={i} onClick={() => setGalIndex(i)}>
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
