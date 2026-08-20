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
  } else if (pathName === '/insurance-guide') {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (['/about', '/services', '/locations', '/blog', '/contact'].includes(pathName)) {
    priority = '0.8';
    changefreq = 'monthly';
  } else if (pathName.startsWith('/services/')) {
    priority = '0.9';
    changefreq = 'monthly';
  } else if (pathName.startsWith('/locations/')) {
    priority = '0.8';
    changefreq = 'monthly';
  } else if (pathName.startsWith('/blog/')) {
    priority = '0.6';
    changefreq = 'monthly';
  } else if (pathName === '/privacy-policy' || pathName === '/terms-of-service') {
    priority = '0.3';
    changefreq = 'monthly';
  }

  let lastmod = getTodayDate();
  const dateModMatch = content.match(/"dateModified":\s*"([^"]*)"/i) || content.match(/"datePublished":\s*"([^"]*)"/i);
  if (dateModMatch && dateModMatch[1] && /^\d{4}-\d{2}-\d{2}$/.test(dateModMatch[1])) {
    lastmod = dateModMatch[1];
  }

  return {
    loc,
    pathName,
    lastmod,
    changefreq,
    priority
  };
}

function createUrlSetXml(routes) {
  const xmlUrls = routes.map(r => `    <url>
        <loc>${r.loc}</loc>
        <lastmod>${r.lastmod}</lastmod>
        <changefreq>${r.changefreq}</changefreq>
        <priority>${r.priority}</priority>
    </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;
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

  const today = getTodayDate();

  // Categorize routes
  const pageRoutes = [];
  const postRoutes = [];
  const serviceRoutes = [];
  const locationRoutes = [];

  routesMap.forEach(r => {
    if (r.pathName.startsWith('/blog/')) {
      postRoutes.push(r);
    } else if (r.pathName.startsWith('/services/')) {
      serviceRoutes.push(r);
    } else if (r.pathName.startsWith('/locations/')) {
      locationRoutes.push(r);
    } else {
      pageRoutes.push(r);
    }
  });

  // Sort helper
  const sortRoutes = (arr) => arr.sort((a, b) => {
    if (a.loc === `${DOMAIN}/`) return -1;
    if (b.loc === `${DOMAIN}/`) return 1;
    return b.priority.localeCompare(a.priority) || a.loc.localeCompare(b.loc);
  });

  const pageSitemapXml = createUrlSetXml(sortRoutes(pageRoutes));
  const postSitemapXml = createUrlSetXml(sortRoutes(postRoutes));
  const serviceSitemapXml = createUrlSetXml(sortRoutes(serviceRoutes));
  const locationSitemapXml = createUrlSetXml(sortRoutes(locationRoutes));

  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${DOMAIN}/page-sitemap.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${DOMAIN}/post-sitemap.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${DOMAIN}/service-sitemap.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${DOMAIN}/location-sitemap.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
</sitemapindex>
`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap_index.xml
Sitemap: ${DOMAIN}/sitemap.xml
`;

  const sitemapFiles = {
    'sitemap_index.xml': sitemapIndexXml,
    'sitemap.xml': sitemapIndexXml,
    'page-sitemap.xml': pageSitemapXml,
    'post-sitemap.xml': postSitemapXml,
    'service-sitemap.xml': serviceSitemapXml,
    'location-sitemap.xml': locationSitemapXml,
    'robots.txt': robotsTxt
  };

  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  const distPublicDir = path.join(distDir, 'public');

  fs.mkdirSync(distDir, { recursive: true });
  fs.mkdirSync(distPublicDir, { recursive: true });

  Object.entries(sitemapFiles).forEach(([fileName, content]) => {
    fs.writeFileSync(path.join(publicDir, fileName), content, 'utf8');
    fs.writeFileSync(path.join(__dirname, fileName), content, 'utf8');
    fs.writeFileSync(path.join(distDir, fileName), content, 'utf8');
    fs.writeFileSync(path.join(distPublicDir, fileName), content, 'utf8');
  });

  // Copy static website files to dist/ for static hosting deployments (Vercel/Netlify)
  function copyStaticFiles(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      if (['node_modules', '.git', 'dist'].includes(entry.name)) continue;
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyStaticFiles(srcPath, destPath);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.xml', '.txt', '.json'].includes(ext)) {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  }
  copyStaticFiles(__dirname, distDir);

  console.log(`Successfully generated WordPress-style multi-sitemap structure:`);
  console.log(` - page-sitemap.xml: ${pageRoutes.length} pages`);
  console.log(` - post-sitemap.xml: ${postRoutes.length} blog posts`);
  console.log(` - service-sitemap.xml: ${serviceRoutes.length} service pages`);
  console.log(` - location-sitemap.xml: ${locationRoutes.length} location pages`);
  console.log(` - sitemap_index.xml & sitemap.xml generated successfully!`);
}

generateSitemap();
