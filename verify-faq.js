import fs from 'fs';

const content = fs.readFileSync('mold-and-health-guide.html', 'utf8');

// Parse JSON-LD schema
const schemaMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
if (!schemaMatch) {
  console.error('No JSON-LD schema found!');
  process.exit(1);
}

const schema = JSON.parse(schemaMatch[1]);
const faqNode = schema['@graph'].find(n => n['@type'] === 'FAQPage');
if (!faqNode) {
  console.error('No FAQPage in schema graph!');
  process.exit(1);
}

console.log(`Found ${faqNode.mainEntity.length} questions in FAQPage schema.`);

faqNode.mainEntity.forEach((q, idx) => {
  const qName = q.name;
  const aText = q.acceptedAnswer.text;
  const words = aText.trim().split(/\s+/);
  console.log(`\nQ${idx+1}: "${qName}"`);
  console.log(`Word count: ${words.length} words (target: 40-60 words)`);
  if (words.length < 40 || words.length > 60) {
    console.error(`ERROR: Word count ${words.length} outside 40-60 range!`);
  }

  // Check if question is in visible HTML
  if (!content.includes(qName)) {
    console.error(`ERROR: Question text not found in visible HTML!`);
  }
  // Check if answer text is in visible HTML
  if (!content.includes(aText)) {
    console.error(`ERROR: Answer text does not match visible HTML word-for-word!`);
  } else {
    console.log(`Visible HTML Match: EXACT MATCH!`);
  }
});
