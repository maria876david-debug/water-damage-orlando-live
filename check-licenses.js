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
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes('lic.') || line.toLowerCase().includes('licensed') || line.toLowerCase().includes('license')) {
      console.log(`${file}:${idx + 1} -> ${line.trim()}`);
    }
  });
}
