import React, { useState } from 'react';

const categories = [
  "Room", "Facade", "Washroom", "Entrance", "Reception", "Common Area", "Parking", "Restaurant"
];

// Property-specific image data
const propertyGalleries = {
  "SR Hotel": {
    "Room": [
      { src: "/images/sr/room1.avif", alt: "Deluxe Room" },
      { src: "/images/sr/room2.avif", alt: "Premium Suite" },
      { src: "/images/sr/room3.avif", alt: "Executive Room" },
      { src: "/images/sr/room4.avif", alt: "Luxury Stay" },
      { src: "/images/sr/room5.avif", alt: "Comfort Room" },
      { src: "/images/sr/room6.avif", alt: "Guest Suite" },
    ],
    "Facade": [
      { src: "/images/sr/Facade1.avif", alt: "SR Hotel Exterior Day" },
      { src: "/images/sr/Facade2.jpg", alt: "Main Entrance View" },
      { src: "/images/sr/Facade3.png", alt: "Hotel Front" },
      { src: "/images/sr/Facade4.avif", alt: "Architectural View" },
    ],
    "Washroom": [
      { src: "/images/sr/Washroom1.avif", alt: "Modern Bathroom" },
      { src: "/images/sr/Washroom2.avif", alt: "Premium Fittings" },
    ],
    "Entrance": [
      { src: "/images/sr/Entrance.avif", alt: "Grand Entrance" },
    ],
    "Reception": [
      { src: "/images/sr/Reception1.avif", alt: "Welcome Desk" },
      { src: "/images/sr/Reception2.avif", alt: "Lobby Reception" },
      { src: "/images/sr/Reception3.avif", alt: "Front Office" },
    ],
    "Common Area": [
      { src: "/images/sr/Common Area1.webp", alt: "Lounge Area" },
      { src: "/images/sr/Common Area2.avif", alt: "Sitting Area" },
      { src: "/images/sr/Common Area3.avif", alt: "Waitng Lounge" },
      { src: "/images/sr/Common Area4.avif", alt: "Upper Lobby" },
      { src: "/images/sr/Common Area5.avif", alt: "Corridor" },
    ],
    "Parking": [
      { src: "/images/sr/Parking1.avif", alt: "Secure Parking" },
      { src: "/images/sr/Parking2.webp", alt: "Valet Parking Area" },
    ],
    "Restaurant": [
      { src: "/images/sr/Restaurant.avif", alt: "Signature Dining" },
    ]
  },
  "Esta Stays": {
    "Room": [
      { src: "/images/esta/room1.avif", alt: "Premium Suite" },
      { src: "/images/esta/room2.webp", alt: "Deluxe Room" },
      { src: "/images/esta/room3.avif", alt: "Executive Stay" },
      { src: "/images/esta/room4.avif", alt: "Comfort Room" },
      { src: "/images/esta/room5.jpg", alt: "Luxury Room" },
      { src: "/images/esta/rom6.webp", alt: "Guest Suite" },
      { src: "/images/esta/room7.webp", alt: "Premium Stay" },
      { src: "/images/esta/room8.avif", alt: "Modern Suite" },
      { src: "/images/esta/room9.webp", alt: "Deluxe Twin" },
      { src: "/images/esta/room10.webp", alt: "Classic Room" },
      { src: "/images/esta/room11.avif", alt: "Standard Stay" },
      { src: "/images/esta/room12.webp", alt: "Elite Suite" },
    ],
    "Facade": [
      { src: "/images/esta/fascade1.avif", alt: "Esta Stays Exterior" },
      { src: "/images/esta/facade2.avif", alt: "Main Building" },
      { src: "/images/esta/facade3.webp", alt: "Architectural View" },
    ],
    "Washroom": [
      { src: "/images/esta/washroom1.avif", alt: "Modern Bathroom" },
      { src: "/images/esta/washroom2.avif", alt: "Premium Fittings" },
    ],
    "Entrance": [
      { src: "/images/esta/entarance1.webp", alt: "Grand Entrance" },
      { src: "/images/esta/entrance2.webp", alt: "Welcome Gate" },
    ],
    "Reception": [
      { src: "/images/esta/reception1.avif", alt: "Lobby Desk" },
      { src: "/images/esta/Reception2.avif", alt: "Front Office" },
      { src: "/images/esta/Reception3.avif", alt: "Check-in Area" },
    ],
    "Common Area": [
      { src: "/images/esta/Common Area1.avif", alt: "Lounge Area" },

      { src: "/images/esta/Common Area4.webp", alt: "Community Space" },
      { src: "/images/esta/outdoor1.avif", alt: "Outdoor Seating" },
      { src: "/images/esta/outdoo2.avif", alt: "Garden View" },

      { src: "/images/esta/Others3.webp", alt: "Corridor" },
    ],
    "Parking": [
      { src: "/images/esta/parking1.webp", alt: "Guest Parking" },
    ],
    "Restaurant": [
      { src: "/images/esta/Others1.avif", alt: "Interior Detail" },
      { src: "/images/esta/Others2.avif", alt: "Decorative Corner" },
      { src: "/images/esta/Common Area3.jpg", alt: "Sitting Lounge" },
    ]
  },
  // Default/Placeholders for other hotels
  "default": {
    "Room": [{ src: "/images/image 1.jpeg", alt: "Luxury Room" }],
    "Facade": [{ src: "/images/Marvel_Hotel_image.png", alt: "Exterior" }],
    "Restaurant": [{ src: "/images/image 2.jpeg", alt: "Dining" }]
  }
};

const GalleryModal = ({ isOpen, onClose, propertyName, setViewerImg }) => {
  const [activeCategory, setActiveCategory] = useState("Facade");

  if (!isOpen) return null;

  const currentGallery = propertyGalleries[propertyName] || propertyGalleries["default"];

  return (
    <div className={`gallery-modal ${isOpen ? 'active' : ''}`}>
      <div className="gallery-modal-header">
        <h2>{propertyName} — Gallery</h2>
        <span className="close-gallery" onClick={onClose}>&times;</span>
      </div>

      <div className="gallery-modal-body">
        <div className="gallery-categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-grid-container">
          <div className="gallery-grid">
            {(currentGallery[activeCategory] || []).map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => {
                  setViewerImg(img.src);
                  document.body.style.overflow = "hidden";
                }}
              >
                <img src={img.src} alt={img.alt} />
                <div className="item-overlay">
                  <p>{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
          {(!currentGallery[activeCategory] || currentGallery[activeCategory].length === 0) && (
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
              <p>No images available for this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
