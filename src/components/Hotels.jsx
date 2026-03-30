import React from 'react';

const Hotels = ({ setModalData }) => {
  return (
    <section id="hotels" className="section-padding fade-up" style={{ background: 'var(--bg-light-dark)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle reveal">The Collection</span>
          <h2 className="section-title reveal">Our Signature Properties</h2>
          <div className="title-line reveal"></div>
        </div>
        <div className="properties-list">
          <div className="property property-card slide-left">
            <div className="property-img">
              <img src="/images/SR_hotel _image.png" alt="SR Hotel" className="clickable-image" />
            </div>
            <div className="property-info property-text">
              <h3>SR Hotel</h3>
              <span className="prop-location">Wakad, Pune</span>
              <p>Experience the pinnacle of business luxury. Located in the heart of Wakad, SR Hotel offers sophisticated suites and world-class amenities for the discerning traveler.</p>
              <div className="property-buttons">
                <a href="https://maps.google.com/?q=SR+Hotel+Wakad+Pune" target="_blank" rel="noreferrer" className="btn-luxury">Location</a>
                <button className="btn-luxury btn-outline view-details-btn" onClick={(e) => { e.stopPropagation(); setModalData('sr-hotel'); document.body.style.overflow = "hidden"; }}>Check availability</button>
              </div>
            </div>
          </div>

          <div className="property property-card reverse slide-right">
            <div className="property-info property-text">
              <h3>Marvel Hotel</h3>
              <span className="prop-location">Viman Nagar, Pune</span>
              <p>Minutes away from Pune Airport and Phoenix Market City. Marvel Hotel combines modern elegance with unparalleled convenience for both business and leisure.</p>
              <div className="property-buttons">
                <a href="https://maps.google.com/?q=Marvel+Hotel+Viman+Nagar+Pune" target="_blank" rel="noreferrer" className="btn-luxury">Location</a>
                <button className="btn-luxury btn-outline view-details-btn" onClick={(e) => { e.stopPropagation(); setModalData('marvel-hotel'); document.body.style.overflow = "hidden"; }}>Check availability</button>
              </div>
            </div>
            <div className="property-img">
              <img src="/images/Marvel_Hotel_image.png" alt="Marvel Hotel" className="clickable-image" />
            </div>
          </div>

          <div className="property property-card slide-left">
            <div className="property-img">
              <img src="/images/Esta Stays_image.png" alt="Esta Stays" className="clickable-image" />
            </div>
            <div className="property-info property-text">
              <h3>Esta Stays</h3>
              <span className="prop-location">Viman Nagar, Pune</span>
              <p>A serene escape nestled in the lush greenery of Viman Nagar. Esta Stays is your luxury retreat featuring premium spa facilities and signature hospitality.</p>
              <div className="property-buttons">
                <a href="https://maps.google.com/?q=Esta+Stays+Viman+Nagar+Pune" target="_blank" rel="noreferrer" className="btn-luxury">Location</a>
                <button className="btn-luxury btn-outline view-details-btn" onClick={(e) => { e.stopPropagation(); setModalData('esta-stays'); document.body.style.overflow = "hidden"; }}>Check availability</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotels;
