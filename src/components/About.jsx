import React, { useState } from 'react';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="section-padding fade-up">
      <div className="container">
        <div className="about-grid">
          <div className="about-img reveal">
            <img 
              src="/images/SR_hotel _image.png" 
              alt="Amaya Hospitality" 
              style={{ height: '500px', objectFit: 'cover' }}
              className="clickable-image"
            />
          </div>
          <div className="about-text reveal">
            <span className="section-subtitle">Our Legacy</span>
            <h2>Redefining Luxury & Comfort in Pune</h2>
            <div className="about-desc">
              At Amaya Hospitality, we believe that every stay should be an unforgettable experience. Nestled in the
              vibrant city of Pune, our signature properties are designed to offer the perfect blend of modern elegance,
              cultural heritage, and world-class service. Our journey began with a single vision: to create sanctuaries
              where luxury meets genuine warmth. Today, we are proud to offer diverse destinations that cater to every
              need, from the fast-paced business executive at SR Hotel and Marvel Hotel to the tranquility seeker at Esta
              Stays.

              <div className={`read-more-content ${isExpanded ? 'expanded' : ''}`} id="readMoreContent">
                <br />
                Beyond world-class infrastructure, we pride ourselves on a culture of personalized care, ensuring that
                every guest's unique story is integrated into their stay. As Pune continues to grow as a global destination,
                Amaya Hospitality stands as a local beacon of sophisticated spirit.
                <br /><br />
                Each of our distinguished properties features meticulously appointed suites, offering premium comforts,
                state-of-the-art smart room technology, and breathtaking urban panoramas. Indulge your senses at our
                signature culinary venues serving global gastronomy, rejuvenate in our tranquil wellness spas, and host
                remarkable gatherings in our elegant banquet spaces. Whether you are here for a brief executive visit or a
                leisurely escape, we promise an ambiance of quiet luxury that feels like your own private sanctuary.
              </div>
            </div>
            <button 
              className="btn-luxury btn-outline" 
              id="readMoreBtn" 
              style={{ marginBottom: '25px' }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>

            <div className="about-features">
              <div className="feature"><i className="fas fa-gem"></i> Premium Luxury</div>
              <div className="feature"><i className="fas fa-heart"></i> Guest Centric</div>
            </div>
            <a href="#hotels" className="btn-luxury">View Properties</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
