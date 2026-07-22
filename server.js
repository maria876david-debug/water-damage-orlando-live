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

  // Strip /services/, /locations/, or /blog/ prefixes only if files are flattened at root
  if (originalPath.startsWith('/services/')) {
    const relativePart = originalPath.substring(10); // Length of '/services/'
    const subfilePath = path.join(__dirname, 'services', relativePart);
    const hasHtmlExt = relativePart.endsWith('.html');
    const checkFile = hasHtmlExt ? subfilePath : `${subfilePath}.html`;
    
    if (!fs.existsSync(checkFile)) {
      const rootCheckFile = path.join(__dirname, hasHtmlExt ? relativePart : `${relativePart}.html`);
      if (fs.existsSync(rootCheckFile)) {
        req.url = '/' + relativePart + (req.url.slice(originalPath.length) || '');
      }
    }
  } else if (originalPath.startsWith('/locations/')) {
    const relativePart = originalPath.substring(11); // Length of '/locations/'
    const subfilePath = path.join(__dirname, 'locations', relativePart);
    const hasHtmlExt = relativePart.endsWith('.html');
    const checkFile = hasHtmlExt ? subfilePath : `${subfilePath}.html`;
    
    if (!fs.existsSync(checkFile)) {
      const rootCheckFile = path.join(__dirname, hasHtmlExt ? relativePart : `${relativePart}.html`);
      if (fs.existsSync(rootCheckFile)) {
        req.url = '/' + relativePart + (req.url.slice(originalPath.length) || '');
      }
    }
  } else if (originalPath.startsWith('/blog/')) {
    const relativePart = originalPath.substring(6); // Length of '/blog/'
    const subfilePath = path.join(__dirname, 'blog', relativePart);
    const hasHtmlExt = relativePart.endsWith('.html');
    const checkFile = hasHtmlExt ? subfilePath : `${subfilePath}.html`;
    
    if (!fs.existsSync(checkFile)) {
      const rootCheckFile = path.join(__dirname, hasHtmlExt ? relativePart : `${relativePart}.html`);
      if (fs.existsSync(rootCheckFile)) {
        req.url = '/' + relativePart + (req.url.slice(originalPath.length) || '');
      }
    }
  }

  next();
});

// 2. Redirect middleware for Clean URLs (Redirecting xxx.html to /xxx)
app.use((req, res, next) => {
  const urlPath = req.path;

  // Clean trailing slash (unless root)
  if (urlPath.length > 1 && urlPath.endsWith('/')) {
    const cleanPath = urlPath.slice(0, -1);
    const query = req.url.slice(urlPath.length) || '';
    return res.redirect(301, cleanPath + query);
  }

  // If request ends with .html, redirect to the clean path (except for actual file paths that are assets)
  if (urlPath.endsWith('.html')) {
    const cleanPath = urlPath.slice(0, -5);
    const destination = cleanPath === '/index' ? '/' : cleanPath;
    const query = req.url.slice(urlPath.length) || '';
    return res.redirect(301, destination + query);
  }

  next();
});

// 3. Clean URLs Serving Middleware
app.use((req, res, next) => {
  const urlPath = req.path;

  // If the path has a file extension, let express.static handle it
  if (path.extname(urlPath)) {
    return next();
  }

  // Determine which HTML file to serve
  const targetFile = urlPath === '/' ? 'index.html' : `${urlPath.substring(1)}.html`;
  const filePath = path.join(__dirname, targetFile);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
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
