import React from 'react';

const Feedback = ({ feedbackSuccess, isSubmitting, rating, hoverRating, setRating, setHoverRating, handleFeedbackSubmit, resetFeedback }) => {
  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <section id="feedback" className="section-padding fade-up">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle reveal">Your Voice Matters</span>
          <h2 className="section-title reveal">Share Your Feedback</h2>
          <div className="title-line reveal"></div>
        </div>

        <div className="feedback-wrapper reveal">
          <div className={`feedback-success ${feedbackSuccess ? 'active' : ''}`} style={{ display: feedbackSuccess ? 'block' : 'none' }}>
            <div className="success-icon"><i className="fas fa-check"></i></div>
            <h3>Thank You!</h3>
            <p>Your feedback has been submitted successfully. We truly appreciate your time and will use your insights to improve our services.</p>
            <button className="btn-luxury btn-outline" onClick={resetFeedback}>Submit Another</button>
          </div>

          <form className="feedback-form" id="feedbackForm" onSubmit={handleFeedbackSubmit} style={{ display: feedbackSuccess ? 'none' : 'block' }}>
            <div className="feedback-grid">
              <div className="feedback-col">
                <div className="form-group"><label>Full Name</label><input type="text" placeholder="Your name" required /></div>
                <div className="form-group"><label>Email Address</label><input type="email" placeholder="your@email.com" required /></div>
                <div className="form-group">
                  <label>Hotel Visited</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select a property</option>
                    <option value="sr-hotel">SR Hotel — Wakad</option>
                    <option value="marvel-hotel">Marvel Hotel — Viman Nagar</option>
                    <option value="esta-stays">Esta Stays — Viman Nagar</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Experience Category</label>
                  <select required defaultValue="">
                    <option value="" disabled>What would you like to rate?</option>
                    <option value="overall">Overall Experience</option>
                    <option value="rooms">Room Quality & Comfort</option>
                    <option value="food">Dining & Cuisine</option>
                    <option value="staff">Staff & Service</option>
                    <option value="cleanliness">Cleanliness & Hygiene</option>
                    <option value="amenities">Amenities & Facilities</option>
                  </select>
                </div>
              </div>

              <div className="feedback-col">
                <div className="form-group">
                  <label>Your Rating</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(val => (
                      <i key={val} className={`fas fa-star ${val <= (hoverRating || rating) ? 'active' : ''} ${val <= hoverRating ? 'hovered' : ''}`} 
                         onMouseEnter={() => setHoverRating(val)} 
                         onMouseLeave={() => setHoverRating(0)} 
                         onClick={() => setRating(val)}></i>
                    ))}
                    <span className="rating-label">{rating > 0 && !hoverRating ? ratingLabels[rating] : hoverRating > 0 ? ratingLabels[hoverRating] : "Select a rating"}</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea rows="7" placeholder="Tell us about your experience..." required></textarea>
                </div>
              </div>
            </div>

            <div className="feedback-submit-row">
              <p className="feedback-note"><i className="fas fa-lock"></i> Your feedback is private and helps us improve.</p>
              <button type="submit" className={`btn-luxury ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                <span className="btn-text">Submit Feedback</span>
                <span className="btn-loader"><i className="fas fa-spinner fa-spin"></i></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
