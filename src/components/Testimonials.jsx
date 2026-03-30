import React, { useRef, useEffect } from 'react';

const Testimonials = ({ tIndex }) => {
  const reviews = [
    {
      name: "RITESH DESHMUKH",
      text: "Wonderful service and extremely clean rooms. The staff made us feel right at home. Highly recommended for business trips."
    },
    {
      name: "SNEHAL PATIL",
      text: "Beautiful hotel with a great location. The amenities are top-notch and the food was delicious."
    },
    {
      name: "AMIT KHANNA",
      text: "The best hospitality experience in Pune. Professional staff and elegant room designs."
    }
  ];
  
  const sliderRef = useRef(null);

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
      const xDiff = Math.abs(e.touches[0].clientX - startX);
      const yDiff = Math.abs(e.touches[0].clientY - startY);
      
      if (xDiff > yDiff) {
        e.preventDefault();
      }
    };

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
    <section className="section-padding fade-up" style={{ background: 'var(--bg-light-dark)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle reveal">Reviews</span>
          <h2 className="section-title reveal">Guest Experiences</h2>
          <div className="title-line reveal"></div>
        </div>
        <div className="testimonial-slider-wrapper">
          <div 
            className="testimonial-slider" 
            ref={sliderRef}
            style={{ transform: `translateX(-${tIndex * 100}%)`, display: 'flex', transition: 'transform 0.5s ease-in-out' }}
          >
            {reviews.map((review, index) => (
              <div className="testimonial testimonial-card reveal" style={{ minWidth: '100%' }} key={index}>
                <div className="stars">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="author">
                  <h5>{review.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
