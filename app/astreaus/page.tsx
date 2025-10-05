import Navbar from '../components/Navbar';

export default function AstreausPage() {
  return (
    <>
      <Navbar />
      <div className="astreaus-page-container">
        <div className="astreaus-content">
          <div className="astreaus-header">
            <h1 className="page-title">🌟 Astreaus Rupertus</h1>
            <p className="page-subtitle">
              Explore the cosmos through Rupert's eyes
            </p>
          </div>

          {/* Game Section */}
          <div className="astreaus-game-section">
            <div className="html_embed_widget base_widget embed_wrapper" id="html_embed_10891">
              <div style={{width: '980px', height: '660px'}} className="game_frame game_loaded" data-height="660" data-width="980">
                <iframe 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  scrolling="no" 
                  allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated; web-share" 
                  src="https://html-classic.itch.zone/html/11787167/Exosky4/index.html" 
                  id="game_drop" 
                  allowTransparency={true}
                />
              </div>
            </div>
          </div>

          {/* Visit Button */}
          <div className="astreaus-button-section">
            <a 
              href="https://nasa-space-apps-astreaus-rupertus.lovable.app/constellations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="visit-astreaus-button"
            >
              Visit Astreaus Rupertus
            </a>
          </div>

          {/* Astraeus Rupertus (2024) Description */}
          <div className="astreaus-info-card">
            <h2 className="astreaus-section-title">🚀 Astraeus Rupertus (2024)</h2>
            <p className="astreaus-text">
              At NASA Space Apps Challenge 2024, our team developed Astraeus Rupertus
            </p>
          </div>

          {/* Exploring the Exosky with Rupert */}
          <div className="astreaus-info-card">
            <h2 className="astreaus-section-title">🌟 Exploring the Exosky with Rupert</h2>
            <p className="astreaus-text">
              Our team, Astreaus Rupertus, developed a web application for the NASA Space Apps Challenge Exosky, where users can explore the night sky from the perspective of various exoplanets. The app allows kids, students, and anyone to visualize star charts as they would appear from a section of over 5500 known exoplanets, offering an interactive and educational experience.
            </p>
            <p className="astreaus-text">
              Users can select an exoplanet, explore its unique night sky, and draw their own constellations. Inspired by the mascot Rupert the Space Armadillo, our project weaves together storytelling and space exploration, allowing students to connect with the vast universe.
            </p>
          </div>

          {/* Key Features */}
          <div className="astreaus-info-card">
            <h2 className="astreaus-section-title">✨ Key Features</h2>
            <ul className="astreaus-list">
              <li>Exoplanet selection with customized star charts</li>
              <li>Interactive star maps, allowing users to create constellations and explore star data</li>
              <li>Customization options for advanced users, including grid overlays and star detail information</li>
            </ul>
          </div>

          {/* Project Details */}
          <div className="astreaus-info-card">
            <h2 className="astreaus-section-title">🔬 Project Details</h2>
            <p className="astreaus-text">
              Our project allows users to explore the night sky from different exoplanets' perspectives. Using data from over 5500 exoplanets and vast star catalogs, the app generates unique star charts for each exoplanet.
            </p>
            <p className="astreaus-text">
              The app leverages real space data from the Gaia mission, combining it with exoplanet data to visualize stars through an interactive 3D star map. It also includes storytelling elements, with Rupert the Space Armadillo guiding users to create and share their own constellations.
            </p>
          </div>

          {/* Submission Description */}
          <div className="astreaus-info-card">
            <h2 className="astreaus-section-title">📝 Submission Description</h2>
            <p className="astreaus-text">
              <strong>Submission description:</strong> We are a multicultural team united by a shared curiosity for the cosmos. Through "Rupert's eyes," a symbol of wonder and exploration, we aim to experience the night sky and distant exoplanets in ways that blend science, creativity, and diverse perspectives. Our mission is to explore not just the universe, but how different cultures and minds perceive and connect with it, revealing new insights with every gaze into the stars.
            </p>
            <p className="astreaus-text">
              What would the night sky look like if you were standing on one of the many exoplanets discovered by astronomers and space missions? The list of 5500+ exoplanets at the NASA Exoplanet Archive can be combined with the latest star catalogs to translate the location and brightness of millions or even billions of stars to another perspective. From that perspective, anyone could use their imagination to draw constellations, much like our ancestors did on Earth thousands of years ago. Your challenge is to develop an app or interface for students that allows them to choose an exoplanet and then either display an interactive star chart or export a high-quality image for printing or viewing on a computer or virtual reality display, where they can draw and name constellations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
