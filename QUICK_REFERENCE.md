# ⚡ Quick Reference Card

Essential commands and controls for Astraeus Rupertus 2.0.

---

## 🚀 Getting Started

```bash
# Install (first time only)
npm install

# Start development
npm run dev

# Open browser
http://localhost:3000
```

**Windows Users**: Double-click `install.bat` then `start.bat`

---

## 🎮 Globe Controls

| Action | Control |
|--------|---------|
| **Rotate Earth** | Left Click + Drag |
| **Tilt View** | Right Click + Drag |
| **Zoom In/Out** | Mouse Wheel |
| **Zoom to Point** | Double Click |
| **Reset View** | Home button (if visible) |

---

## 🛰️ Data Layers

| Icon | Layer | What It Shows |
|------|-------|---------------|
| 🔥 | **Fires** | Thermal anomalies, wildfires |
| 💨 | **Carbon Monoxide** | Air pollution, emissions |
| 💡 | **Light Pollution** | Urban development, cities |
| 🌫️ | **Aerosol** | Air quality, dust, smoke |

**Toggle**: Click switch in Layer Controls (top-right)  
**Opacity**: Adjust slider when layer is active

---

## ⏰ Timeline Controls

| Control | Function |
|---------|----------|
| **Slider** | Drag to any date (2000-2025) |
| **▶️ Play** | Animate through time |
| **⏸️ Pause** | Stop animation |
| **⏮️ Reset** | Return to 2000 |
| **Speed** | Dropdown (1x to 100x) |
| **Milestones** | Quick jump buttons |

**Date Range**: January 1, 2000 → January 1, 2025

---

## 🦔 Chatbot Commands

| Ask Rupert... | What You'll Learn |
|---------------|-------------------|
| "What am I seeing?" | Current layers explained |
| "How can we help?" | Environmental solutions |
| "Tell me about fires" | Fire data details |
| "Who are you?" | Rupert's story |
| "What happened in 2020?" | Historical context |

**Location**: Bottom-right corner  
**Minimize**: Click ➖ button

---

## 📊 Recommended Layer Combos

1. **🔥 + 💨** - Fires & pollution correlation
2. **💡 + 🌫️** - Urban growth & air quality
3. **🔥 + 💡** - Fires near populated areas
4. **All 4** - Complete environmental view

---

## 🎯 Interesting Explorations

### Recent Wildfires (2020-2023)
1. Enable 🔥 Fires
2. Jump to "2020" milestone
3. Look at: California, Australia, Amazon

### Urban Growth (2000-2025)
1. Enable 💡 Lights
2. Set timeline to 2000
3. Press Play (10x speed)
4. Watch cities expand!

### Air Pollution Patterns
1. Enable 💨 CO + 🌫️ Aerosol
2. Look at: China, India, Industrial zones
3. Compare different seasons

### Saharan Dust Transport
1. Enable 🌫️ Aerosol
2. Look at North Africa
3. See plumes crossing Atlantic

---

## 🔧 npm Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check code quality
npm run clean    # Clear build cache
```

---

## 📁 Key Files

```
app/
  ├── page.tsx                    # Main app
  ├── globals.css                 # All styles
  └── components/
      ├── CesiumGlobe.tsx        # 3D globe
      ├── LayerControls.tsx      # Layer UI
      ├── TimelineControls.tsx   # Timeline UI
      └── ChatBot.tsx            # Rupert AI

Documentation/
  ├── README.md                   # Start here
  ├── QUICKSTART.md              # Fast setup
  ├── TROUBLESHOOTING.md         # Fix issues
  └── DEPLOYMENT.md              # Go live
```

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| **Port 3000 in use** | `npm run dev -- -p 3001` |
| **Install fails** | `npm cache clean --force` then retry |
| **Globe won't load** | Wait 10s, check internet, try Chrome |
| **Layers not showing** | Wait for tiles, check date range |
| **Slow performance** | Close other tabs, reduce layers |

---

## 🌐 URLs

| Resource | Link |
|----------|------|
| **Local Dev** | http://localhost:3000 |
| **NASA Terra** | https://terra.nasa.gov/ |
| **NASA GIBS** | https://earthdata.nasa.gov/gibs |
| **Cesium Docs** | https://cesium.com/docs/ |
| **Next.js Docs** | https://nextjs.org/docs |

---

## 🎨 UI Layout

```
┌─────────────────────────────────────────────────┐
│  🌍 Title                     🛰️ Layer Controls │
│                                                  │
│                                                  │
│              3D GLOBE                            │
│            (Full Screen)                         │
│                                                  │
│                                         🦔 Chat  │
│                                                  │
│           📅 Timeline Controls                   │
└─────────────────────────────────────────────────┘
```

**Panels**:
- Top-Left: Title & subtitle
- Top-Right: Layer controls
- Bottom-Center: Timeline
- Bottom-Right: Chatbot

---

## ⌨️ Keyboard Shortcuts

*(Future enhancement - not currently implemented)*

Suggested:
- `Space` - Play/Pause timeline
- `←/→` - Step through time
- `1-4` - Toggle layers 1-4
- `R` - Reset view
- `C` - Toggle chatbot

---

## 📊 Performance Tips

### Better Speed:
✅ Limit to 2-3 active layers  
✅ Use medium playback speeds (5x-10x)  
✅ Close unnecessary browser tabs  
✅ Let tiles load before zooming  
✅ Use Chrome for best performance  

### Better Visuals:
✅ Adjust layer opacity (50-80%)  
✅ Zoom in for higher resolution  
✅ Pause timeline when exploring  
✅ Try night/day lighting (automatic)  

---

## 🎓 Learning Path

**Beginner (5 min)**:
1. Launch app
2. Enable one layer
3. Try timeline slider
4. Ask Rupert a question

**Intermediate (30 min)**:
1. All layers
2. Find patterns
3. Use playback
4. Compare years

**Advanced (1+ hour)**:
1. Multi-layer analysis
2. Track specific events
3. Long-term trends
4. Create observations

---

## 📱 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Browser** | Chrome 90+ | Chrome Latest |
| **RAM** | 4 GB | 8 GB |
| **GPU** | WebGL 2.0 | Dedicated GPU |
| **Internet** | 5 Mbps | 25+ Mbps |
| **Display** | 1366x768 | 1920x1080+ |

---

## 🔗 Helpful Commands

```bash
# Check versions
node --version
npm --version

# Clean reinstall
rm -rf node_modules package-lock.json
npm install

# Port check (Windows)
netstat -ano | findstr :3000

# Port check (Mac/Linux)
lsof -i :3000

# Detailed logs
npm run dev --verbose
```

---

## 📞 Need Help?

1. **Browser Console** (F12) - Check for errors
2. **TROUBLESHOOTING.md** - Common solutions
3. **README.md** - Full documentation
4. **GitHub Issues** - Report problems

---

## 🎯 Success Checklist

Before first use:
- [ ] Node.js 18+ installed
- [ ] `npm install` completed successfully
- [ ] Browser: Chrome/Firefox/Edge
- [ ] Internet connection stable

First session:
- [ ] Globe loads and renders
- [ ] Can rotate/zoom
- [ ] At least one data layer shows
- [ ] Timeline slider works
- [ ] Chatbot responds

---

## 🌟 Pro Tips

💡 **Data loads faster on second visit** (browser cache)  
💡 **Combine Fires + CO for pollution insight**  
💡 **Urban lights show development patterns**  
💡 **Aerosol layer reveals air quality**  
💡 **Timeline milestones jump to key years**  
💡 **Rupert knows what layers are active**  
💡 **Opacity helps see overlapping data**  
💡 **100x speed shows 25 years in ~3 minutes**  

---

## 📖 Documentation Index

| Doc | Purpose | Read Time |
|-----|---------|-----------|
| `README.md` | Overview & setup | 10 min |
| `QUICKSTART.md` | Fast start | 3 min |
| `FEATURES.md` | All features | 15 min |
| `NASA_DATA_LAYERS.md` | Data details | 20 min |
| `PROJECT_STRUCTURE.md` | Architecture | 15 min |
| `DEPLOYMENT.md` | Go live | 10 min |
| `TROUBLESHOOTING.md` | Fix issues | As needed |
| `QUICK_REFERENCE.md` | This card | 2 min |

---

## 🦔 Rupert's Top Picks

*"My favorite things to explore:"*

1. **Australian Fires 2020** - Enable 🔥, jump to 2020
2. **Asian Urbanization** - Enable 💡, animate 2000→2025
3. **Amazon Burning** - Enable 🔥+💨, check Aug-Sep
4. **Saharan Dust** - Enable 🌫️, watch transatlantic travel

---

**Print This Page** for quick reference while exploring!

*Happy exploring! 🌍✨*

