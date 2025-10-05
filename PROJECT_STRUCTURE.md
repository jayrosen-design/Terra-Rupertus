# 📁 Project Structure

Complete file organization and architecture overview for Astraeus Rupertus 2.0.

## Directory Tree

```
astraeus-rupertus-2.0/
│
├── app/                          # Next.js 14 App Directory
│   ├── components/              # React Components
│   │   ├── CesiumGlobe.tsx     # 🌍 3D Globe with NASA data integration
│   │   ├── LayerControls.tsx   # 🎛️ Data layer management UI
│   │   ├── TimelineControls.tsx # ⏰ Timeline navigation component
│   │   └── ChatBot.tsx         # 🦔 Rupert AI chatbot interface
│   │
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main application page
│   ├── globals.css              # Global styles & Cesium CSS
│   └── favicon.ico              # Application icon
│
├── public/                       # Static assets
│   └── cesium-ion-token.txt    # Token information
│
├── package.json                  # Project dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
├── .gitignore                   # Git ignore rules
├── env.example                  # Environment variables template
│
├── README.md                    # Main documentation
├── QUICKSTART.md               # Fast setup guide
├── DEPLOYMENT.md               # Deployment instructions
└── PROJECT_STRUCTURE.md        # This file
```

## Component Architecture

### 🏗️ Main Application Flow

```
page.tsx (Root)
    ├── CesiumGlobe (3D Visualization)
    ├── LayerControls (UI Panel)
    ├── TimelineControls (UI Panel)
    └── ChatBot (AI Assistant)
```

### Component Responsibilities

#### 1. **page.tsx** (Main Orchestrator)
- **Purpose**: Application entry point and state management
- **State Managed**:
  - `viewer`: CesiumJS Viewer instance
  - `currentDate`: Selected date in timeline
  - `isPlaying`: Timeline animation state
  - `activeLayers`: Set of enabled data layers
- **Props Passed Down**: Coordinates data flow between components

#### 2. **CesiumGlobe.tsx** (Visualization Engine)
- **Purpose**: Renders 3D globe and manages NASA data layers
- **Key Features**:
  - Initializes CesiumJS Viewer with Terra mission timespan
  - Manages WMTS imagery providers for NASA GIBS
  - Handles layer addition/removal dynamically
  - Synchronizes globe time with timeline
- **Data Sources**:
  - MODIS Thermal Anomalies (Fires)
  - MOPITT Carbon Monoxide
  - VIIRS Nighttime Lights
  - MODIS Aerosol Optical Depth

#### 3. **LayerControls.tsx** (Data Management UI)
- **Purpose**: User interface for controlling data layers
- **Features**:
  - Toggle layer visibility
  - Adjust layer opacity (0-100%)
  - Display layer descriptions
  - Visual feedback for active layers
- **Layer Definitions**: Array of available NASA data products

#### 4. **TimelineControls.tsx** (Temporal Navigation)
- **Purpose**: Navigate through 25 years of data
- **Features**:
  - Slider for manual date selection
  - Play/Pause animation
  - Variable playback speed (1x to 100x)
  - Milestone shortcuts (key years)
  - Real-time date display
- **Time Range**: 2000-01-01 to 2025-01-01

#### 5. **ChatBot.tsx** (Interactive Guide)
- **Purpose**: Rupert's AI assistant for user guidance
- **Features**:
  - Context-aware responses based on active layers
  - Information about environmental data
  - Solutions and action items
  - Rupert's storytelling narrative
  - Minimize/maximize functionality
- **Intelligence**: Rule-based responses with context awareness

## Data Flow

```
User Interaction
    ↓
Component (LayerControls/TimelineControls/ChatBot)
    ↓
State Update (page.tsx)
    ↓
Props Change
    ↓
CesiumGlobe Re-render
    ↓
NASA GIBS API Request
    ↓
Tile Streaming
    ↓
Visual Update on Globe
```

## Styling Architecture

### Global Styles (`globals.css`)

The application uses a **component-scoped class naming strategy**:

```css
/* Component Prefix Pattern */
.cesium-*          /* CesiumJS native styles */
.app-*             /* Application-level components */
.layer-*           /* Layer control components */
.timeline-*        /* Timeline components */
.chatbot-*         /* Chatbot components */
```

### Design System

**Color Palette**:
- Primary Blue: `#4dabf7` (NASA-inspired)
- Dark Background: `rgba(0, 0, 0, 0.9)`
- Text Light: `#f8f9fa`
- Text Muted: `#adb5bd`

**Layout Strategy**:
- Absolute positioning for UI overlays
- Flexbox for component internal layout
- CSS Grid not used (not needed for current design)

**Responsive Approach**:
- Fixed desktop-first design
- Mobile considerations in future enhancement

## Technology Choices

### Why Next.js?
- Server-side rendering capability
- Optimal code splitting
- Built-in TypeScript support
- Easy deployment options
- Fast refresh for development

### Why CesiumJS?
- Industry-standard for geospatial 3D
- Native WGS84 ellipsoid support
- Excellent WMTS/WMS integration
- NASA GIBS compatibility
- High performance with large datasets

### Why TypeScript?
- Type safety for complex state management
- Better IDE support
- Reduced runtime errors
- Self-documenting code

## Data Integration

### NASA GIBS WMTS Endpoints

The application uses NASA's Global Imagery Browse Services:

```
Base URL: https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/

Layer Pattern:
/{LAYER_NAME}/default/{Time}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png
```

**Active Layers**:
1. `MODIS_Terra_Thermal_Anomalies_All`
2. `MOPITT_CO_Total_Column_Day`
3. `VIIRS_SNPP_DayNightBand_ENCC`
4. `MODIS_Terra_Aerosol_Optical_Depth`

### Temporal Dimension

- Time format: `YYYY-MM-DD`
- Available range: 2000-01-01 to present
- Update frequency: Daily (varies by product)
- Synchronization: Via CesiumJS clock API

## Performance Considerations

### Optimization Strategies

1. **Code Splitting**:
   - CesiumGlobe dynamically imported
   - Reduces initial bundle size
   - Faster first contentful paint

2. **Lazy Loading**:
   - NASA tiles loaded on-demand
   - Only active layers consume bandwidth
   - Cesium handles tile caching

3. **Memory Management**:
   - Old imagery layers removed when disabled
   - Cesium automatically manages texture memory
   - React component cleanup on unmount

4. **Network Efficiency**:
   - WMTS tile pyramid structure
   - Progressive resolution loading
   - Browser HTTP/2 multiplexing

## State Management

### Current Approach: Props Drilling

```
page.tsx (Source of Truth)
    ↓ props
Components (Consumers)
    ↓ callbacks
page.tsx (State Update)
```

**Rationale**: Application complexity doesn't justify Redux/Context API overhead.

### Future Scalability

If the app grows, consider:
- React Context for global state
- Zustand for lightweight state management
- Redux Toolkit for complex workflows

## Extension Points

### Adding New Data Layers

1. Add layer definition in `CesiumGlobe.tsx`:
```typescript
const layerDefinitions: Record<string, any> = {
  newLayer: {
    name: 'Layer Name',
    provider: () => new Cesium.WebMapTileServiceImageryProvider({
      // Configuration
    }),
  },
};
```

2. Add UI controls in `LayerControls.tsx`:
```typescript
const AVAILABLE_LAYERS: LayerConfig[] = [
  {
    id: 'newLayer',
    name: 'Display Name',
    icon: '🌟',
    description: 'Layer description',
  },
];
```

### Adding Chatbot Intelligence

Current implementation: Rule-based pattern matching

**Enhancement Options**:
- Integrate OpenAI API for true AI responses
- Add NASA dataset search capability
- Implement voice interface
- Multi-language support

## Build & Deployment

### Development Build
```bash
npm run dev
```
- Fast refresh enabled
- Source maps included
- No minification
- Hot module replacement

### Production Build
```bash
npm run build
```
- Code minification
- Tree shaking
- Image optimization
- Static page generation

### Output Structure
```
.next/
├── static/          # Static assets with hashes
├── server/          # Server-side code
└── cache/           # Build cache
```

## Dependencies Overview

### Core Dependencies
- `next@14.2.0` - Framework
- `react@18.3.0` - UI library
- `cesium@1.119.0` - 3D globe
- `resium@1.17.2` - React-Cesium bridge (optional)

### Dev Dependencies
- `typescript@5.0.0` - Type system
- `@types/*` - Type definitions

### Peer Dependencies
- `node@18+` - Runtime environment

## Security Considerations

### Current Status
- ✅ No sensitive data in repository
- ✅ Environment variables supported
- ✅ No authentication required (public data)
- ✅ HTTPS recommended for deployment

### Best Practices
- Use `.env.local` for secrets
- Rotate Cesium Ion tokens regularly
- Implement rate limiting for production
- Enable CORS only for NASA GIBS domains

## Testing Strategy

### Current Coverage
- Manual testing performed
- Visual regression testing recommended

### Recommended Testing
```bash
# Unit tests (future)
npm test

# E2E tests (future)
npm run test:e2e

# Performance tests
npm run lighthouse
```

## Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Main documentation & overview |
| `QUICKSTART.md` | Fast setup guide |
| `DEPLOYMENT.md` | Hosting & deployment |
| `PROJECT_STRUCTURE.md` | Architecture (this file) |
| `requirment-doc.txt` | Original requirements |

---

## Contributing

When adding features:
1. Follow existing component patterns
2. Update relevant documentation
3. Test with multiple data layers
4. Verify timeline synchronization
5. Check chatbot context awareness

---

**Last Updated**: October 2025  
**Maintainer**: NASA Space Apps Challenge Team

