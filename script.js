document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
  const html = document.documentElement;

  // Check LocalStorage for saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);

  if (themeIcon) {
    if (savedTheme === "light") {
      themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = html.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      if (themeIcon) {
        if (newTheme === "light") {
          themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
          themeIcon.classList.replace("fa-sun", "fa-moon");
        }
      }
    });
  }

  // --- Navigation Scroll ---
  const header = document.getElementById("mainHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Responsive Navigation Side Drawer ---
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("nav-links");
  const closeMenu = document.getElementById("closeMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  const toggleMenu = () => {
    navLinks.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  };

  const closeMenuDrawer = () => {
    navLinks.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", toggleMenu);

    if (closeMenu) closeMenu.addEventListener("click", closeMenuDrawer);
    if (menuOverlay) menuOverlay.addEventListener("click", closeMenuDrawer);

    // Also close on link click
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", closeMenuDrawer);
    });
  }

  // --- Read More Logic ---
  const readMoreBtn = document.getElementById("readMoreBtn");
  const readMoreContent = document.getElementById("readMoreContent");

  if (readMoreBtn && readMoreContent) {
    readMoreBtn.addEventListener("click", () => {
      readMoreContent.classList.toggle("expanded");
      if (readMoreContent.classList.contains("expanded")) {
        readMoreBtn.innerText = "Read Less";
      } else {
        readMoreBtn.innerText = "Read More";
      }
    });
  }

  // --- Hero Slider Logic (Fade) ---
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 0) {
    let currentSlide = 0;
    const autoSlide = () => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    };
    setInterval(autoSlide, 5000);
  }

  // --- Scroll Reveals (GSAP + ScrollTrigger) ---
  const reveals = document.querySelectorAll(".reveal, .fade-up");

  reveals.forEach((el) => {
    // Determine offset and direction based on class
    const isSection = el.classList.contains("fade-up");

    gsap.fromTo(el, {
      opacity: 0,
      y: isSection ? 40 : 30
    }, {
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: isSection ? 1.2 : 0.8,
      ease: "power2.out"
    });
  });

  // --- Vanilla JS Slide Reveals ---
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".slide-left, .slide-right").forEach((el) => {
    slideObserver.observe(el);
  });


  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - (header ? header.offsetHeight : 0),
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Room Availability Logic ---
  const hotelRoomsData = {
    "sr-hotel": { name: "SR Hotel (Wakad)", image: "SR_hotel _image.png", total: 35, booked: [101, 105, 202, 305] },
    "marvel-hotel": { name: "Marvel Hotel (Viman Nagar)", image: "Marvel_Hotel_image.png", total: 30, booked: [102, 110, 205] },
    "esta-stays": { name: "Esta Stays (Viman Nagar)", image: "Esta Stays_image.png", total: 25, booked: [101, 104, 203] }
  };

  const generateRoomGrid = (hotelId) => {
    const data = hotelRoomsData[hotelId];
    const roomGrid = document.getElementById("roomGrid");
    if (!data || !roomGrid) return;
    roomGrid.innerHTML = "";
    for (let i = 1; i <= data.total; i++) {
      const floor = Math.floor((i - 1) / 10) + 1;
      const roomNum = floor * 100 + (((i - 1) % 10) + 1);
      const isBooked = data.booked.includes(roomNum);
      const roomBox = document.createElement("div");
      roomBox.className = `room-box ${isBooked ? "booked" : "vacant"}`;
      roomBox.innerText = roomNum;
      roomGrid.appendChild(roomBox);
    }
  };

  const modal = document.getElementById("availabilityModal");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hotelId = btn.getAttribute("data-hotel");
      const modalHotelName = document.getElementById("modalHotelName");
      const modalHotelImg = document.getElementById("modalHotelImg");

      if (modalHotelName) modalHotelName.innerText = hotelRoomsData[hotelId].name;
      if (modalHotelImg) modalHotelImg.src = hotelRoomsData[hotelId].image;

      generateRoomGrid(hotelId);
      if (modal) modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  // --- Testimonial Auto-Slider ---
  const testimonialSlider = document.getElementById("testimonialSlider");
  const testimonials = document.querySelectorAll(".testimonial");

  if (testimonialSlider && testimonials.length > 0) {
    let tIndex = 0;
    const showNextTestimonial = () => {
      tIndex++;
      if (tIndex >= testimonials.length) {
        tIndex = 0;
      }
      testimonialSlider.style.transform = `translateX(-${tIndex * 100}%)`;
    };
    setInterval(showNextTestimonial, 3000);
  }

  window.addEventListener("scroll", () => {
    // --- Parallax Image Scroll ---
    const propertyImages = document.querySelectorAll(".property-img img");
    propertyImages.forEach(img => {
      const speed = 0.1;
      const offset = window.scrollY * speed;
      img.style.transform = `translateY(${offset}px)`;
    });
  });

  // Initial state set


  // --- Feedback Form Logic ---
  const starRating = document.getElementById("starRating");
  const ratingInput = document.getElementById("feedbackRating");
  const ratingLabel = document.getElementById("ratingLabel");
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackSuccess = document.getElementById("feedbackSuccess");
  const feedbackReset = document.getElementById("feedbackReset");
  const feedbackSubmitBtn = document.getElementById("feedbackSubmitBtn");

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  if (starRating) {
    const stars = starRating.querySelectorAll("i.fa-star");

    const highlightStars = (count, className) => {
      stars.forEach((star, i) => {
        if (i < count) {
          star.classList.add(className);
        } else {
          star.classList.remove(className);
        }
      });
    };

    stars.forEach(star => {
      star.addEventListener("mouseenter", () => {
        const val = parseInt(star.getAttribute("data-value"));
        highlightStars(val, "hovered");
        ratingLabel.textContent = ratingLabels[val];
      });

      star.addEventListener("mouseleave", () => {
        highlightStars(0, "hovered");
        const current = parseInt(ratingInput.value);
        ratingLabel.textContent = current > 0 ? ratingLabels[current] : "Select a rating";
      });

      star.addEventListener("click", () => {
        const val = parseInt(star.getAttribute("data-value"));
        ratingInput.value = val;
        highlightStars(val, "active");
        ratingLabel.textContent = ratingLabels[val];
      });
    });
  }

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validate star rating
      if (parseInt(ratingInput.value) === 0) {
        ratingLabel.textContent = "Please select a rating!";
        ratingLabel.style.color = "#e74c3c";
        setTimeout(() => {
          ratingLabel.style.color = "";
          ratingLabel.textContent = "Select a rating";
        }, 2000);
        return;
      }

      // Show loading
      feedbackSubmitBtn.classList.add("loading");
      feedbackSubmitBtn.disabled = true;

      // Simulate submission delay
      setTimeout(() => {
        feedbackSubmitBtn.classList.remove("loading");
        feedbackSubmitBtn.disabled = false;
        feedbackSuccess.classList.add("active");
      }, 1500);
    });
  }
  if (feedbackReset) {
    feedbackReset.addEventListener("click", () => {
      feedbackSuccess.classList.remove("active");
      feedbackForm.reset();
      ratingInput.value = 0;
      ratingLabel.textContent = "Select a rating";
      if (starRating) {
        const stars = starRating.querySelectorAll("i.fa-star");
        stars.forEach(s => s.classList.remove("active", "hovered"));
      }
    });
  }

  // --- Modern Gallery Slider Logic ---
  const galSlider = document.getElementById("gallerySliderMain");
  const galSlides = document.querySelectorAll(".gallery-slide");
  const galPrev = document.getElementById("galPrev");
  const galNext = document.getElementById("galNext");
  const galDotsContainer = document.getElementById("galDots");

  if (galSlider && galSlides.length > 0) {
    let galIndex = Math.floor(galSlides.length / 2); // Start with middle slide
    let isDesktop = window.innerWidth > 768;

    // Generate Dots
    galSlides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = `dot ${i === galIndex ? "active" : ""}`;
      dot.addEventListener("click", () => {
        galIndex = i;
        updateGallery();
      });
      galDotsContainer.appendChild(dot);
    });

    const updateGallery = () => {
      const dots = galDotsContainer.querySelectorAll(".dot");
      const containerWidth = galSlider.parentElement.offsetWidth;
      const slideWidth = galSlides[0].offsetWidth;

      // Calculate centering offset
      const offset = (containerWidth / 2) - (slideWidth / 2) - (galIndex * slideWidth);

      galSlider.style.transform = `translateX(${offset}px)`;

      galSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === galIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === galIndex);
      });
    };

    const nextGal = () => {
      galIndex = (galIndex + 1) % galSlides.length;
      updateGallery();
    };

    const prevGal = () => {
      galIndex = (galIndex - 1 + galSlides.length) % galSlides.length;
      updateGallery();
    };

    if (galNext) galNext.addEventListener("click", nextGal);
    if (galPrev) galPrev.addEventListener("click", prevGal);

    // Initial positioning
    window.addEventListener("resize", () => {
      isDesktop = window.innerWidth > 768;
      updateGallery();
    });

    // Slight delay to ensure layout is ready
    setTimeout(updateGallery, 100);

    // Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    galSlider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galSlider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) nextGal();
      if (touchEndX > touchStartX + swipeThreshold) prevGal();
    };
  }

  // --- Image Viewer (Lightbox) Logic ---
  const imageViewer = document.getElementById("imageViewer");
  const viewerImg = document.getElementById("viewerImg");
  const closeBtn = document.querySelector(".image-viewer .close-btn");

  if (imageViewer && viewerImg) {
    // Use event delegation to handle ALL images, including those changed dynamically
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "IMG" && !target.classList.contains("viewer-img")) {
        viewerImg.src = target.src;
        imageViewer.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });

    const closeViewer = () => {
      imageViewer.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeViewer);

    // Close on click outside the image
    imageViewer.addEventListener("click", (e) => {
      if (e.target === imageViewer) closeViewer();
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && imageViewer.classList.contains("active")) closeViewer();
    });
  }
});
