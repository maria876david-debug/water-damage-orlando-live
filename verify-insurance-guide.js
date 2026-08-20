import fs from 'fs';

const content = fs.readFileSync('insurance-guide.html', 'utf8');

const bannedWords = [
  'delve', 'tapestry', 'multifaceted', 'landscape', 'nuanced', 'pivotal', 'realm',
  'leverage', 'underscore', 'streamline', 'robust', 'seamless', 'holistic', 'paramount',
  'testament', 'foster', 'bespoke', 'unlock', 'elevate', 'navigate', 'harness',
  'unprecedented', 'comprehensive', 'myriad', 'plethora', 'intricate', 'invaluable',
  'indelible', 'resonate', 'embark', 'curate', 'unleash', 'boasts', 'ecosystem',
  'scalable', 'actionable', 'thought leadership', 'next-gen', 'cutting-edge',
  'game-changer', 'move the needle', 'bandwidth', 'synergy', 'disruptive',
  'transformative', 'groundbreaking', 'revolutionize', 'future-ready', 'innovative solutions'
];

let bannedMatches = [];
bannedWords.forEach(w => {
  const regex = new RegExp(`\\b${w}\\b`, 'gi');
  // Avoid checking meta tags if necessary, but check entire content
  const matches = content.match(regex);
  if (matches) {
    bannedMatches.push({ word: w, count: matches.length });
  }
});

console.log('Banned words check:', bannedMatches.length === 0 ? 'PASSED (0 banned words found)' : bannedMatches);

// Check dashes in text (excluding HTML attributes, tags, and CSS)
// We extract inner text of paragraphs and headings
const textContent = content.replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<[^>]+>/g, ' ');

const emDash = textContent.includes('—');
const enDash = textContent.includes('–');
const doubleHyphen = textContent.includes('--');
const spacedHyphen = textContent.includes(' - ');

console.log('Dash check:');
console.log('  Em dash (—):', emDash);
console.log('  En dash (–):', enDash);
console.log('  Double hyphen (--):', doubleHyphen);
console.log('  Spaced hyphen ( - ):', spacedHyphen);

// Check basement
const basementMatch = textContent.match(/\bbasement\b/gi);
console.log('Basement check:', basementMatch ? `FAILED: ${basementMatch.length} occurrences` : 'PASSED (0 occurrences)');

// Verify exact Q&A in FAQ schema vs visible text
const schemaMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
if (schemaMatch) {
  try {
    const json = JSON.parse(schemaMatch[1]);
    const faq = json['@graph'].find(item => item['@type'] === 'FAQPage');
    if (faq) {
      console.log('FAQ Schema found with', faq.mainEntity.length, 'questions:');
      faq.mainEntity.forEach((q, i) => {
        const qInText = content.includes(q.name);
        const aInText = content.includes(q.acceptedAnswer.text);
        console.log(`  Q${i+1}: "${q.name.substring(0, 40)}..."`);
        console.log(`     Question matches visible text:`, qInText);
        console.log(`     Answer matches visible text:`, aInText);
        const wordCount = q.acceptedAnswer.text.trim().split(/\s+/).length;
        console.log(`     Answer word count:`, wordCount, '(target: 40-60)');
      });
    }
  } catch (e) {
    console.error('Error parsing JSON-LD:', e.message);
  }
}
