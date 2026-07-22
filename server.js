import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Assets and folder prefix rewriting middleware
app.use((req, res, next) => {
  const originalPath = req.path;

  // Rewrite /assets/global.css to /global.css
  if (originalPath === '/assets/global.css') {
    req.url = '/global.css';
    return next();
  }

  // Rewrite /assets/js/main.js to /main.js
  if (originalPath === '/assets/js/main.js') {
    req.url = '/main.js';
    return next();
  }

  // Rewrite favicon and logos to valid root assets
  if (originalPath === '/assets/images/favicon.png' || originalPath === '/assets/images/favicon.ico' || originalPath === '/favicon.ico') {
    req.url = '/favicon.png';
    return next();
  }
  if (originalPath === '/assets/images/logo/logo.svg' || originalPath === '/assets/images/logo/logo-white.svg') {
    req.url = '/shape-1.svg';
    return next();
  }

  next();
});

// Build dynamic route & redirect maps from HTML canonical tags
function buildRouteMaps() {
  const canonicalMap = {}; // cleanPath -> absoluteFilePath
  const redirectMap = {};  // redirectSource -> cleanPath

  function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'public') {
          results = results.concat(getHtmlFiles(filePath));
        }
      } else if (file.endsWith('.html')) {
        results.push(filePath);
      }
    });
    return results;
  }

  const files = getHtmlFiles(__dirname);

  files.forEach(file => {
    const rel = path.relative(__dirname, file).split(path.sep).join('/');
    const content = fs.readFileSync(file, 'utf8');
    const m = content.match(/<link\s+rel=[\"']canonical[\"']\s+href=[\"']([^\"']*)[\"']/i);
    if (!m) return;
    
    const canonicalFull = m[1].trim();
    const cleanPath = canonicalFull.replace('https://www.waterdamagerestorationorlando.us', '') || '/';

    canonicalMap[cleanPath] = file;

    const baseName = path.basename(rel, '.html');
    const sources = [
      '/' + rel,
      '/' + baseName,
      '/' + baseName + '.html'
    ];
    if (rel === 'index.html') {
      sources.push('/index.html', '/index');
    } else {
      sources.push('/' + rel.replace(/\.html$/, ''));
    }

    sources.forEach(s => {
      if (s !== cleanPath) {
        redirectMap[s] = cleanPath;
      }
    });
  });

  return { canonicalMap, redirectMap };
}

const { canonicalMap, redirectMap } = buildRouteMaps();

// 2. Redirect middleware for 301 Permanent Redirects to clean canonical URLs
app.use((req, res, next) => {
  const urlPath = req.path;

  // Clean trailing slash (unless root /)
  if (urlPath.length > 1 && urlPath.endsWith('/')) {
    const cleanPath = urlPath.slice(0, -1);
    const query = req.url.slice(urlPath.length) || '';
    const destination = redirectMap[cleanPath] || cleanPath;
    return res.redirect(301, destination + query);
  }

  // Check if URL is in 301 redirect map
  if (redirectMap[urlPath]) {
    const destination = redirectMap[urlPath];
    const query = req.url.slice(urlPath.length) || '';
    return res.redirect(301, destination + query);
  }

  // Handle any other .html request
  if (urlPath.endsWith('.html')) {
    const cleanPath = urlPath.slice(0, -5);
    const destination = cleanPath === '/index' ? '/' : (redirectMap[cleanPath] || cleanPath);
    const query = req.url.slice(urlPath.length) || '';
    return res.redirect(301, destination + query);
  }

  next();
});

// 3. Clean URLs Serving Middleware
app.use((req, res, next) => {
  const urlPath = req.path;

  // If serving known canonical clean path
  if (canonicalMap[urlPath]) {
    return res.sendFile(canonicalMap[urlPath]);
  }

  // If path has extension, let static handler take it
  if (path.extname(urlPath)) {
    return next();
  }

  next();
});

// 4. Static files serving
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// 5. Custom 404 handler
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
