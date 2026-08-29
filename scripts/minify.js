/**
 * Grace Alarm — Production Minification & Build Script
 * Zero-dependency Node.js build tool for static InfinityFree deployment.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('🚀 Starting Grace Alarm production build...\n');

// 1. Clean and prepare dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// Helper: Format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

// 2. Minify HTML
function minifyHTML(html) {
  return html
    // Remove HTML comments (except JSON-LD or conditional comments)
    .replace(/<!--(?!\[if|\/\[endif)[\s\S]*?-->/g, '')
    // Collapse whitespace between tags
    .replace(/>\s+</g, '><')
    // Collapse multi-spaces inside tags, preserving attribute values
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// 3. Minify CSS
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace around symbols
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')
    // Remove trailing semicolons before close bracket
    .replace(/;}/g, '}')
    // Collapse spaces
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// 4. Minify JS (safe regex-based minifier for plain ES6+ code)
function minifyJS(js) {
  return js
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove single-line comments that start on a new line or after whitespace
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/;\s*\/\/.*$/gm, ';')
    // Remove leading/trailing line whitespace
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

// 5. Copy Directory Recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const stats = [];

// Process HTML files
['index.html', 'privacy.html'].forEach(file => {
  const srcPath = path.join(ROOT_DIR, file);
  if (fs.existsSync(srcPath)) {
    const original = fs.readFileSync(srcPath, 'utf8');
    const minified = minifyHTML(original);
    const destPath = path.join(DIST_DIR, file);
    fs.writeFileSync(destPath, minified, 'utf8');

    stats.push({
      file,
      origSize: Buffer.byteLength(original, 'utf8'),
      minSize: Buffer.byteLength(minified, 'utf8')
    });
  }
});

// Process CSS files
const cssDir = path.join(DIST_DIR, 'css');
fs.mkdirSync(cssDir, { recursive: true });
const cssFiles = ['style.css'];
cssFiles.forEach(file => {
  const srcPath = path.join(ROOT_DIR, 'css', file);
  if (fs.existsSync(srcPath)) {
    const original = fs.readFileSync(srcPath, 'utf8');
    const minified = minifyCSS(original);
    const destPath = path.join(cssDir, file);
    fs.writeFileSync(destPath, minified, 'utf8');

    stats.push({
      file: `css/${file}`,
      origSize: Buffer.byteLength(original, 'utf8'),
      minSize: Buffer.byteLength(minified, 'utf8')
    });
  }
});

// Process JS files
const jsDir = path.join(DIST_DIR, 'js');
fs.mkdirSync(jsDir, { recursive: true });
const jsFiles = ['main.js', 'analytics.js'];
jsFiles.forEach(file => {
  const srcPath = path.join(ROOT_DIR, 'js', file);
  if (fs.existsSync(srcPath)) {
    const original = fs.readFileSync(srcPath, 'utf8');
    const minified = minifyJS(original);
    const destPath = path.join(jsDir, file);
    fs.writeFileSync(destPath, minified, 'utf8');

    stats.push({
      file: `js/${file}`,
      origSize: Buffer.byteLength(original, 'utf8'),
      minSize: Buffer.byteLength(minified, 'utf8')
    });
  }
});

// Copy assets and downloads
console.log('📦 Copying static assets (images, icons, mockups)...');
copyDirSync(path.join(ROOT_DIR, 'assets'), path.join(DIST_DIR, 'assets'));
copyDirSync(path.join(ROOT_DIR, 'downloads'), path.join(DIST_DIR, 'downloads'));

// Copy LICENSE if exists
const licensePath = path.join(ROOT_DIR, 'LICENSE');
if (fs.existsSync(licensePath)) {
  fs.copyFileSync(licensePath, path.join(DIST_DIR, 'LICENSE'));
}

// Summary Output
console.log('\n📊 Production Build Summary:');
console.log('------------------------------------------------------------');
console.log('File'.padEnd(20) + 'Original'.padEnd(15) + 'Minified'.padEnd(15) + 'Savings');
console.log('------------------------------------------------------------');

let totalOrig = 0;
let totalMin = 0;

stats.forEach(item => {
  totalOrig += item.origSize;
  totalMin += item.minSize;
  const saved = item.origSize - item.minSize;
  const percent = ((saved / item.origSize) * 100).toFixed(1);
  console.log(
    item.file.padEnd(20) +
    formatBytes(item.origSize).padEnd(15) +
    formatBytes(item.minSize).padEnd(15) +
    `-${percent}% (${formatBytes(saved)})`
  );
});

console.log('------------------------------------------------------------');
const totalSaved = totalOrig - totalMin;
const totalPercent = ((totalSaved / totalOrig) * 100).toFixed(1);
console.log(
  'Total Code:'.padEnd(20) +
  formatBytes(totalOrig).padEnd(15) +
  formatBytes(totalMin).padEnd(15) +
  `-${totalPercent}% (${formatBytes(totalSaved)})`
);
console.log('------------------------------------------------------------\n');
console.log('✅ Build complete! Files ready in ./dist/ for deployment.\n');
