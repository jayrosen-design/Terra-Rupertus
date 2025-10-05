import Navbar from '../components/Navbar';

export default function TerraSatellitePage() {
  return (
    <>
      <Navbar />
      <div className="terra-page-container">
        <div className="terra-content">
          <div className="terra-header">
            <h1 className="page-title">🛰️ Terra Satellite</h1>
            <p className="page-subtitle">
              Earth Observing System Flagship Mission
            </p>
          </div>

          {/* 3D Model Section */}
          <div className="terra-model-section">
            <div className="sketchfab-embed-wrapper">
              <iframe 
                title="Terra (EOS AM-1) Satellite" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; fullscreen; xr-spatial-tracking" 
                src="https://sketchfab.com/models/74b6b96cbf6b4fbb81323f2fb1d36637/embed?autostart=1&preload=1&transparent=1&ui_theme=dark"
                className="terra-iframe"
              />
            </div>
          </div>

          {/* Mission Overview */}
          <div className="terra-info-card">
            <h2 className="terra-section-title">Mission Overview</h2>
            <p className="terra-text">
              Terra explores the connections between Earth's atmosphere, land, snow and ice, ocean, 
              and energy balance to understand Earth's climate and to map the impact of human activity 
              and natural disasters on communities and ecosystems.
            </p>
          </div>

          {/* Data Products */}
          <div className="terra-info-card">
            <h2 className="terra-section-title">Data Products & Distribution</h2>
            <p className="terra-text">
              Terra's five instruments produce <strong>83 core data products</strong> which are distributed through:
            </p>
            <ul className="terra-list">
              <li>Land Processes Distributed Active Archive Center (LPDAAC)</li>
              <li>Atmospheric Science Data Center (ASDC)</li>
              <li>Ocean Color Web</li>
              <li>Level 1 and Atmosphere Archive and Distribution System</li>
              <li>National Snow and Ice Data Center (NSIDC)</li>
            </ul>
            <p className="terra-text">
              Each data set is specialized and many work in concert with other data products. 
              Data sets are typically available as Hierarchical Data Format (HDF) files and there are 
              a variety of HDF processing software available that allow users to display and browse 
              images and data file information.
            </p>
          </div>

          {/* Five Instruments */}
          <div className="terra-info-card">
            <h2 className="terra-section-title">Five Onboard Sensors</h2>
            <p className="terra-text">
              Terra collects data about the Earth's bio-geochemical and energy systems using five sensors 
              that observe the atmosphere, land surface, oceans, snow and ice, and energy budget:
            </p>
            
            <div className="terra-instruments-grid">
              <div className="instrument-card">
                <h3 className="instrument-title">ASTER</h3>
                <p className="instrument-description">
                  Advanced Spaceborne Thermal Emission and Reflection Radiometer
                </p>
              </div>

              <div className="instrument-card">
                <h3 className="instrument-title">CERES</h3>
                <p className="instrument-description">
                  Clouds and Earth's Radiant Energy System
                </p>
              </div>

              <div className="instrument-card">
                <h3 className="instrument-title">MISR</h3>
                <p className="instrument-description">
                  Multi-angle Imaging SpectroRadiometer
                </p>
              </div>

              <div className="instrument-card">
                <h3 className="instrument-title">MODIS</h3>
                <p className="instrument-description">
                  Moderate-resolution Imaging Spectroradiometer
                </p>
              </div>

              <div className="instrument-card">
                <h3 className="instrument-title">MOPITT</h3>
                <p className="instrument-description">
                  Measurements of Pollution in the Troposphere
                </p>
              </div>
            </div>

            <p className="terra-text mt-6">
              Because all five instruments are on the same satellite making simultaneous observations, 
              scientists are able to compare different aspects of Earth's characteristics over time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
