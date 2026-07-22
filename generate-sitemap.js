import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.waterdamagerestorationorlando.us';

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

function getTodayDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getRouteInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Try canonical link first
  const canonicalMatch = content.match(/<link\s+rel=[\"']canonical[\"']\s+href=[\"']([^\"']*)[\"']/i);
  let loc = canonicalMatch ? canonicalMatch[1].trim() : null;

  if (!loc) {
    // Derive from filepath
    const relative = path.relative(__dirname, filePath).replace(/\\/g, '/');
    let cleanPath = relative.replace(/\.html$/, '');
    if (cleanPath === 'index') cleanPath = '';
    loc = `${DOMAIN}/${cleanPath}`;
  }

  // Ensure trailing slash only for root
  if (loc === DOMAIN) {
    loc = `${DOMAIN}/`;
  } else if (loc.endsWith('/') && loc.length > DOMAIN.length + 1) {
    loc = loc.slice(0, -1);
  }

  const pathName = loc.replace(DOMAIN, '');

  let priority = '0.8';
  let changefreq = 'monthly';

  if (pathName === '/' || pathName === '') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (['/about', '/services', '/locations', '/blog', '/contact'].includes(pathName)) {
    priority = '0.8';
    changefreq = 'weekly';
  } else if (pathName.startsWith('/services/') || pathName.startsWith('/locations/')) {
    priority = '0.9';
    changefreq = 'monthly';
  } else if (pathName.startsWith('/blog/')) {
    priority = '0.7';
    changefreq = 'monthly';
  } else if (pathName === '/privacy-policy') {
    priority = '0.3';
    changefreq = 'yearly';
  }

  return {
    loc,
    lastmod: getTodayDate(),
    changefreq,
    priority
  };
}

function generateSitemap() {
  const files = getHtmlFiles(__dirname);
  const routesMap = new Map();

  files.forEach(file => {
    const info = getRouteInfo(file);
    if (!routesMap.has(info.loc)) {
      routesMap.set(info.loc, info);
    }
  });

  // Sort routes logically
  const routes = Array.from(routesMap.values()).sort((a, b) => {
    if (a.loc === `${DOMAIN}/`) return -1;
    if (b.loc === `${DOMAIN}/`) return 1;
    return b.priority.localeCompare(a.priority) || a.loc.localeCompare(b.loc);
  });

  const xmlUrls = routes.map(r => `    <url>
        <loc>${r.loc}</loc>
        <lastmod>${r.lastmod}</lastmod>
        <changefreq>${r.changefreq}</changefreq>
        <priority>${r.priority}</priority>
    </url>`).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

  // Ensure directories exist
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap.xml and robots.txt to public/
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

  // Write sitemap.xml and robots.txt to root for direct local/dev serving
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');

  // If dist/ directory exists or if dist/public/ exists, populate them too
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');

    const distPublicDir = path.join(distDir, 'public');
    if (!fs.existsSync(distPublicDir)) {
      fs.mkdirSync(distPublicDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distPublicDir, 'sitemap.xml'), sitemapXml, 'utf8');
    fs.writeFileSync(path.join(distPublicDir, 'robots.txt'), robotsTxt, 'utf8');
  }

  console.log(`Successfully generated sitemap.xml with ${routes.length} URLs and robots.txt!`);
}

generateSitemap();
