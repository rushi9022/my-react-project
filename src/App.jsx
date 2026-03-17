import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Hotels from './components/Hotels';
import Amenities from './components/Amenities';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const hotelRoomsData = {
  "sr-hotel": { name: "SR Hotel (Wakad)", image: "/images/SR_hotel _image.png", total: 35, booked: [101, 105, 202, 305] },
  "marvel-hotel": { name: "Marvel Hotel (Viman Nagar)", image: "/images/Marvel_Hotel_image.png", total: 30, booked: [102, 110, 205] },
  "esta-stays": { name: "Esta Stays (Viman Nagar)", image: "/images/Esta Stays_image.png", total: 25, booked: [101, 104, 203] }
};

const App = () => {
  const [modalData, setModalData] = useState(null);
  const [viewerImg, setViewerImg] = useState(null);
  const [galIndex, setGalIndex] = useState(4);
  const [tIndex, setTIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Scroll Reveals
    const reveals = document.querySelectorAll(".reveal, .fade-up");
    reveals.forEach((el) => {
      const isSection = el.classList.contains("fade-up");
      gsap.fromTo(el, { opacity: 0, y: isSection ? 40 : 30 }, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        opacity: 1, y: 0, duration: isSection ? 1.2 : 0.8, ease: "power2.out"
      });
    });

    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".slide-left, .slide-right").forEach(el => slideObserver.observe(el));

    // Parallax
    const handleScroll = () => {
      document.querySelectorAll(".property-img img").forEach(img => {
        img.style.transform = `translateY(${window.scrollY * 0.1}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);

    // Smooth Scroll Link
    const handleNavClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const id = target.getAttribute('href');
        if (id === '#') return;
        e.preventDefault();
        const el = document.querySelector(id);
        const header = document.getElementById("mainHeader");
        if (el) window.scrollTo({ top: el.offsetTop - (header ? header.offsetHeight : 0), behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handleNavClick);

    // Lightbox image viewer integration
    const handleImgClick = (e) => {
      if (e.target.tagName === "IMG" && !e.target.closest('.image-viewer, .hero-slider, .viewer-img')) {
        setViewerImg(e.target.src);
        document.body.style.overflow = "hidden";
      }
    };
    document.addEventListener("click", handleImgClick);

    // Keydown escape for modals
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setViewerImg(null);
        setModalData(null);
        document.body.style.overflow = "auto";
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Testimonial slider
    const testimonialTimer = setInterval(() => {
      setTIndex(prev => (prev + 1) % 3);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('click', handleNavClick);
      document.removeEventListener("click", handleImgClick);
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(testimonialTimer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating!");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackSuccess(true);
    }, 1500);
  };

  const resetFeedback = () => {
    setFeedbackSuccess(false);
    setRating(0);
    setHoverRating(0);
    document.getElementById("feedbackForm").reset();
  };

  const renderRooms = (hotelId) => {
    const data = hotelRoomsData[hotelId];
    if (!data) return null;
    let rooms = [];
    for (let i = 1; i <= data.total; i++) {
      const floor = Math.floor((i - 1) / 10) + 1;
      const roomNum = floor * 100 + (((i - 1) % 10) + 1);
      const isBooked = data.booked.includes(roomNum);
      rooms.push(
        <div key={roomNum} className={`room-box ${isBooked ? "booked" : "vacant"}`}>{roomNum}</div>
      );
    }
    return rooms;
  };

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Hotels setModalData={setModalData} />
      <Amenities />
      <Testimonials tIndex={tIndex} />
      <Gallery galIndex={galIndex} setGalIndex={setGalIndex} />
      <Contact />
      <Feedback 
        feedbackSuccess={feedbackSuccess} 
        isSubmitting={isSubmitting} 
        rating={rating} 
        hoverRating={hoverRating} 
        setRating={setRating} 
        setHoverRating={setHoverRating} 
        handleFeedbackSubmit={handleFeedbackSubmit} 
        resetFeedback={resetFeedback} 
      />
      <Footer />

      {/* Room Availability Modal */}
      <div className={`modal ${modalData ? 'active' : ''}`} onClick={(e) => { if (e.target.classList.contains('modal')) { setModalData(null); document.body.style.overflow = "auto"; } }}>
        <div className="modal-content">
          <span className="close-modal" onClick={() => { setModalData(null); document.body.style.overflow = "auto"; }}>&times;</span>
          {modalData && (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
              <img src={hotelRoomsData[modalData].image} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius)' }} alt="Hotel" />
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)' }}>{hotelRoomsData[modalData].name}</h2>
                <p style={{ color: 'var(--gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Availability Status</p>
              </div>
            </div>
          )}
          <div className="room-grid">
            {modalData && renderRooms(modalData)}
          </div>
          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button className="btn-luxury">Book Selected</button>
          </div>
        </div>
      </div>

      {/* Image Viewer (Lightbox) */}
      <div className={`image-viewer ${viewerImg ? 'active' : ''}`} onClick={(e) => { if (e.target.classList.contains('image-viewer')) { setViewerImg(null); document.body.style.overflow = "auto"; } }}>
        <span className="close-btn" onClick={() => { setViewerImg(null); document.body.style.overflow = "auto"; }}>&times;</span>
        {viewerImg && <img className="viewer-img" src={viewerImg} alt="Enlarged view" />}
      </div>
    </>
  );
};

export default App;
