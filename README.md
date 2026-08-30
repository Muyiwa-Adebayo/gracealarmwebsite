# Grace Alarm Landing Page

**URL:** https://gracealarm.free.nf  
**Stack:** Static HTML5 + Vanilla CSS + Vanilla JS (ES6+)  
**Hosting:** InfinityFree  
**Developer:** WorkPress (info.workpressmail@gmail.com)

## File Structure

```
Grace Alarm/
├── .github/
│   └── workflows/
│       └── infinityfree.yml   # GitHub Actions automated FTP deploy
├── scripts/
│   ├── minify.js              # Production build & minification script
│   └── serve.js               # Zero-dependency local development & preview server
├── dist/                      # Minified build output (gitignored)
├── index.html                 # Landing page
├── privacy.html               # Privacy policy
├── LICENSE                    # Project License
├── css/
│   └── style.css              # Design system + layout + responsive styles
├── js/
│   ├── main.js                # Interactions (carousel, scroll reveal, etc.)
│   └── analytics.js           # GA4 event tracking
├── downloads/
│   └── (GraceAlarm-v1.0.apk)  # Release APK (when uploaded)
└── assets/
    └── images/
        ├── favicon.ico        # 32×32 Favicon
        ├── favicon.svg        # Vector Favicon
        ├── grace-alarm-logo.png # App Logo
        ├── og-image.jpg       # 1200×630 OpenGraph social sharing image
        ├── mockup-alarm-triggered.png
        ├── mockup-create-alarm.png
        ├── mockup-home-alarms.png
        ├── mockup-settings.png
        ├── mockup-shared-verse.png
        └── screenshots/       # Raw source screenshots
```

## Setup

1. **GA4:** Replace `G-XXXXXXXXXX` in `js/main.js` (line ~165) with your actual GA4 Measurement ID.
2. **APK:** Place the release APK in `/downloads/GraceAlarm-v1.0.apk`.

## Local Development & Review

To test and review your changes locally before committing or deploying:

```bash
# Start local review server (serves development source files)
node scripts/serve.js

# Or preview the minified production build (from dist/)
node scripts/serve.js --dist

# Or specify a custom port
node scripts/serve.js 8080
```

- **URL:** Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Cache-Busting:** Live browser caching is disabled automatically so page reloads immediately reflect your latest HTML/CSS/JS edits.

## Build

The project includes a zero-dependency Node.js production minification tool:

```bash
node scripts/minify.js
```

This compiles and minifies HTML, CSS, and JS into the `dist/` directory while copying static assets for optimized hosting performance.

## Deployment (InfinityFree)

### Automated CI/CD (GitHub Actions)
Pushes to `main` automatically run the production build and deploy to InfinityFree via FTP using [`.github/workflows/infinityfree.yml`](.github/workflows/infinityfree.yml).

Required repository secrets:
- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

### Manual Deployment
1. Run `node scripts/minify.js` to build the `dist/` folder.
2. Log in to the InfinityFree Control Panel.
3. Open File Manager → navigate to `htdocs/`.
4. Upload all files from the `dist/` directory.
5. Verify live at https://gracealarm.free.nf.

## Analytics Events

| Event | Trigger |
|-------|---------|
| `cta_click_hero` | Hero download button |
| `cta_click_bottom` | Bottom download button |
| `apk_download_start` | APK download begins |
| `scroll_depth` | 25%, 50%, 75%, 100% scroll |
| `theme_chip_click` | Theme chip interaction |
| `verse_carousel_interact` | Carousel dot click |
| `privacy_policy_click` | Privacy link click |
| `workpress_credit_click` | Developer credit click |

## Contact

Email: info.workpressmail@gmail.com  
Developer Website: https://workpress.free.nf
