import fs from 'fs';
import path from 'path';

const faviconTags = `    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#16302A">`;

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(getHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(path.resolve('.'));
console.log(`Found ${htmlFiles.length} HTML files to update favicon tags.`);

let updatedCount = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');

  // Remove existing favicon, shortcut icon, apple-touch-icon, manifest, theme-color tags
  content = content.replace(/<link\s+[^>]*rel=["'](?:shortcut\s+icon|icon|apple-touch-icon|manifest)["'][^>]*>\r?\n?/gi, '');
  content = content.replace(/<meta\s+[^>]*name=["']theme-color["'][^>]*>\r?\n?/gi, '');

  // Insert after canonical link, or after <head>
  if (content.includes('<link rel="canonical"')) {
    content = content.replace(
      /(<link\s+rel=["']canonical["'][^>]*>\r?\n)/i,
      `$1${faviconTags}\n`
    );
  } else if (content.includes('<head>')) {
    content = content.replace(
      /(<head[^>]*>\r?\n)/i,
      `$1${faviconTags}\n`
    );
  } else {
    console.warn(`Could not find insertion point in ${file}`);
    continue;
  }

  fs.writeFileSync(file, content, 'utf8');
  updatedCount++;
  console.log(`✓ Updated ${path.relative(path.resolve('.'), file)}`);
}

console.log(`Successfully updated ${updatedCount} files with brand favicons.`);
