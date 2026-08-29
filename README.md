# Grace Alarm Landing Page

**URL:** https://gracealarm.free.nf  
**Stack:** Static HTML + CSS + Vanilla JS  
**Hosting:** InfinityFree

## File Structure

```
Grace Alarm/
├── index.html          # Landing page
├── privacy.html        # Privacy policy
├── css/
│   └── style.css       # Design system + layout
├── js/
│   ├── main.js         # Interactions (carousel, scroll reveal, etc.)
│   └── analytics.js    # GA4 event tracking
├── downloads/
│   └── (APK goes here when ready)
└── assets/
    └── images/
        └── (images go here)
```

## Setup

1. **GA4:** Replace `G-XXXXXXXXXX` in `js/main.js` (line ~165) with your actual GA4 Measurement ID.
2. **APK:** Place the release APK in `/downloads/GraceAlarm-v1.0.apk`.
3. **Favicon:** Export the app icon and place it at `/assets/images/favicon.ico`.
4. **OG Image:** Create a 1200×630 social sharing image at `/assets/images/og-image.jpg`.

## Deployment (InfinityFree)

1. Log in to InfinityFree control panel
2. Open File Manager → navigate to `htdocs/`
3. Upload all files from this `website/` directory
4. Verify at https://gracealarm.free.nf

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
