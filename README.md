# 🌍 Terra Rupertus

Follow Rupert the armadillo's journey through 25 years of NASA Terra satellite data, exploring global environmental changes through an interactive 3D globe and immersive storytelling experience.

![Terra Rupertus](https://img.shields.io/badge/NASA-Terra%20Data-blue) ![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black) ![CesiumJS](https://img.shields.io/badge/3D-CesiumJS-green) ![NASA Space Apps 2025](https://img.shields.io/badge/NASA-Space%20Apps%202025-red)

## 📖 About

Terra Rupertus is an interactive web application that visualizes 25 years of NASA Terra satellite data (2000-2025) to showcase global environmental stressors through the narrative of Rupert, an animated armadillo seeking a new home. The application leverages CesiumJS for high-precision 3D globe visualization and NASA's Global Imagery Browse Services (GIBS) for real-time data streaming.

**NASA Space Apps Challenge 2025 - Cape Canaveral, FL**  
**Challenge: Animation Celebration of Terra Data!**

## ✨ Features

### 🌍 Earth Page (Main Application)
- **🗺️ Interactive 3D Globe**: High-precision WGS84 ellipsoid model with pan, zoom, and rotate capabilities
- **🛰️ NASA Terra Data Layers**:
  - 🔥 Active Fires (MODIS Thermal Anomalies)
  - 💨 Carbon Monoxide (MOPITT CO Products)
  - 💡 Light Pollution (VIIRS Nighttime Lights)
  - 🌫️ Aerosol Optical Depth (Air Quality Proxy)
  - 🌪️ Dust (AIRS Dust Score)
  - 🧊 Sea Ice (MODIS Terra Sea Ice)
  - ❄️ Snow Cover (MODIS Terra NDSI Snow Cover)
- **📅 25-Year Timeline**: Scrub through two and a half decades of Earth observations (1999-2025)
- **🎮 Collapsible Layer Sidebar**: Toggle visibility and adjust opacity for each data layer
- **🦔 Rupert AI Chatbot**: Interactive guide explaining environmental data and solutions
- **🎬 Animated Loading**: Rupert's adventure video plays on initial load
- **🎨 Modern UI**: Beautiful, responsive interface with glassmorphism effects

### 📄 Additional Pages
- **🦔 Rupert's Story**: Complete narrative of Rupert's journey from space back to Earth
- **🛰️ Terra Satellite**: Information about the Terra satellite and its five instruments
- **🌟 Astreaus**: Interactive Exosky game from 2024 NASA Space Apps Challenge
- **ℹ️ About**: Project information, team details, and NASA Space Apps Challenge details

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd terra-rupertus
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Alternative Installation (Windows)

For Windows users, you can use the provided batch files:

1. **Run the installer**:
```bash
install.bat
```

2. **Start the application**:
```bash
start.bat
```

## 🏗️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend Framework | Next.js 14 + React 18 | Component-based UI development |
| 3D Visualization | CesiumJS | High-precision WGS84 3D globe |
| Language | TypeScript | Type-safe development |
| Data Source | NASA GIBS | Pre-rendered satellite imagery |
| Styling | CSS3 + Tailwind CSS | Modern, responsive design with glassmorphism |
| Video Player | HTML5 Video | Animated loading sequences |
| 3D Models | Sketchfab | Interactive satellite models |
| External Games | itch.io | Exosky constellation game |

## 📊 Data Sources

All data is streamed directly from NASA's Global Imagery Browse Services (GIBS):

- **MODIS Thermal Anomalies**: Fire detection from Terra/MODIS
- **MOPITT Carbon Monoxide**: Atmospheric CO measurements
- **VIIRS Nighttime Lights**: Urban development and light pollution
- **MODIS Aerosol Optical Depth**: Air quality indicator
- **AIRS Dust Score**: Ocean dust detection
- **MODIS Terra Sea Ice**: Sea ice extent and concentration
- **MODIS Terra NDSI Snow Cover**: Snow cover mapping

## 🎯 Usage Guide

### Exploring the Globe

1. **Navigate**: Click and drag to rotate, scroll to zoom, right-click and drag to pan
2. **Toggle Layers**: Click the "Layers" button in the top-left to open the collapsible sidebar
3. **Adjust Opacity**: Fine-tune layer visibility with opacity sliders
4. **Time Travel**: Use the timeline at the bottom to explore historical data (1999-2025)
5. **Chat with Rupert**: Click the chatbot in the bottom-right to learn about what you're seeing
6. **Skip Loading**: Use the "Skip" button during the initial video to jump to the globe

### Timeline Controls

- **Play/Pause**: Animate through time automatically
- **Speed Control**: Adjust playback speed (1x, 2x, 4x) with day-based transitions
- **Year Buttons**: Jump to specific years from Terra Launch (1999) to 2025
- **Manual Scrubbing**: Drag the slider to any specific date
- **Auto-Advance**: Timeline automatically finds next available data for selected layers

### Layer Combinations

Try these interesting layer combinations:

- **🔥 Fires + 💨 CO**: See the relationship between fires and air pollution
- **💡 Lights + 🌫️ Aerosol**: Observe urban growth and pollution correlation
- **🧊 Sea Ice + ❄️ Snow Cover**: Monitor polar and seasonal changes
- **🌪️ Dust + 🌫️ Aerosol**: Track atmospheric dust and pollution patterns
- **All Layers**: Get a comprehensive view of environmental stressors

### Navigation

- **🌍 Earth**: Main interactive globe application
- **🦔 Rupert**: Rupert's complete story and journey
- **🛰️ Terra**: Information about the Terra satellite and its instruments
- **🌟 Astreaus**: Interactive Exosky game from 2024
- **ℹ️ About**: Project details, team information, and NASA Space Apps Challenge info

## 🛠️ Development

### Project Structure

```
terra-rupertus/
├── app/
│   ├── components/
│   │   ├── NASAGibsViewer.tsx   # Main 3D globe with NASA GIBS data
│   │   ├── LayersSidebar.tsx    # Collapsible layer controls
│   │   ├── CustomTimeline.tsx   # Custom timeline component
│   │   ├── ChatBot.tsx          # Rupert AI assistant
│   │   └── Navbar.tsx           # Navigation component
│   ├── about/
│   │   └── page.tsx             # About page with team info
│   ├── astreaus/
│   │   └── page.tsx             # Astreaus page with Exosky game
│   ├── rupert/
│   │   └── page.tsx             # Rupert's story page
│   ├── terra-satellite/
│   │   └── page.tsx             # Terra satellite information
│   ├── globals.css              # Global styles with glassmorphism
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main Earth page
│   └── favicon.ico              # Website icon
├── public/                      # Static assets
│   ├── cesium/                  # Cesium static assets
│   ├── rupert2.mp4              # Loading video
│   ├── rupertus-logo.png        # Logo
│   ├── milkyway.jpeg            # Background image
│   └── [other assets]           # Images and videos
├── gibs-web-examples/           # NASA GIBS examples
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
├── .gitignore                  # Git ignore rules
└── git-setup.md                # Git setup instructions
```

### Build for Production

```bash
npm run build
npm start
```

### Deployment

The application is designed for static hosting:

1. **Build the application**:
```bash
npm run build
npm run export  # If using static export
```

2. **Deploy to your preferred platform**:
   - AWS S3 + CloudFront
   - Vercel (recommended)
   - Netlify
   - GitHub Pages

## 🌐 Cesium Ion Token

The application uses Cesium's default token for demonstration purposes. For production use, you should:

1. Create a free account at [Cesium Ion](https://ion.cesium.com/)
2. Generate your own access token
3. Add it to your environment variables:

```bash
# Create .env.local file
CESIUM_ION_ACCESS_TOKEN=your_token_here
```

The application will automatically use the token from environment variables if available.

## 📝 Technical Requirements Fulfilled

✅ **R.2.1**: Fully interactive 3D globe with WGS84 ellipsoid  
✅ **R.2.2**: Terra data integration via GIBS WMTS  
✅ **R.2.3**: NASA CMR API access ready (for custom queries)  
✅ **R.3.1**: 25-year temporal coverage with milestones (1999-2025)  
✅ **R.3.2**: Timeline control with clock synchronization  
✅ **R.3.3**: Dynamic data-time synchronization  
✅ **R.4.1**: Complete layer controls with opacity adjustment  
✅ **R.4.2**: Rupert AI chatbot with contextual information  
✅ **Animation**: Rupert's story and journey through space and time  
✅ **Interactive Elements**: Collapsible sidebar, custom timeline, video loading  
✅ **Multi-page Experience**: Earth, Rupert, Terra, Astreaus, and About pages  

## 👥 Team

**Terra Rupertus Team - NASA Space Apps Challenge 2025**
- **👨‍💻 Jay Rosen** - Developer
- **🎨 Jessica Rosen** - Artist  
- **✍️ Julieth Lorne** - Storytelling
- **👩‍💻 Laura Chavez** - Animation
- **👨‍🚀 Paul Muszynski** - Space Science

**Location**: Cape Canaveral, FL, United States  
**Challenge**: Animation Celebration of Terra Data!

## 🤝 Contributing

This project was created for NASA Space Apps Challenge 2025. Feel free to fork, enhance, and share!

## 📚 Resources

- [NASA Terra Mission](https://terra.nasa.gov/)
- [NASA GIBS](https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs)
- [CesiumJS Documentation](https://cesium.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NASA Space Apps Challenge 2025](https://www.spaceappschallenge.org/2025/)
- [Our NASA Space Apps Team Page](https://www.spaceappschallenge.org/2025/find-a-team/astreaus-rupertus1/)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- NASA Earth Science Data Systems (ESDS)
- NASA Terra Mission Team
- CesiumJS Community
- NASA Space Apps Challenge 2025
- All contributors to open-source geospatial tools

---

**Made with 💙 for NASA Space Apps Challenge 2025**

*"Helping Rupert find a home by understanding our changing planet"* 🦔🌍

