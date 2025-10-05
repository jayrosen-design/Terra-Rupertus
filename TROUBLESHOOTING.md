# 🔧 Troubleshooting Guide

Common issues and solutions for Astraeus Rupertus 2.0.

---

## Installation Issues

### ❌ "npm install" fails

**Symptoms**: Package installation errors, dependency conflicts

**Solutions**:

1. **Clear npm cache**:
```bash
npm cache clean --force
```

2. **Delete lock file and node_modules**:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Use specific Node version**:
```bash
# Install Node 18 or higher
node --version  # Check current version
```

4. **Try yarn instead**:
```bash
npm install -g yarn
yarn install
```

### ❌ TypeScript errors during install

**Symptoms**: Type definition conflicts

**Solution**:
```bash
npm install --legacy-peer-deps
```

---

## Development Server Issues

### ❌ Port 3000 already in use

**Symptoms**: "EADDRINUSE: address already in use"

**Solutions**:

1. **Use different port**:
```bash
npm run dev -- -p 3001
```

2. **Kill process on port 3000** (Windows):
```bash
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

3. **Kill process on port 3000** (Mac/Linux):
```bash
lsof -ti:3000 | xargs kill
```

### ❌ Server won't start

**Symptoms**: Crashes immediately after `npm run dev`

**Solutions**:

1. **Check Node version**:
```bash
node --version  # Must be 18.x or higher
```

2. **Reinstall dependencies**:
```bash
rm -rf node_modules .next
npm install
```

3. **Check for syntax errors**:
```bash
npm run lint
```

---

## CesiumJS Issues

### ❌ Black screen / Globe not loading

**Symptoms**: Application loads but no globe visible

**Solutions**:

1. **Check browser console** (F12):
   - Look for Cesium-related errors
   - Check for asset loading failures

2. **Verify internet connection**:
   - Cesium needs to download assets
   - Check firewall/proxy settings

3. **Clear browser cache**:
   - Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

4. **Try different browser**:
   - Chrome recommended
   - Firefox also supported
   - Edge should work

5. **Check Cesium Ion token**:
```typescript
// In app/components/CesiumGlobe.tsx
Cesium.Ion.defaultAccessToken = 'your_token_here';
```

### ❌ "Failed to load Cesium.js"

**Symptoms**: Module import errors

**Solutions**:

1. **Verify Cesium installation**:
```bash
npm list cesium
```

2. **Reinstall Cesium**:
```bash
npm uninstall cesium
npm install cesium@^1.119.0
```

3. **Check webpack config** in `next.config.js`

### ❌ Performance issues / Laggy globe

**Symptoms**: Stuttering, slow frame rate

**Solutions**:

1. **Close unnecessary browser tabs**
2. **Disable browser extensions**
3. **Reduce active data layers**
4. **Check GPU acceleration**:
   - Chrome: `chrome://gpu`
   - Enable hardware acceleration

5. **Lower visual quality** (for testing):
```typescript
// In CesiumGlobe.tsx
viewer.scene.globe.maximumScreenSpaceError = 4; // Default is 2
```

---

## NASA Data Layer Issues

### ❌ Data layers not showing

**Symptoms**: Layers toggle on but no data visible

**Solutions**:

1. **Wait for tiles to load**:
   - Can take 10-30 seconds initially
   - Check browser network tab

2. **Verify date range**:
   - Some layers only available after certain dates
   - VIIRS data starts in 2012

3. **Check opacity**:
   - Make sure opacity slider not at 0%

4. **Test single layer**:
   - Disable all layers
   - Enable one at a time
   - Identify problematic layer

### ❌ "Failed to obtain image" errors

**Symptoms**: Console shows GIBS request failures

**Solutions**:

1. **Check GIBS service status**:
   - Visit [NASA Earthdata Status](https://status.earthdata.nasa.gov/)

2. **Verify date format**:
   - Must be YYYY-MM-DD
   - Within Terra mission dates (2000-2025)

3. **Network issue**:
   - Try different network
   - Check firewall rules
   - Corporate networks may block

4. **Rate limiting**:
   - Too many rapid requests
   - Wait a moment and try again

### ❌ Tiles loading slowly

**Symptoms**: Takes forever to see data

**Solutions**:

1. **Patience**: First load downloads many tiles
2. **Zoom in less**: Fewer tiles at lower zoom
3. **Stable internet**: Check connection speed
4. **Browser cache**: Subsequent loads faster

---

## Timeline Issues

### ❌ Timeline not updating globe

**Symptoms**: Slider moves but data doesn't change

**Solutions**:

1. **Check layer time support**:
   - Ensure layer has temporal dimension
   - Some layers may be static

2. **Verify clock synchronization**:
```typescript
// In CesiumGlobe.tsx
viewer.clock.currentTime = Cesium.JulianDate.fromDate(currentDate);
```

3. **Reload the page**:
   - Sometimes state gets out of sync

### ❌ Animation stuttering

**Symptoms**: Playback is jerky

**Solutions**:

1. **Lower playback speed**:
   - Use 1x or 5x instead of 100x

2. **Reduce active layers**:
   - Fewer layers = better performance

3. **Pre-load tiles**:
   - Manually scrub through timeline first
   - Caches tiles for smoother playback

---

## Chatbot Issues

### ❌ Chatbot not responding

**Symptoms**: Messages sent but no response

**Solutions**:

1. **Check browser console**:
   - Look for JavaScript errors

2. **Verify chatbot logic**:
```typescript
// In ChatBot.tsx
const getContextAwareResponse = (userMessage: string): string => {
  // Ensure this function is working
};
```

3. **Reload page**:
   - Reset chatbot state

### ❌ Chatbot stuck minimized

**Symptoms**: Can't reopen chatbot

**Solutions**:

1. **Check Z-index conflicts**:
   - Other UI elements may be covering

2. **Clear local storage**:
```javascript
localStorage.clear();
location.reload();
```

---

## Build & Deployment Issues

### ❌ "npm run build" fails

**Symptoms**: Build errors during production build

**Solutions**:

1. **Check for TypeScript errors**:
```bash
npm run lint
```

2. **Clean build cache**:
```bash
rm -rf .next
npm run build
```

3. **Check memory**:
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### ❌ Deployment not working

**Symptoms**: Built app doesn't work when deployed

**Solutions**:

1. **Check environment variables**:
   - Ensure Cesium token is set
   - Verify all env vars copied

2. **Test production build locally**:
```bash
npm run build
npm start
```

3. **Check static file serving**:
   - Cesium assets must be accessible
   - Verify paths in network tab

4. **CORS issues**:
   - Ensure GIBS requests not blocked
   - Check browser console

---

## Browser-Specific Issues

### Chrome
- **Issue**: WebGL context lost
- **Solution**: Disable "Use hardware acceleration when available" (sometimes needed)

### Firefox
- **Issue**: Slower than Chrome
- **Solution**: Normal, Cesium optimized for Chrome

### Safari
- **Issue**: May have WebGL limitations
- **Solution**: Use Chrome for best experience

### Edge
- **Issue**: Similar to Chrome but less tested
- **Solution**: Should work, report issues if found

---

## Performance Optimization

### If application is slow:

1. **Reduce visual quality**:
   - Fewer data layers
   - Lower opacity
   - Less zooming while animating

2. **Browser optimization**:
   - Close other tabs
   - Disable extensions
   - Clear cache

3. **Hardware**:
   - Ensure GPU drivers updated
   - 8GB+ RAM recommended
   - Discrete GPU preferred

4. **Network**:
   - Stable broadband connection
   - Avoid mobile hotspots if possible

---

## Getting Help

### Debug Checklist

Before asking for help, check:
- [ ] Browser console for errors (F12)
- [ ] Network tab for failed requests
- [ ] Node version (18+)
- [ ] All dependencies installed
- [ ] Internet connection stable
- [ ] Tried in different browser
- [ ] Cleared cache

### Gathering Information

When reporting issues, include:
1. **Error message** (exact text)
2. **Browser & version**
3. **Operating system**
4. **Node version**: `node --version`
5. **Steps to reproduce**
6. **Screenshots** (if applicable)
7. **Console logs** (F12 → Console)

### Useful Commands

```bash
# System information
node --version
npm --version
npx next info

# Detailed error output
npm run dev --verbose

# Check port usage
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux
```

---

## Common Error Messages

### "Module not found: Can't resolve 'cesium'"
**Fix**: `npm install cesium`

### "Cannot find module 'next'"
**Fix**: `npm install`

### "Digital envelope routines::unsupported"
**Fix**: Use Node 18+ or add to package.json:
```json
"scripts": {
  "dev": "NODE_OPTIONS=--openssl-legacy-provider next dev"
}
```

### "ENOENT: no such file or directory"
**Fix**: Ensure you're in the correct directory with `package.json`

### "Error: listen EADDRINUSE"
**Fix**: Port already in use, see "Port 3000 already in use" above

---

## Still Having Issues?

If none of these solutions work:

1. **Create a fresh install**:
   - Clone/download repo again
   - Fresh `npm install`
   - Don't copy old node_modules

2. **Check system requirements**:
   - Node 18+
   - Modern browser
   - 4GB+ RAM
   - Stable internet

3. **Consult documentation**:
   - `README.md`
   - `QUICKSTART.md`
   - [Next.js Docs](https://nextjs.org/docs)
   - [CesiumJS Docs](https://cesium.com/docs/)

4. **Community resources**:
   - CesiumJS Forum
   - Stack Overflow
   - GitHub Issues (if applicable)

---

**Remember**: Most issues are resolved by clearing cache, reinstalling dependencies, or checking browser console! 🔍

