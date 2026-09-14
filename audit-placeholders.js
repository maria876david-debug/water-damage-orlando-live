import fs from 'fs';
import path from 'path';

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'dist', '.cache', '.aistudio'].includes(item)) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith('.html') || full.endsWith('.tsx') || full.endsWith('.jsx')) {
      files.push(full);
    }
  }
  return files;
}

const files = walk('.');
console.log(`Auditing ${files.length} files...`);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Look for brackets
    const withoutTailwind = line
      .replace(/\[#[0-9a-fA-F]{3,8}\]/g, '')
      .replace(/\[\d+(?:px|rem|em|%)\]/g, '')
      .replace(/\[\d+(?:px|rem|em|%)\/[^\]]+\]/g, '')
      .replace(/\[&[^\]]+\]/g, '')
      .replace(/\["[^"]+"\]/g, '')
      .replace(/\['[^']+'[^\]]*\]/g, '')
      .replace(/\[calc\([^\]]+\)\]/g, '')
      .replace(/\[(?:url|content|grid)[^\]]*\]/g, '')
      .replace(/\[\d+\.\d+\]/g, '');

    // check for specific keywords or any brackets remaining
    const matches = withoutTailwind.match(/\[[^\]]+\]/g);
    if (matches) {
      // ignore pure numbers, script brackets, jsonld
      const filtered = matches.filter(m => {
        if (m === '[]' || m.match(/^\[\s*\]$/)) return false;
        if (m.includes('http') || m.includes('window') || m.includes('process') || m.includes('import')) return false;
        return true;
      });
      if (filtered.length > 0) {
        console.log(`${file}:${idx + 1} -> ${filtered.join(' | ')}`);
        console.log(`   CONTENT: ${line.trim()}`);
      }
    }
  });
}
