# Performance Optimization Guide

## Frontend Optimizations

### 1. Image Optimization
- Use WebP format for images
- Implement lazy loading for images
- Use responsive images with srcset
- Compress images before upload

```html
<!-- Example: Lazy loading images -->
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" alt="Description">
```

### 2. CSS Optimization
- Minify CSS files
- Remove unused CSS
- Use CSS Grid and Flexbox instead of floats
- Implement critical CSS inline

```html
<!-- Critical CSS inline -->
<style>
  /* Critical above-the-fold styles */
  body { margin: 0; font-family: sans-serif; }
  .header { background: #6366f1; }
</style>
```

### 3. JavaScript Optimization
- Minify JavaScript files
- Use async/defer for script loading
- Implement code splitting
- Remove console.logs in production

```html
<!-- Async script loading -->
<script src="script.js" async></script>
<script src="analytics.js" defer></script>
```

### 4. Caching Strategy
```javascript
// Service Worker for caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('metahub-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js'
      ]);
    })
  );
});
```

### 5. Reduce HTTP Requests
- Combine CSS files
- Combine JavaScript files
- Use CSS sprites for icons
- Implement HTTP/2 server push

## Backend Optimizations

### 1. Database Indexing
```javascript
// Add indexes to frequently queried fields
const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true, index: true },
  price: { type: Number, required: true, index: true }
});
```

### 2. Query Optimization
```javascript
// Use lean() for read-only queries
const courses = await Course.find().lean();

// Select only needed fields
const courses = await Course.find().select('title price thumbnail');

// Use pagination
const courses = await Course.find()
  .limit(10)
  .skip(page * 10);
```

### 3. Caching with Redis
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache course data
async function getCourses() {
  const cached = await client.get('courses');
  if (cached) return JSON.parse(cached);
  
  const courses = await Course.find();
  await client.setex('courses', 3600, JSON.stringify(courses));
  return courses;
}
```

### 4. Compression
```javascript
const compression = require('compression');
app.use(compression());
```

### 5. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## CDN Configuration

### 1. Use CDN for Static Assets
```html
<!-- Use CDN for libraries -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

### 2. Configure Vercel CDN
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Monitoring & Analytics

### 1. Performance Monitoring
```javascript
// Measure page load time
window.addEventListener('load', () => {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log(`Page load time: ${pageLoadTime}ms`);
});
```

### 2. Error Tracking
```javascript
window.addEventListener('error', (event) => {
  // Send error to monitoring service
  fetch('/api/log-error', {
    method: 'POST',
    body: JSON.stringify({
      message: event.message,
      stack: event.error.stack,
      url: window.location.href
    })
  });
});
```

## Lighthouse Score Targets

Aim for these scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Testing Tools

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. **WebPageTest**: https://www.webpagetest.org/
4. **Chrome DevTools**: Built-in browser tools

## Quick Wins Checklist

- [ ] Enable Gzip/Brotli compression
- [ ] Minify CSS and JavaScript
- [ ] Optimize images (WebP, compression)
- [ ] Implement lazy loading
- [ ] Add browser caching headers
- [ ] Use CDN for static assets
- [ ] Remove unused code
- [ ] Implement database indexing
- [ ] Add Redis caching
- [ ] Enable HTTP/2
- [ ] Optimize fonts (font-display: swap)
- [ ] Reduce third-party scripts
- [ ] Implement service worker
- [ ] Use async/defer for scripts
- [ ] Optimize critical rendering path

## Implementation Priority

### High Priority (Do First)
1. Image optimization
2. Minification
3. Caching headers
4. Database indexing

### Medium Priority
1. CDN setup
2. Redis caching
3. Code splitting
4. Service worker

### Low Priority (Nice to Have)
1. Advanced monitoring
2. A/B testing
3. Progressive Web App features
4. Advanced analytics

## Monitoring Commands

```bash
# Check bundle size
npm run build -- --stats

# Analyze bundle
npx webpack-bundle-analyzer

# Test API performance
npm run test

# Monitor server
pm2 monit
```

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Vercel Performance](https://vercel.com/docs/concepts/edge-network/overview)
