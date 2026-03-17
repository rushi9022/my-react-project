import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/images/maya_hero_alt_1.png", alt: "Amaya Entrance" },
    { src: "/images/SR_hotel _image.png", alt: "SR Hotel" },
    { src: "/images/Marvel_Hotel_image.png", alt: "Marvel Hotel" },
    { src: "/images/Esta Stays_image.png", alt: "Esta Stays" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero" id="home">
      <div className="hero-slider" id="heroSlider">
        {slides.map((slide, index) => (
          <div key={index} className={`hero-slide ${index === currentSlide ? 'active' : ''}`}>
            <img src={slide.src} alt={slide.alt} className="clickable-image" />
          </div>
        ))}
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="reveal">Redefining Pune's Hospitality</p>
        <h1 className="reveal">AMAYA HOTELS</h1>
        <div className="hero-btns reveal">
          <a href="#hotels" className="btn-gold">Explore Hotels</a>
          <a href="#about" className="btn-luxury btn-outline">Our Legacy</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
