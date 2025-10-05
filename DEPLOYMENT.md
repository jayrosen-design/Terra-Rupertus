# 🚀 Deployment Guide - Astraeus Rupertus 2.0

This guide covers deployment options for the Astraeus Rupertus 2.0 application.

## Prerequisites

Before deploying, ensure you have:
- ✅ Completed the build process locally
- ✅ Obtained your own Cesium Ion access token
- ✅ Tested the application thoroughly

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the creators of Next.js and offers seamless deployment.

#### Steps:

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **For production**:
```bash
vercel --prod
```

#### Vercel via GitHub (Automatic Deployments):

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and deploy

**Environment Variables**: Add your Cesium token in Vercel dashboard under Settings → Environment Variables

---

### Option 2: Netlify

Netlify offers great static site hosting with continuous deployment.

#### Steps:

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build the application**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy
```

4. **For production**:
```bash
netlify deploy --prod
```

#### Netlify via GitHub:

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

---

### Option 3: AWS S3 + CloudFront

For enterprise-grade hosting with full control.

#### Steps:

1. **Build the application**:
```bash
npm run build
```

2. **Export static files** (if using static export):
```bash
# Add to package.json scripts:
# "export": "next export"
npm run export
```

3. **Create S3 Bucket**:
   - Go to AWS S3 Console
   - Create a new bucket
   - Enable static website hosting
   - Upload the `out/` or `.next/` directory

4. **Set up CloudFront**:
   - Create a CloudFront distribution
   - Point origin to your S3 bucket
   - Configure caching rules
   - Set up custom domain (optional)

5. **Configure DNS**:
   - Point your domain to CloudFront distribution

#### AWS CLI Deployment Script:

```bash
# Install AWS CLI
# Configure: aws configure

# Sync files to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### Option 4: GitHub Pages

Free hosting for static sites.

#### Steps:

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**:
```json
{
  "scripts": {
    "deploy": "next build && next export && gh-pages -d out"
  }
}
```

3. **Update next.config.js**:
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
  images: {
    unoptimized: true,
  },
};
```

4. **Deploy**:
```bash
npm run deploy
```

---

### Option 5: Docker Container

For containerized deployment to any cloud provider.

#### Dockerfile:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

#### Build and Run:

```bash
# Build Docker image
docker build -t astraeus-rupertus .

# Run container
docker run -p 3000:3000 astraeus-rupertus
```

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Application loads correctly
- [ ] 3D globe renders properly
- [ ] All NASA data layers load
- [ ] Timeline controls function
- [ ] Chatbot responds
- [ ] Performance is acceptable (check loading times)
- [ ] Mobile responsiveness
- [ ] SSL/HTTPS is enabled
- [ ] Custom domain configured (if applicable)

## Performance Optimization

### Cesium Asset Loading

Ensure Cesium assets are properly loaded:
- Check browser console for 404 errors
- Verify Cesium Ion token is set
- Consider CDN for Cesium static files

### Image Optimization

```javascript
// In next.config.js
module.exports = {
  images: {
    domains: ['gibs.earthdata.nasa.gov'],
  },
};
```

### Caching Strategy

Set appropriate cache headers for:
- Static assets: Long-term caching (1 year)
- NASA GIBS imagery: Medium-term (1 day)
- HTML pages: Short-term (5 minutes)

## Monitoring

Set up monitoring for:
- **Uptime**: Use UptimeRobot or Pingdom
- **Analytics**: Google Analytics or Plausible
- **Error Tracking**: Sentry or LogRocket
- **Performance**: Lighthouse CI

## Troubleshooting

### Issue: Cesium doesn't load
**Solution**: Check Cesium Ion token and verify CORS settings

### Issue: NASA GIBS images not loading
**Solution**: Check browser console, verify GIBS endpoints are accessible, ensure dates are within available range

### Issue: Large bundle size
**Solution**: Enable code splitting, lazy load Cesium, optimize images

### Issue: Slow initial load
**Solution**: Enable Next.js static optimization, use CDN, compress assets

## Security

- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Implement rate limiting for chatbot
- [ ] Regular dependency updates

## Cost Estimates

| Platform | Free Tier | Paid Plan |
|----------|-----------|-----------|
| Vercel | Yes (Hobby) | $20/mo (Pro) |
| Netlify | Yes | $19/mo (Pro) |
| AWS | 12 months free tier | Variable |
| GitHub Pages | Yes | N/A |

## Support

For deployment issues:
- Check the [Next.js deployment docs](https://nextjs.org/docs/deployment)
- Review [CesiumJS deployment guide](https://cesium.com/docs/tutorials/cesium-and-webpack/)
- Consult platform-specific documentation

---

**Happy Deploying! 🚀🌍**

