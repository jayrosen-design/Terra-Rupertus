import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function RupertPage() {
  return (
    <>
      <Navbar />
      <div className="rupert-page-container">
        <div className="rupert-content">
          <div className="rupert-header">
            <h1 className="page-title">🦔 Rupert's Story</h1>
            <p className="page-subtitle">
              Meet the armadillo who's been exploring Earth's changes for 25 years
            </p>
          </div>

          {/* Video Section */}
          <div className="rupert-video-section">
            <div className="rupert-video-wrapper">
              <video 
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src="/rupert2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Astraeus Rupertus 2024 */}
          <div className="rupert-info-card">
            <h2 className="rupert-section-title">Astraeus Rupertus (2024)</h2>
            <p className="rupert-text">
              At NASA Space Apps Challenge 2024, our team developed Astraeus Rupertus
            </p>
            <p className="rupert-text">
              <strong>Submission description:</strong> We are a multicultural team united by a shared curiosity for the cosmos. Through "Rupert's eyes," a symbol of wonder and exploration, we aim to experience the night sky and distant exoplanets in ways that blend science, creativity, and diverse perspectives. Our mission is to explore not just the universe, but how different cultures and minds perceive and connect with it, revealing new insights with every gaze into the stars.
            </p>
            <p className="rupert-text">
              What would the night sky look like if you were standing on one of the many exoplanets discovered by astronomers and space missions? The list of 5500+ exoplanets at the NASA Exoplanet Archive can be combined with the latest star catalogs to translate the location and brightness of millions or even billions of stars to another perspective. From that perspective, anyone could use their imagination to draw constellations, much like our ancestors did on Earth thousands of years ago. Your challenge is to develop an app or interface for students that allows them to choose an exoplanet and then either display an interactive star chart or export a high-quality image for printing or viewing on a computer or virtual reality display, where they can draw and name constellations.
            </p>
            <div className="mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <Image src="/astreaus-rupertus.jpeg" alt="Astraeus Rupertus" width={600} height={400} style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <Image src="/astreaus-app.webp" alt="Astraeus App" width={600} height={400} style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
              </div>
            </div>
          </div>

          {/* Terra Rupertus 2025 */}
          <div className="rupert-info-card">
            <h2 className="rupert-section-title">Terra Rupertus (2025)</h2>
            <p className="rupert-text">
              For 2025, we are re-visiting Rupert the Space Armadillo. Once, he gazed at the stars from distant exoplanets — but now he's turning back toward home. This time, Rupert wants to understand what drove him to leave Earth in the first place. What happened to his planet? Why are the animals disappearing? Urbanization, deforestation, wildfires, and light pollution have made it harder not only to live but even to see the night sky.
            </p>
            <p className="rupert-text">
              After years in space, Rupert meets NASA's Terra satellite, which has been observing Earth for 25 years. Through Terra's five instruments — MODIS, ASTER, MISR, CERES, and MOPITT — Rupert sees the planet's transformation: expanding cities, burning forests, rising temperatures, and shifting air quality. Together, they uncover how human activity has changed the face of the world.
            </p>
            <p className="rupert-text">
              Our interactive web app shares both Rupert's animated story and real NASA Earth data, allowing users to explore a 3D interactive Earth through different lenses — light pollution, fires, carbon dioxide, methane, and more — visualized using Terra's datasets. A timeline of 25 key moments lets users see Earth's gradual change across a quarter-century of observation.
            </p>
            <p className="rupert-text">
              To guide the experience, a Rupert AI chatbot appears in the corner of the screen, helping users interpret what they see and learn what actions can help heal the planet. By blending storytelling, science, and interactivity, Rupert 2.0: Rendezvous with Terra turns 25 years of satellite data into a living narrative — a story of curiosity, loss, and hope for Earth's future.
            </p>
            <div className="mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <Image src="/rupert-watercolor.jpg" alt="Rupert Watercolor" width={600} height={800} style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <Image src="/rupertspace.webp" alt="Rupert in Space" width={600} height={400} style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
              </div>
            </div>
          </div>

          {/* Rupert in the News */}
          <div className="rupert-info-card">
            <h2 className="rupert-section-title">Rupert in the News</h2>
            
            <div className="news-item">
              <div className="news-image">
                <Image 
                  src="/spaceforce.png" 
                  alt="US Space Force - Rupert the Space Armadillo" 
                  width={300} 
                  height={200}
                  className="news-image-style"
                />
              </div>
              <div className="news-content">
                <h3 className="news-title">US Space Force. "From Mascot to Mission Specialist: Rupert the Space Armadillo Prepares for Liftoff"</h3>
                <p className="news-date">July 30, 2025</p>
                <a 
                  href="https://www.patrick.spaceforce.mil/News/Article-Display/Article/4259367/from-mascot-to-mission-specialist-rupert-the-space-armadillo-prepares-for-lifto/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="news-link"
                >
                  Read the full article →
                </a>
              </div>
            </div>

            <div className="news-item">
              <div className="news-image">
                <Image 
                  src="/newspaper.jpeg" 
                  alt="Hometown News - Innovators Unite and Inspire" 
                  width={300} 
                  height={200}
                  className="news-image-style"
                />
              </div>
              <div className="news-content">
                <h3 className="news-title">Hometown News. "Innovators Unite and Inspire"</h3>
                <p className="news-date">Oct. 11, 2024</p>
                <a 
                  href="https://www.hometownnewsbrevard.com/eedition/page-08/page_e36ec591-c639-5f5b-b983-8e90bb3a8356.html?fbclid=IwY2xjawGDmRFleHRuA2FlbQIxMAABHa7Lr8N8t3-KWFiZDljs8HKtujI9lzcWGb5-OHJSd3YV5RIsLC8rA_O2rg_aem_JiTPllj1OM6rpAzUwPvmHA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="news-link"
                >
                  Read the full article →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
