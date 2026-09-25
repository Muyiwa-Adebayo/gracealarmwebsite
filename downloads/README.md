# Downloads

This directory contains the Grace Alarm APK for direct download.

- **Current file:** GraceAlarm-v1.0.apk (~22.7 MB)
- **Version:** 1.0
- **Build source:** Android Studio → Build → Build APK(s) or `./gradlew assembleRelease`
- **Min Android:** 7.0+ (API 24)

## Updating the APK

1. Build new release APK from the Android project
2. Replace `GraceAlarm-v1.0.apk` with the new build (keep the same filename, or update version in filename and all HTML references)
3. Run `node scripts/minify.js` to rebuild the production dist
4. Upload `dist/downloads/` to InfinityFree via FTP (File Manager has 10 MB limit)
