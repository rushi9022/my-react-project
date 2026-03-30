import React from 'react';

const Amenities = () => {
  const amenitiesList = [
    { icon: 'clock', title: 'Always Open Dining' },
    { icon: 'wifi', title: 'Fast & Free Wi-Fi' },
    { icon: 'bowl-food', title: 'Global Flavors' },
    { icon: 'car-side', title: 'Easy Arrival' },
    { icon: 'wand-magic-sparkles', title: 'Fresh & Clean' },
    { icon: 'couch', title: 'The Chill Spot' }
  ];

  return (
    <section id="amenities" className="section-padding fade-up">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle reveal">Services</span>
          <h2 className="section-title reveal">First Class Amenities</h2>
          <div className="title-line reveal"></div>
        </div>
        <div className="amenities-grid">
          {amenitiesList.map((item, index) => (
            <div className="amenity-item reveal" key={index}>
              <i className={`fas fa-${item.icon}`}></i>
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
