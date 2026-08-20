import fs from 'fs';
import path from 'path';

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

const htmlFiles = getHtmlFiles(path.resolve('.'));
console.log(`Checking ${htmlFiles.length} HTML files for footer / navigation updates.`);

for (const file of htmlFiles) {
  if (file.endsWith('insurance-guide.html')) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Add FL Water Damage Insurance Guide to footer if not already present
  if (content.includes('Restoration Blog &amp; Guides</a></li>') && !content.includes('/insurance-guide"')) {
    content = content.replace(
      'Restoration Blog &amp; Guides</a></li>',
      'Restoration Blog &amp; Guides</a></li>\n              <li><a href="/insurance-guide" class="hover:text-[#E8A33D] transition-colors">FL Water Damage Insurance Guide</a></li>'
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Added footer link to ${path.basename(file)}`);
  }
}
