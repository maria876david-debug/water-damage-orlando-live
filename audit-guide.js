import fs from 'fs';
import path from 'path';

const bannedWords = [
  'delve', 'tapestry', 'multifaceted', 'landscape', 'nuanced', 'pivotal', 'realm',
  'leverage', 'underscore', 'streamline', 'robust', 'seamless', 'holistic', 'paramount',
  'testament', 'foster', 'bespoke', 'unlock', 'elevate', 'navigate', 'harness',
  'unprecedented', 'comprehensive', 'myriad', 'plethora', 'intricate', 'invaluable',
  'indelible', 'resonate', 'embark', 'curate', 'unleash', 'boasts', 'ecosystem', 'scalable',
  'actionable', 'thought leadership', 'next-gen', 'cutting-edge', 'game-changer',
  'move the needle', 'bandwidth', 'synergy', 'disruptive', 'transformative',
  'groundbreaking', 'revolutionize', 'future-ready', 'innovative solutions'
];

const bannedOpeners = [
  "in today's fast-paced world", "in today's digital age", "it's important to note that",
  "it's crucial to understand", "at its core", "when it comes to", "let's delve into",
  "one must consider", "imagine a world where", "look no further"
];

const bannedClosers = [
  "in conclusion", "to sum up", "at the end of the day", "the key takeaway here is",
  "as we move forward", "ultimately, the choice is yours", "that said"
];

export function auditFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  let cleanText = content.replace(/<[^>]*>/g, ' '); // remove html tags
  cleanText = cleanText.replace(/&[a-z0-9#]+;/gi, ' ');
  const lower = cleanText.toLowerCase();

  let errors = [];

  // Check banned words
  for (const w of bannedWords) {
    const regex = new RegExp(`\\b${w}\\b`, 'i');
    if (regex.test(cleanText)) {
      errors.push(`BANNED WORD FOUND: "${w}"`);
    }
  }

  // Check banned openers
  for (const bo of bannedOpeners) {
    if (lower.includes(bo)) {
      errors.push(`BANNED OPENER FOUND: "${bo}"`);
    }
  }

  // Check banned closers
  for (const bc of bannedClosers) {
    if (lower.includes(bc)) {
      errors.push(`BANNED CLOSER FOUND: "${bc}"`);
    }
  }

  // Check basement
  if (/\bbasement\b/i.test(cleanText)) {
    errors.push(`BANNED TERM 'basement' FOUND!`);
  }

  // Check for dashes in text (em dash —, en dash –, double hyphen --)
  if (/[—–]/.test(content)) {
    errors.push(`DASH FOUND (em-dash or en-dash character present)!`);
  }

  if (errors.length > 0) {
    console.error(`\nAudit FAIL for ${filePath}:`);
    errors.forEach(e => console.error(` - ${e}`));
    return false;
  } else {
    console.log(`\nAudit PASS for ${filePath}! No banned words, no banned openers/closers, no basement, no dashes.`);
    return true;
  }
}

if (process.argv[2]) {
  auditFile(process.argv[2]);
}
