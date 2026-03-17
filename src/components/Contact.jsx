import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding fade-up" style={{ background: 'var(--bg-light-dark)' }}>
      <div className="container">
        <div className="about-grid">
          <div className="contact-form reveal">
            <span className="section-subtitle">Reach Us</span>
            <h2>Concierge Service</h2>
            <div style={{ marginTop: '30px' }}>
              <div style={{ marginBottom: '25px' }}>
                <p style={{ fontWeight: 600, color: 'var(--gold)', marginBottom: '5px' }}>Email Us</p>
                <p>hello@amayahotels.in</p>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <p style={{ fontWeight: 600, color: 'var(--gold)', marginBottom: '5px' }}>Call Us</p>
                <p>+91 92707 65677</p>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <p style={{ fontWeight: 600, color: 'var(--gold)', marginBottom: '5px' }}>Location</p>
                <p>Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
          <div className="contact-map reveal">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.0344739699!2d73.79248231!3d18.5204303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67414521%3A0xd9069037498a75bf!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709800000000!5m2!1sen!2sin" 
              style={{ width: '100%', height: '350px', border: 0, borderRadius: 'var(--radius)', filter: 'grayscale(1) invert(0.9)' }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
