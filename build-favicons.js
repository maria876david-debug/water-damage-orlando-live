import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&amp;display=swap');
      .brand-text {
        font-family: 'Big Shoulders Display', 'Arial Black', 'Impact', sans-serif;
        font-weight: 900;
        font-size: 270px;
        fill: #E8A33D;
        text-anchor: middle;
        dominant-baseline: central;
        letter-spacing: -6px;
      }
    </style>
  </defs>
  <!-- Dark Cypress Green Background with Rounded Corners -->
  <rect width="512" height="512" rx="108" ry="108" fill="#16302A"/>
  
  <!-- Citrus Gold OR Mark -->
  <text x="256" y="262" class="brand-text">OR</text>
</svg>`;

async function generateFavicons() {
  console.log('Generating brand-matched favicon icon set...');

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write favicon.svg to public and root
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
  fs.writeFileSync(path.resolve('favicon.svg'), svgContent, 'utf8');

  // Convert SVG to buffer for Sharp
  const svgBuffer = Buffer.from(svgContent);

  // 2. Generate PNGs
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-192.png', size: 192 },
    { name: 'favicon-512.png', size: 512 },
    { name: 'favicon.png', size: 512 }
  ];

  for (const item of sizes) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, item.name), pngBuffer);
    fs.writeFileSync(path.resolve(item.name), pngBuffer);
    console.log(`✓ Generated ${item.name} (${item.size}x${item.size})`);
  }

  // 3. Generate favicon.ico
  try {
    const icoBuffer = await pngToIco([
      path.join(publicDir, 'favicon-16x16.png'),
      path.join(publicDir, 'favicon-32x32.png'),
      path.join(publicDir, 'favicon-48x48.png')
    ]);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.resolve('favicon.ico'), icoBuffer);
    console.log('✓ Generated multi-resolution favicon.ico');
  } catch (err) {
    console.error('Error generating .ico, falling back to 32x32 PNG as ico:', err);
    const icoFallback = fs.readFileSync(path.join(publicDir, 'favicon-32x32.png'));
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFallback);
    fs.writeFileSync(path.resolve('favicon.ico'), icoFallback);
  }

  // 4. Generate site.webmanifest
  const manifest = {
    name: "Orlando Rapid Restoration",
    short_name: "Orlando Restoration",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#16302A",
    background_color: "#16302A",
    display: "standalone"
  };

  const manifestStr = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), manifestStr, 'utf8');
  fs.writeFileSync(path.resolve('site.webmanifest'), manifestStr, 'utf8');
  console.log('✓ Generated site.webmanifest');
}

generateFavicons().then(() => {
  console.log('All brand favicons successfully generated!');
}).catch(err => {
  console.error('Error generating favicons:', err);
});
