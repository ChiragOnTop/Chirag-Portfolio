# Deployment Checklist 📋

## Pre-Deployment Verification

### Environment Variables
- [ ] EmailJS credentials configured (k8nFLZ_HYLIL0TM2Y)
- [ ] Service ID verified: service_e08mnm3
- [ ] Template ID verified: template_y7kj19g
- [ ] Recipient email set: cgambhir777@gmail.com

### Content Updates Required

#### Resume Link
- [ ] Update: `src/components/sections/Hero.jsx`
- [ ] Find: `href="https://drive.google.com/file/d/your-resume-id/view"`
- [ ] Replace with: Your actual Google Drive resume link

#### Project Links
Check `src/data/portfolio.js` for any "#" links that need real URLs:
```javascript
// Example:
{
  title: "Project Name",
  gitHub: "https://github.com/yourusername/repo", // If "#", it will be skipped
  liveDemo: "https://demo.example.com",           // If "#", it will be skipped
}
```

#### Profile Image
- [ ] Verify hero image exists: `src/assets/hero-*.png`
- [ ] Image size optimal (~400x500px recommended)
- [ ] Lazy loading will handle optimization

#### OG Image
- [ ] Create/place image at: `public/og-image.png`
- [ ] Size: 1200x630px (OpenGraph standard)
- [ ] File should showcase portfolio aesthetic

### Testing Checklist

#### Functionality Testing
- [ ] Hero animation plays (2 seconds)
- [ ] Profile card 3D tilt works on hover
- [ ] CTA buttons navigate correctly
- [ ] Contact form validation works
- [ ] Email sends successfully to cgambhir777@gmail.com
- [ ] Toast notifications appear on success/error
- [ ] Lazy sections load when scrolling into view

#### Accessibility Testing
- [ ] Tab through entire page (keyboard navigation)
- [ ] Use screen reader to verify labels
- [ ] Check focus-visible outlines appear
- [ ] Verify "Skip to content" link works
- [ ] Test shortcuts: G (GitHub), C (Contact), P (Projects)
- [ ] Mobile accessibility (touch targets 44x44px minimum)

#### Performance Testing
- [ ] Lighthouse score (target: 90+)
- [ ] Mobile responsiveness (test on real devices)
- [ ] Bundle size acceptable (main: <80kB gzipped)
- [ ] Images load efficiently (lazy loading)
- [ ] Animations smooth at 60fps

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### SEO Verification

- [ ] Meta title appears in browser tab
- [ ] Meta description visible in search results preview
- [ ] Structured data markup validates at schema.org
- [ ] Open Graph tags display correctly when shared
- [ ] Twitter card preview works in X/Twitter
- [ ] Canonical URL set correctly
- [ ] robots.txt allows indexing
- [ ] sitemap.xml includes all pages

### Security Checklist

- [ ] EmailJS credentials are public-safe (public key only)
- [ ] No sensitive data in environment
- [ ] Form has rate limiting (3-second duplicate prevention)
- [ ] Email validation prevents injection attacks
- [ ] Error messages don't leak sensitive info
- [ ] External links have rel="noopener noreferrer"

### Deployment Steps

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Verify Build Output**
   - [ ] No errors in build log
   - [ ] dist/ folder created with all assets
   - [ ] All .js/.css files generated

3. **Deploy to Vercel**
   ```bash
   # If using Vercel CLI
   vercel --prod
   
   # Or push to git and Vercel auto-deploys
   git push origin main
   ```

4. **Post-Deployment Verification**
   - [ ] Site loads at https://chirag-portfolio.vercel.app (or custom domain)
   - [ ] All assets load without 404 errors
   - [ ] Animations run smoothly
   - [ ] Contact form works end-to-end
   - [ ] Email received at cgambhir777@gmail.com
   - [ ] Mobile responsiveness verified
   - [ ] SEO meta tags visible in source

5. **Analytics Setup** (Optional)
   ```javascript
   // Add to index.html <head>
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Social Media Links
Before going live, update these in `src/data/portfolio.js`:
- [ ] GitHub URL
- [ ] LinkedIn URL
- [ ] Twitter URL
- [ ] Portfolio description
- [ ] Email contact method

### File Checklist
```
✓ src/components/global/ErrorBoundary.jsx
✓ src/components/global/AccessibilityEnhancer.jsx
✓ src/context/ToastContext.jsx
✓ src/components/intro/EarthZoomAnimation.jsx
✓ src/components/ui/HolographicProfileCard.jsx
✓ src/components/ui/CaseStudyCard.jsx
✓ src/components/LazySections.jsx
✓ src/components/sections/Hero.jsx (updated)
✓ src/components/sections/Projects.jsx (updated)
✓ src/components/sections/Contact.jsx (updated)
✓ src/data/portfolio.js (expanded)
✓ src/index.css (accessibility utilities)
✓ index.html (SEO, OG, schema)
✓ package.json (dependencies)
```

### Before Going Live: Final Review

- [ ] No console errors or warnings
- [ ] All external links tested and working
- [ ] Contact form tested with real email
- [ ] Mobile version looks professional
- [ ] Animations don't distract from content
- [ ] Performance is snappy (<3s full load)
- [ ] Brand message clear and compelling

---

**Status**: Ready for deployment ✅
