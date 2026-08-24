import fs from 'fs';
import path from 'path';

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'dist', '.cache', '.aistudio'].includes(item)) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith('.html') || full.endsWith('.tsx') || full.endsWith('.jsx') || full.endsWith('.js') || full.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

const files = walk('.');

const patterns = [
  /\[Pending\/Placeholder\]/gi,
  /\[Quote:[^\]]*\]/gi,
  /\[Client:[^\]]*\]/gi,
  /\[Photo:[^\]]*\]/gi,
  /\[Neighborhood:[^\]]*\]/gi,
  /\[Cause:[^\]]*\]/gi,
  /\[Description:[^\]]*\]/gi,
  /\[Dry-out:[^\]]*\]/gi,
  /\[Size:[^\]]*\]/gi,
  /\[[A-Z][a-zA-Z0-9\s]*:\s*[^\]]+\]/g
];

console.log(`Auditing ${files.length} files...`);

const report = {};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // skip comments if needed, but let's see all occurrences
    for (const pat of patterns) {
      const match = line.match(pat);
      if (match) {
        if (!report[file]) report[file] = [];
        report[file].push({
          lineNum: idx + 1,
          matches: match,
          lineText: line.trim()
        });
      }
    }
  });
}

for (const [file, list] of Object.entries(report)) {
  console.log(`\n=== File: ${file} (${list.length} matches) ===`);
  list.forEach(item => {
    console.log(`  Line ${item.lineNum}: [${item.matches.join(', ')}] -> ${item.lineText}`);
  });
}
