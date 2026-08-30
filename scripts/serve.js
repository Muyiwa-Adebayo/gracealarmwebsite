/**
 * Grace Alarm — Zero-Dependency Local Development & Preview Server
 * Serves static assets with live caching disabled for instant local reviews.
 *
 * Usage:
 *   node scripts/serve.js         # Serves development root (./) on http://localhost:3000
 *   node scripts/serve.js --dist  # Serves production build (./dist/) on http://localhost:3000
 *   node scripts/serve.js 8080    # Custom port
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT_DIR = path.resolve(__dirname, '..');
const isDist = process.argv.includes('--dist') || process.argv.includes('--prod');
const customPortArg = process.argv.find(arg => /^\d+$/.test(arg));
const DEFAULT_PORT = customPortArg ? parseInt(customPortArg, 10) : 3000;

const SERVE_DIR = isDist ? path.join(ROOT_DIR, 'dist') : ROOT_DIR;

// MIME type map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.apk': 'application/vnd.android.package-archive',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function createServer(port) {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Default route
    if (pathname === '/') {
      pathname = '/index.html';
    }

    // Clean URL resolution (e.g. /privacy -> /privacy.html)
    let filePath = path.join(SERVE_DIR, pathname);

    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
      pathname = pathname + '.html';
    }

    // Check if path is a directory with index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      pathname = path.join(pathname, 'index.html');
    }

    // Security check: Prevent path traversal outside SERVE_DIR
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(SERVE_DIR))) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Forbidden: Access denied.');
      console.log(`[403] ${req.method} ${req.url}`);
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>404 Not Found — Grace Alarm Dev Server</title>
              <style>
                body { font-family: 'Ubuntu', sans-serif, system-ui; background: #F4EEE2; color: #2B221C; text-align: center; padding: 80px 20px; }
                h1 { color: #7A4F2E; font-size: 2.5rem; }
                p { color: #A89B8C; font-size: 1.1rem; }
                a { color: #7A4F2E; font-weight: bold; text-decoration: none; }
                a:hover { text-decoration: underline; }
                .card { background: #FFFFFF; max-width: 500px; margin: 0 auto; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(43,34,28,0.06); }
              </style>
            </head>
            <body>
              <div class="card">
                <h1>404</h1>
                <p>The file <code>${pathname}</code> was not found.</p>
                <p><a href="/">← Return to Home</a></p>
              </div>
            </body>
            </html>
          `);
          console.log(`\x1b[31m[404]\x1b[0m ${req.method} ${req.url}`);
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`500 Internal Server Error: ${err.message}`);
          console.error(`\x1b[31m[500]\x1b[0m ${req.method} ${req.url} - ${err.message}`);
        }
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      // Send response with no-cache headers for easy local debugging
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(data);

      console.log(`\x1b[32m[200]\x1b[0m ${req.method} ${req.url} \x1b[90m(${contentType})\x1b[0m`);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} is in use, trying ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    const target = isDist ? 'Production Build (./dist)' : 'Source Root (./)';
    console.log('\n======================================================');
    console.log(' ✨ Grace Alarm Local Review Server');
    console.log('======================================================');
    console.log(` 🌐 Serving:       \x1b[36m${target}\x1b[0m`);
    console.log(` 🚀 Local URL:     \x1b[32m\x1b[1mhttp://localhost:${port}\x1b[0m`);
    console.log(` 📄 Landing Page:  \x1b[34mhttp://localhost:${port}/index.html\x1b[0m`);
    console.log(` 🔒 Privacy Page:  \x1b[34mhttp://localhost:${port}/privacy.html\x1b[0m`);
    console.log('------------------------------------------------------');
    console.log(' 🔄 Live Cache:    Disabled (instant file updates on refresh)');
    console.log(' 🛑 Stop Server:   Press Ctrl + C');
    console.log('======================================================\n');
  });
}

// Start server
createServer(DEFAULT_PORT);
