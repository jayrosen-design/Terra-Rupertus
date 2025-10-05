# ⚡ Quick Start Guide

Get Astraeus Rupertus 2.0 running in 5 minutes!

## 🎯 Super Fast Setup

### 1️⃣ Install Dependencies (2 minutes)

```bash
npm install
```

This installs:
- Next.js & React
- CesiumJS & Resium
- TypeScript support

### 2️⃣ Start Development Server (10 seconds)

```bash
npm run dev
```

### 3️⃣ Open Your Browser

Navigate to: **http://localhost:3000**

🎉 **That's it!** You should see Rupert's interactive globe!

---

## 🎮 First Steps

Once the app loads:

1. **Explore the Globe** 🌍
   - Click & drag to rotate
   - Scroll to zoom in/out
   - Right-click & drag to pan

2. **Activate Data Layers** 🛰️
   - Look at the panel on the right
   - Click toggles to enable layers
   - Try "Active Fires" first!

3. **Time Travel** ⏰
   - Use the timeline at the bottom
   - Click "Play" to animate
   - Jump to milestones (2000, 2010, 2020)

4. **Chat with Rupert** 🦔
   - Find the chatbot in the bottom-right
   - Ask: "What am I seeing?"
   - Ask: "How can we help?"

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module not found errors?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Cesium not loading?
- Check your internet connection (Cesium needs to download assets)
- Clear browser cache
- Try a different browser (Chrome recommended)

### NASA data not showing?
- Wait a few seconds for tiles to load
- Check browser console for errors
- Verify you're viewing dates between 2000-2025

---

## 📱 Recommended Setup

**Browser**: Chrome, Firefox, or Edge (latest version)  
**Screen**: 1920x1080 or higher  
**Internet**: Stable connection (for NASA data streaming)  
**RAM**: 4GB minimum, 8GB recommended

---

## 🚀 What's Next?

- **Customize**: Edit components in `app/components/`
- **Add Layers**: Explore more NASA GIBS products
- **Deploy**: See `DEPLOYMENT.md` for hosting options
- **Contribute**: Share your improvements!

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main application entry point |
| `app/components/CesiumGlobe.tsx` | 3D globe & NASA data |
| `app/components/ChatBot.tsx` | Rupert AI assistant |
| `app/globals.css` | All styles |

---

## 💡 Tips

- **Performance**: Close other tabs for smoother 3D rendering
- **Layer Combos**: Try Fires + CO to see pollution from burns
- **Timeline**: Use 100x speed to see 25 years in seconds
- **Chatbot**: It's context-aware! Ask about what you're viewing

---

**Need Help?** Check the full `README.md` for detailed documentation!

Happy exploring! 🌍✨

