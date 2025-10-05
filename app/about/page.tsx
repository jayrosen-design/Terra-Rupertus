'use client';

import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="about-page-container">
        <div className="about-content">
          <div className="about-header">
            <h1 className="page-title">ℹ️ About Terra Rupertus</h1>
            <p className="page-subtitle">
              Learn about our NASA Space Apps Challenge project
            </p>
          </div>

          {/* NASA Space Apps Challenge Team Page */}
          <div className="about-info-card">
            <h2 className="about-section-title">🚀 NASA Space Apps Challenge Team Page</h2>
            <p className="about-text">
              Visit our official team page on the NASA Space Apps Challenge website to learn more about our project and connect with our team.
            </p>
            <div className="about-link-section">
              <a 
                href="https://www.spaceappschallenge.org/2025/find-a-team/astreaus-rupertus1/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nasa-team-link"
              >
                🌐 Visit Our NASA Space Apps Team Page
              </a>
            </div>
            <div className="about-link-section" style={{ marginTop: 12 }}>
              <a
                href="https://www.canva.com/design/DAG02k733X4/9QJlne6EbohXi7wCiTYPRw/view?utm_content=DAG02k733X4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd452a88757"
                target="_blank"
                rel="noopener noreferrer"
                className="nasa-team-link"
              >
                🎥 View Our Presentation
              </a>
            </div>
          </div>

          {/* Team Information */}
          <div className="about-info-card">
            <h2 className="about-section-title">👥 Team Information</h2>
            
            <div className="info-grid">
              <div className="info-item">
                <h3 className="info-label">Local Event</h3>
                <p className="info-value">Cape Canaveral, FL, United States</p>
              </div>
              
              <div className="info-item">
                <h3 className="info-label">Challenge</h3>
                <p className="info-value">Animation Celebration of Terra Data!</p>
              </div>
            </div>
          </div>

          {/* NASA Space Apps Challenge 2025 */}
          <div className="about-info-card">
            <h2 className="about-section-title">🚀 NASA Space Apps Challenge 2025</h2>
            <p className="about-text">
              <strong>Location:</strong> Cape Canaveral, FL
            </p>
            <p className="about-text">
              <strong>Team Name:</strong> Terra Rupertus
            </p>
            <p className="about-text">
              Our team came together at the NASA Space Apps Challenge 2025 in Cape Canaveral, Florida, 
              united by a shared passion for Earth science, space exploration, and environmental awareness. 
              Through collaborative innovation and diverse perspectives, we developed Terra Rupertus to 
              make NASA's Earth observation data accessible and engaging for everyone.
            </p>
          </div>

          {/* Team Members */}
          <div className="about-info-card">
            <h2 className="about-section-title">👨‍💻 Team Members</h2>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <img
                src="/team.webp"
                alt="Team Terra Rupertus"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 12 }}
              />
            </div>
            <div className="team-members-grid">
              <div className="team-member-card">
                <div className="member-avatar">👨‍💻</div>
                <h3 className="member-name">Jay Rosen</h3>
                <p className="member-role">Developer</p>
                <a href="https://www.linkedin.com/in/jayrosenartist/" target="_blank" rel="noopener noreferrer" aria-label="Jay Rosen LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7c0-1.7 0-3.8-2.3-3.8-2.3 0-2.6 1.8-2.6 3.7V24h-4V8z"/></svg>
                  LinkedIn
                </a>
              </div>

              <div className="team-member-card">
                <div className="member-avatar">🎨</div>
                <h3 className="member-name">Jessica Rosen</h3>
                <p className="member-role">Artist</p>
                <a href="https://www.linkedin.com/in/jessica-rosen-8b9500246/" target="_blank" rel="noopener noreferrer" aria-label="Jessica Rosen LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7c0-1.7 0-3.8-2.3-3.8-2.3 0-2.6 1.8-2.6 3.7V24h-4V8z"/></svg>
                  LinkedIn
                </a>
              </div>

              <div className="team-member-card">
                <div className="member-avatar">✍️</div>
                <h3 className="member-name">Julieth Lorne</h3>
                <p className="member-role">Storytelling</p>
                <a href="https://www.linkedin.com/in/julieth-lorne/" target="_blank" rel="noopener noreferrer" aria-label="Julieth Lorne LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7c0-1.7 0-3.8-2.3-3.8-2.3 0-2.6 1.8-2.6 3.7V24h-4V8z"/></svg>
                  LinkedIn
                </a>
              </div>

              <div className="team-member-card">
                <div className="member-avatar">👩‍💻</div>
                <h3 className="member-name">Laura Chavez</h3>
                <p className="member-role">Animation</p>
                <a href="https://www.linkedin.com/in/laurachavezruiz/" target="_blank" rel="noopener noreferrer" aria-label="Laura Chavez LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7c0-1.7 0-3.8-2.3-3.8-2.3 0-2.6 1.8-2.6 3.7V24h-4V8z"/></svg>
                  LinkedIn
                </a>
              </div>

              <div className="team-member-card">
                <div className="member-avatar">👨‍🚀</div>
                <h3 className="member-name">Paul Muszynski</h3>
                <p className="member-role">Space Science</p>
                <a href="https://www.linkedin.com/in/paul-muszynski-a4623b129/" target="_blank" rel="noopener noreferrer" aria-label="Paul Muszynski LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7c0-1.7 0-3.8-2.3-3.8-2.3 0-2.6 1.8-2.6 3.7V24h-4V8z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="about-info-card">
            <h2 className="about-section-title">🎯 Our Mission</h2>
            <p className="about-text">
              Through Terra Rupertus, we aim to bridge the gap between complex Earth science data 
              and public understanding. By combining storytelling, interactive visualization, and 
              real NASA satellite data, we hope to inspire environmental awareness and scientific 
              curiosity in people of all ages.
            </p>
            <p className="about-text">
              Our diverse team brings together expertise in software development, data science, 
              space research, and Earth observation to create an engaging platform that makes 
              the invisible changes to our planet visible and understandable.
            </p>
          </div>

          {/* About the Challenge */}
          <div className="about-info-card">
            <h2 className="about-section-title">🎯 About the Challenge</h2>
            <p className="about-text">
              NASA's oldest daily Earth-viewing satellite – Terra – just turned 25 years old, and with five continuously operating instruments onboard (most taking imagery at the same time), Terra has piled up a LOT of data over the years (over 9,000 days and counting!). This data has the potential to shed light on everything from scientific processes to unique events, all while helping solve problems that affect humans.
            </p>
            <p className="about-text">
              Your challenge is to use data from any or all of Terra's five instruments to create an animated product showcasing an Earth science story and emphasizing the impacts to you, your community, and/or the environment.
            </p>
            <p className="about-text">
              <em>(Earth Science Division)</em>
            </p>
          </div>

          {/* Our Solution */}
          <div className="about-info-card">
            <h2 className="about-section-title">💡 Our Solution</h2>
            <p className="about-text">
              Terra Rupertus addresses this challenge by creating an interactive, animated storytelling experience that brings 25 years of Terra satellite data to life. Through the eyes of Rupert the Space Armadillo, users can explore Earth's transformation over time using real NASA data visualizations.
            </p>
            <p className="about-text">
              Our solution combines:
            </p>
            <ul className="about-list">
              <li>🎬 <strong>Animated Storytelling:</strong> Rupert's journey from space back to Earth</li>
              <li>🌍 <strong>Interactive 3D Globe:</strong> Real-time Terra data visualization</li>
              <li>📊 <strong>Data Layers:</strong> Fires, pollution, light pollution, and more</li>
              <li>⏰ <strong>Timeline:</strong> 25 years of Earth observation data</li>
              <li>🤖 <strong>AI Assistant:</strong> Rupert chatbot for guided exploration</li>
            </ul>
          </div>

          {/* Impact */}
          <div className="about-info-card">
            <h2 className="about-section-title">🌱 Impact & Mission</h2>
            <p className="about-text">
              By making complex Earth science data accessible and engaging, Terra Rupertus helps users understand the environmental changes happening on our planet. Through interactive exploration and storytelling, we aim to inspire environmental awareness and scientific curiosity in people of all ages.
            </p>
            <p className="about-text">
              Our project demonstrates how NASA's Terra satellite data can be used to tell compelling stories about Earth's past, present, and future, helping communities understand the impacts of climate change and environmental transformation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
