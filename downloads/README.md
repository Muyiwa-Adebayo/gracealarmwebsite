# Downloads

This directory contains reference notes for the Grace Alarm APK release.

- **Current version:** 1.0 (Build V1.0.0)
- **Hosted on:** [GitHub Releases](https://github.com/Muyiwa-Adebayo/gracealarmwebsite/releases/tag/V1.0.0)
- **Direct download URL:** https://github.com/Muyiwa-Adebayo/gracealarmwebsite/releases/download/V1.0.0/GraceAlarm-v1.0.apk
- **Min Android:** 7.0+ (API 24)

## Hosting Architecture
Due to InfinityFree's 10 MB per-file size limit and terms prohibiting `.apk` executable binaries, the APK file is hosted externally on GitHub Releases. It is intentionally excluded from the static `./dist/` directory generated for InfinityFree FTP deployment.

## Updating the APK
1. Build the new release APK from the Android project
2. Create a new release tag on GitHub (e.g. `V1.1.0`) and attach the new `.apk` file
3. Update the release download URL in `index.html`
4. Run `node scripts/minify.js`, commit, and push to deploy the updated landing page
